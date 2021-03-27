using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using Server.Models;
using CoinGecko.Clients;
using CoinGecko.Interfaces;
using Newtonsoft.Json;

namespace Server.Services
{
    public class CoinsUpdateService : IHostedService, IDisposable
    {
        private Timer timer;
        public List<CoinModel> coins = new List<CoinModel>();
        public string json;
        private ICoinGeckoClient geckoClient = CoinGeckoClient.Instance;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
                return Task.CompletedTask;

            timer = new Timer(async (state) => await FetchCoins(state), null, TimeSpan.Zero, TimeSpan.FromMinutes(5));

            return Task.CompletedTask;
        }

        private async Task FetchCoins(object state)
        {
            List<CoinModel> result = new List<CoinModel>();
            foreach (int i in new int[] { 1, 2, 3, 4 })
            {
                result.AddRange((await geckoClient.CoinsClient.GetAllCoinsData("", 500, i, "", null))
                .Select(x => new CoinModel
                {
                    id = x.Id,
                    label = x.Name,
                    price = x.MarketData.CurrentPrice["usd"],
                    count = 0
                }).ToList());
            }
            this.coins = result;
            this.json = JsonConvert.SerializeObject(result);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }


        public void Dispose()
        {
            timer?.Dispose();
        }
    }
}