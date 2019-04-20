using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace WebApp.Controllers
{
    public class AeropuertoController : Controller
    {
        // GET: Aeropuerto
        public ActionResult Listar()
        {
            return View();
        }

        public ActionResult Registrar()
        {
            return View();
        }

        public ActionResult Editar()
        {
            return View();
        }

        public ActionResult Eliminar()
        {
            return View();
        }

        public ActionResult Detalle()
        {
            return View();
        }

        public JsonResult EnviarCorreoAUsuario(string emailDestino, string subject, string cuerpoEmail)
        {
            bool result = false;

            result = EnviarCorreo(emailDestino, subject, cuerpoEmail);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public bool EnviarCorreo (string emailDestino, string subject, string cuerpoEmail)
        {
            try
            {
                string senderEmail = System.Configuration.ConfigurationManager.AppSettings["CorreoDelApp"].ToString();
                string senderPassword = System.Configuration.ConfigurationManager.AppSettings["PasswordDelApp"].ToString();

                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Timeout = 1000000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(senderEmail, senderPassword);

                MailMessage mailMessage = new MailMessage(senderEmail, emailDestino, subject, cuerpoEmail);
                mailMessage.IsBodyHtml = true;
                mailMessage.BodyEncoding = UTF8Encoding.UTF8;

                client.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public ActionResult ListarParaAdminAerolinea()
        {
            return View();
        }
    }
}