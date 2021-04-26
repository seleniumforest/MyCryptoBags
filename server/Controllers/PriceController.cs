using System.Collections.Generic;
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
        public async Task<ActionResult> ByCoinIds([FromBody]List<string> coinIds)
        {
            return Content("{}");
        }
    }
}
