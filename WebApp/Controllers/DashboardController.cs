using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CambiarContrasena()
        {
            return View();
        }

        public ActionResult EditarUsuario()
        {
            return View();
        }

        public ActionResult AdministradorAeropuerto()
        {
            return View();
        }

        public ActionResult AdministradorAerolinea()
        {
            return View();
        }

        public ActionResult ClienteFinal()
        {
            return View();
        }

        public ActionResult SuperAdmin()
        {
            return View();
        }
    }
}