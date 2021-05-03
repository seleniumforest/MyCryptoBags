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
using System.Collections.Concurrent;

namespace server.Services
{
    public class CoinMarketcapService : IHostedService, IDisposable
    {
        private Timer timer;
        public Dictionary<string, double?> MarketCaps = new Dictionary<string, double?>();
        private ICoinGeckoClient geckoClient = CoinGeckoClient.Instance;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
                return Task.CompletedTask;

            timer = new Timer(async (state) => await FetchMarketcaps(state), null, TimeSpan.Zero, TimeSpan.FromHours(1));

            return Task.CompletedTask;
        }

        private async Task FetchMarketcaps(object state)
        {
            foreach (int page in new int[] { 1, 2, 3, 4 })
            {
                (await geckoClient.CoinsClient.GetAllCoinsData("", 500, page, "", null))
                    .ToList()
                    .ForEach(x => MarketCaps[x.Id] = x.MarketData.MarketCapRank);
            }
        }

        public double? GetMarketcapById(string id) => MarketCaps.ContainsKey(id) ? MarketCaps[id] : null;

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