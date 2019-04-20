using Exceptions;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace WebAPI
{
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
    public class ExceptionFilter : ExceptionFilterAttribute
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override void OnException(HttpActionExecutedContext context)
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            if (context.Exception is BusinessException)
            {
                var bex = (BusinessException)context.Exception;

                var json = JsonConvert.SerializeObject(bex);

                var response = new HttpResponseMessage(HttpStatusCode.InternalServerError) { Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json") };

                context.Response = response;
            }
        }
    }
}