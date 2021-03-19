using System.Reflection.Emit;
using System.Security.Cryptography.X509Certificates;
using System.Runtime.Intrinsics.X86;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoinGecko.Clients;
using CoinGecko.Interfaces;

namespace Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CoinsController : Controller
    {
        private readonly ICoinGeckoClient _client;
        public CoinsController()
        {
            _client = CoinGeckoClient.Instance;
        }
        
        [HttpGet]
        [ResponseCache(Duration = 120)]
        public async Task<ActionResult> All()
        {
            var result = await _client.CoinsClient.GetAllCoinsData();
            return Json(result.Select(x => new {
                id = x.Id,
                label = x.Name,
                price = x.MarketData.CurrentPrice["usd"],
                count = 0
            }));
        }
    }
}
