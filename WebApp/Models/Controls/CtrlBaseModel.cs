using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebApp.Models.Controls
{
    public class CtrlBaseModel
    {

        public string Id { get; set; }
        public string ViewName { get; set; }

        private string ReadFileText()
        {           
            // Modificar segun ambiente, ir a Web.config
            // C:\Users\leiva\Proyectos\VisualStudio\Flay\WebApp\Models\Controls
            // string path = System.Configuration.ConfigurationManager.AppSettings["PathTemplates"];
            string path = HostingEnvironment.MapPath("/");
            path += @"\Models\Controls\";
            string fileName = this.GetType().Name + ".html";

            path = path + fileName;

            string text = System.IO.File.ReadAllText(path);

            return text;
        }

        public string GetHtml()
        {
            var html = ReadFileText();

            foreach (var prop in this.GetType().GetProperties())
            {
                if (prop != null)
                {
                    var value = prop.GetValue(this, null).ToString();

                    var tag = string.Format("-#{0}-", prop.Name);
                    html = html.Replace(tag, value);
                }
            }
            return html;
        }
    }
}