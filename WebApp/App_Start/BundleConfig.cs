using System.Web.Optimization;

namespace WebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/dependencies").Include(
                        "~/Scripts/popper.min.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/svg-injector.min.js",
                        "~/Scripts/slick.js",
                        "~/Scripts/jquery.mCustomScrollbar.concat.min.js",
                        "~/Scripts/custombox.min.js",
                        "~/Scripts/custombox.legacy.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                        "~/Scripts/hs.core.js",
                        "~/Scripts/hs.megamenu.js",
                        "~/Scripts/hs.header.js",
                        "~/Scripts/hs.svg-injector.js",
                        "~/Scripts/hs.validation.js",
                        "~/Scripts/hs.unfold.js",
                        "~/Scripts/hs.modal-window.js",
                        "~/Scripts/hs.malihu-scrollbar.js",
                        "~/Scripts/hs.focus-state.js",
                        "~/Scripts/hs.show-animation.js",
                        "~/Scripts/hs.go-to.js",
                        "~/Scripts/hs.slick-carousel.js",
                        "~/Scripts/hs.modal-window.js",
                        "~/Scripts/Views/ControlActions.js"));

            bundles.Add(new ScriptBundle("~/bundles/dashboard").Include(                       
                        "~/Scripts/hs.megamenu.js",
                        "~/Scripts/svg-injector.min.js",
                        "~/Scripts/jquery.mCustomScrollbar.concat.min.js",
                        "~/Scripts/jquery.validate.min.js",
                        "~/Scripts/custombox.min.js",
                        "~/Scripts/custombox.legacy.min.js",
                        "~/Scripts/flatpickr.min.js",
                        "~/Scripts/appear.js",
                        "~/Scripts/circles.min.js",
                        "~/Scripts/chartist.min.js",
                        "~/Scripts/chartist-plugin-tooltip.js",
                        "~/Scripts/hs.core.js",
                        "~/Scripts/hs.header.js",
                        "~/Scripts/hs.unfold.js",
                        "~/Scripts/hs.malihu-scrollbar.js",
                        "~/Scripts/hs.focus-state.js",
                        "~/Scripts/hs.validation.js",
                        "~/Scripts/hs.modal-window.js",
                        "~/Scripts/hs.step-form.js",
                        "~/Scripts/hs.show-animation.js",
                        "~/Scripts/hs.range-datepicker.js",
                        "~/Scripts/hs.chart-pie.js",
                        "~/Scripts/hs.progress-bar.js",
                        "~/Scripts/hs.svg-injector.js",
                        "~/Scripts/hs.go-to.js",
                        "~/Scripts/hs.chartist-area-chart.js",
                        "~/Scripts/hs.chartist-bar-chart.js",
                        "~/Scripts/Views/ControlActions.js"));
        }
    }
}
