using Microsoft.AspNetCore.Mvc;

namespace SimplyRecruitAPI.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
