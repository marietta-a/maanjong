using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
    {
        private readonly IMapper _mapper;

        public AuctionUpdatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<AuctionUpdated> context)
        {
            Console.WriteLine(" ----> Consuming auction updated");

            var item = _mapper.Map<Item>(context.Message);

            var result = await DB.Update<Item>()
                    .Match(b => b.ID == context.Message.Id)
                    .ModifyOnly(b => new
                    {
                        b.Color,
                        b.Make,
                        b.Model,
                        b.Year,
                        b.Mileage
                    }, item)
                    .ExecuteAsync();

            if (!result.IsAcknowledged)
            {
                throw new MessageException(typeof(AuctionUpdated), "Problem updaing mongodb");

            }
                    
        }
    }
}
