using System.Web;
using System.Web.Mvc;
using WebApp.Models.Controls;

namespace WebApp.Helpers
{
    public static class ControlExtensions
    {
        public static HtmlString CtrlTable(this HtmlHelper html, string viewName, string id, string title,
            string columnsTitle, string ColumnsDataName, string onSelectFunction)
        {
            var ctrl = new CtrlTableModel
            {
                ViewName = viewName,
                Id = id,
                Title = title,
                Columns = columnsTitle,
                ColumnsDataName = ColumnsDataName,
                FunctionName = onSelectFunction
            };

            return new HtmlString(ctrl.GetHtml());
        }

        public static HtmlString CtrlChart(this HtmlHelper html, string id, string title)
        {
            var ctrl = new CtrlChartModel
            {
                Id = id,
                Title = title
            };

            return new HtmlString(ctrl.GetHtml());
        }

        public static HtmlString CtrlInput(this HtmlHelper html, string id, string type, string label, string placeHolder = "", bool required = false, string mensajeValidacion = "")
        {
            var ctrl = new CtrlInputModel
            {
                Id = id,
                Type = type,
                Label = label,
                PlaceHolder = placeHolder,
                Required = required ? "required" : "",
                MensajeValidacion = mensajeValidacion,
                CampoRequerido = required ? "*" : ""
            };

            return new HtmlString(ctrl.GetHtml());
        }

        public static HtmlString CtrlTextArea(this HtmlHelper html, string id,  string label, string placeHolder = "", bool required = false, string mensajeValidacion = "")
        {
            var ctrl = new CtrlTextAreaModel
            {
                Id = id,
                Label = label,
                PlaceHolder = placeHolder,
                Required = required ? "required" : "",
                MensajeValidacion = mensajeValidacion,
                CampoRequerido = required ? "*" : ""
            };

            return new HtmlString(ctrl.GetHtml());
        }

        public static HtmlString CtrlIndicator(this HtmlHelper html, string id, string icon, string label, CtrlIndicatorModel.ColorDash indicatorColorDash = CtrlIndicatorModel.ColorDash.BLUE)
        {
            var ctrl = new CtrlIndicatorModel
            {
                Id = id,
                Label = label,
                Icon = icon,
                IndicatorColorDash = indicatorColorDash
            };

            return new HtmlString(ctrl.GetHtml());
        }

        public static HtmlString CtrlButton(this HtmlHelper html, string viewName, string id, string label, string onClickFunction = "", string buttonType = "primary")
        {
            var ctrl = new CtrlButtonModel
            {
                ViewName = viewName,
                Id = id,
                Label = label,
                FunctionName = onClickFunction,
                ButtonType = buttonType
            };

            return new HtmlString(ctrl.GetHtml());
        }

        public static HtmlString CtrlDropDown(this HtmlHelper html, string id, string label, string service = "", bool required = false, string mensajeValidacion = "")
        {
            var ctrl = new CtrlDropDownModel
            {
                Id = id,
                Label = label,
                Required = required ? "required" : "",
                MensajeValidacion = mensajeValidacion,
                CampoRequerido = required ? "*" : "",
                Service = service
            };

            return new HtmlString(ctrl.GetHtml());
        }

    }
}