using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoinGecko.Clients;
using CoinGecko.Entities.Response.Coins;
using CoinGecko.Parameters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CoinsController : Controller
    {
        private readonly CoinsUpdateService coinsService;
        private readonly CoinGeckoClient geckoClient;

        public CoinsController(CoinsUpdateService coinsService)
        {
            this.coinsService = coinsService;
            this.geckoClient = CoinGeckoClient.Instance;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult All()
        {
            return Content(coinsService.json);
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult> Search(string query)
        {
            if (string.IsNullOrEmpty(query))
                return Content("[]");

            var list = (await geckoClient.CoinsClient.GetCoinList(includePlatform: false))
                .Where(x => x.Name.ToLowerInvariant().Contains(query.ToLowerInvariant()))
                .Select(x => new {
                    id = x.Id,
                    name = x.Name,
                    symbol = x.Symbol,
                    mcap = coinsService.coins.FirstOrDefault(y => y.id == x.Id)?.mcap
                });

            return Content(JsonConvert.SerializeObject(list.Where(x=> x.mcap > 0).OrderBy(x => x.mcap).Concat(list.Where(x => x.mcap < 0 || x.mcap == null))));
        }
    }
}
