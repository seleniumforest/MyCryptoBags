using System.Security.AccessControl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoinGecko.Clients;
using CoinGecko.Interfaces;
using Server.Models;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CoinsController : Controller
    {
        private readonly ICoinGeckoClient client;
        private readonly IMemoryCache cache;

        public CoinsController(IMemoryCache memoryCache)
        {
            client = CoinGeckoClient.Instance;
            cache = memoryCache;
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult> All()
        {
            var key = "api/coins/all";
            var cached = cache.Get<string>(key);
            if (!string.IsNullOrEmpty(cached))
                return Content(cached);

            var json = JsonConvert.SerializeObject(await GetCoinList());
            cache.Set(key, json, TimeSpan.FromMinutes(1));

            return Content(json);
        }

        async Task<List<CoinModel>> GetCoinList()
        {
            List<CoinModel> result = new List<CoinModel>();
            foreach (int i in new int[] { 1, 2, 3, 4 })
            {
                result.AddRange((await client.CoinsClient.GetAllCoinsData("", 500, i, "", null)).Select(x => new CoinModel
                {
                    id = x.Id,
                    label = x.Name,
                    price = x.MarketData.CurrentPrice["usd"],
                    count = 0
                }).ToList());
            }
            return result;
        }
    }
}
