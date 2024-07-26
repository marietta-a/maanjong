
using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services
{
    public class CheckAuctionFinished : BackgroundService
    {
        private readonly ILogger<AuctionFinished> _logger;
        private readonly IServiceProvider _services;

        public CheckAuctionFinished(ILogger<AuctionFinished> logger, IServiceProvider services)
        {
            _logger = logger;
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting check for finished auctions");

            stoppingToken.Register(() => _logger.LogInformation("==> Auction check is stopping"));

            while (!stoppingToken.IsCancellationRequested)
            {
                await CheckAuctions(stoppingToken);

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task CheckAuctions(CancellationToken stoppingToken)
        {
            var finishedAuctions = await DB.Find<Auction>()
                .Match(x => x.AuctionEnd <= DateTime.UtcNow)
                .Match(x => !x.Finished)
                .ExecuteAsync();

            if (finishedAuctions.Count == 0) return;

            _logger.LogInformation($"==> Found ${finishedAuctions.Count} auctions that have completed");

            using var scope = _services.CreateScope();
            var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

            foreach(var auction in finishedAuctions)
            {
                auction.Finished = true;
                await auction.SaveAsync(null, stoppingToken);

                var winningBid = await DB.Find<Bid>()
                    .Match(x => x.AuctionId == auction.ID)
                    .Match(x => x.BidStatus == BidStatus.Accepted)
                    .Sort(x => x.Descending(b => b.Amount))
                    .ExecuteFirstAsync(stoppingToken);

                await endpoint.Publish(new AuctionFinished
                {
                    ItemSold = winningBid != null,
                    AuctionId = auction.ID,
                    Winner = winningBid?.Bidder,
                    Amount = winningBid?.Amount,
                    Seller = auction?.Seller
                });
            }
        }
    }
}
