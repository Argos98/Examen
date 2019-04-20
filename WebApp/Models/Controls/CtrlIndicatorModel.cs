namespace WebApp.Models.Controls
{
    public class CtrlIndicatorModel : CtrlBaseModel
    {
        public string Label { get; set; }
        public string Icon { get; set; }
        public ColorDash IndicatorColorDash { set; get; }
        public string BtnClass
        {
            get
            {
                string btnClass = "btn-soft-primary";
                switch (IndicatorColorDash)
                {
                    case ColorDash.RED:
                        btnClass = "btn-soft-danger";
                        break;
                    case ColorDash.BLUE:
                        btnClass = "btn-soft-primary";
                        break;
                    case ColorDash.GREEN:
                        btnClass = "btn-soft-success";
                        break;
                    case ColorDash.YELLOW:
                        btnClass = "btn-soft-warning";
                        break;
                    default:
                        btnClass = "btn-soft-primary";
                        break;
                }
                return btnClass;
            }
            set { }
        }

        public enum ColorDash { RED = 1, GREEN, BLUE, YELLOW }

        public CtrlIndicatorModel()
        {
            ViewName = "";
        }
    }
}