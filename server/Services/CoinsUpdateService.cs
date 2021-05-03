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
using server.Services;

namespace Server.Services
{
    public class CoinsUpdateService : IHostedService, IDisposable
    {
        private Timer timer;
        public List<CoinModel> coins = new List<CoinModel>();
        public string json;
        private ICoinGeckoClient geckoClient = CoinGeckoClient.Instance;
        private CoinMarketcapService mcapSvc;

        public CoinsUpdateService(CoinMarketcapService mcapSvc) 
        {
            this.mcapSvc = mcapSvc;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
                return Task.CompletedTask;

            timer = new Timer(async (state) => await FetchCoins(state), null, TimeSpan.Zero, TimeSpan.FromMinutes(5));

            return Task.CompletedTask;
        }

        private async Task FetchCoins(object state)
        {
            this.coins = (await geckoClient.CoinsClient.GetCoinList(includePlatform: false))
                            .Select(x=> new CoinModel()
                            {
                                Id = x.Id,
                                Label = x.Name,
                                MarketCap = mcapSvc.GetMarketcapById(x.Id)
                            })
                            .OrderBy(x => x.MarketCap)
                            .ToList();
            this.json = JsonConvert.SerializeObject(coins
                .Where(x=> x.MarketCap > 0).OrderBy(x => x.MarketCap)
                .Concat(coins.Where(x => x.MarketCap < 0 || x.MarketCap == null)));
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