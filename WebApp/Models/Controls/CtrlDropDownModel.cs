using Entities;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;

namespace WebApp.Models.Controls
{
    public class CtrlDropDownModel : CtrlBaseModel
    {
        public string Label { get; set; }
        public string CampoRequerido { get; set; }
        public string Required { get; set; }
        public string MensajeValidacion { get; set; }
        public string Service { get; set; }
        private string URL_API_LISTs = "http://localhost:61936/api/";

        public string ListOptions
        {
            get
            {
                var htmlOptions = "";
                if (Service != "")
                {
                    var lst = GetOptionsFromAPI();

                    foreach (var option in lst)
                    {
                        htmlOptions += "<option value='" + option.IdValor + "'>" + option.Descripcion + "</option>";
                    }
                }
                return htmlOptions;
            }
            set
            {

            }
        }

        private List<ListaValor> GetOptionsFromAPI()
        {
            var client = new WebClient();
            var response = client.DownloadString(URL_API_LISTs + Service);
            var options = JsonConvert.DeserializeObject<List<ListaValor>>(response);
            return options;
        }

        public CtrlDropDownModel()
        {
            ViewName = "";
        }
    }
}