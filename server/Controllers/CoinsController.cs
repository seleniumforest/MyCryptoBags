using Microsoft.AspNetCore.Mvc;
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
