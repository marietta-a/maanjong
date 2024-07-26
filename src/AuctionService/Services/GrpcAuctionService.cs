using AuctionService.Data;
using Grpc.Core;

namespace AuctionService.Services
{
    public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
    {
        private readonly AuctionDBContext _dbContext;

        public GrpcAuctionService(AuctionDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request,
            ServerCallContext context)
        {
            Console.WriteLine("==> Received Grpc auction request");

            var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id)) ?? throw new RpcException(new Status(StatusCode.NotFound, "Not found"));
            var response = new GrpcAuctionResponse
            {
                Auction = new GrpcAuctionModel
                {
                    Id = auction.Id.ToString(),
                    AuctionEnd = auction.AuctionEnd.ToString(),
                    ReservedPrice = auction.ReservedPrice,
                    Seller = auction.Seller
                }
            };

            return response;
        }
    }
}
