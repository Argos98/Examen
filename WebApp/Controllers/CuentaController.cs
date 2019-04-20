using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class CuentaController : Controller
    {
        public ActionResult InicioSesion()
        {
            return View();
        }

        public ActionResult RecuperarContrasena()
        {
            return View();
        }

        public ActionResult RegistrarCuenta()
        {
            return View();
        }
    }
}