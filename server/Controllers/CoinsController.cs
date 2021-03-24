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
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CoinsController : Controller
    {
        private readonly CoinsUpdateService coinsService;

        public CoinsController(CoinsUpdateService coinsService)
        {
            this.coinsService = coinsService;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult All()
        {
            return Content(coinsService.json);
        }
    }
}
