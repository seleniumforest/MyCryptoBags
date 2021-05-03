using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using CoinGecko.Clients;
using CoinGecko.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PriceController : Controller
    {
        private readonly ICoinGeckoClient geckoClient;

        public PriceController()
        {
            this.geckoClient = CoinGeckoClient.Instance;
        }

        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult> ByCoinIds([FromBody] List<string> coinIds)
        {
            try
            {
                var coins = await geckoClient
                            .CoinsClient
                            .GetCoinMarkets("usd", coinIds.ToArray(), "asc", 50, 1, false, default, default);

                return Content(JsonConvert.SerializeObject(coins.Select(x => new { id = x.Id, label = x.Name, price = x.CurrentPrice })));
            }
            catch (HttpRequestException e)
            {
                return Content("{}");
            }
        }
    }
}
