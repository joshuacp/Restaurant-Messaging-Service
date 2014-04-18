using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Extensions
{
    // Note: Obviously this class isn't very flexible; it assumes location of files and the build output.
    public static class RequireJsHtmlHelperExtensions
    {
        private static readonly string SCRIPTS_PATH_BASE = GetScriptsPathBase();

        public static IHtmlString RequireJs(this HtmlHelper helper)
        {
            var tagBuilder = new TagBuilder("script");
            tagBuilder.MergeAttribute("type", "text/javascript");
            tagBuilder.MergeAttribute("src", string.Format(UrlHelper.GenerateContentUrl(string.Format("~/{0}/vendor/require.js", SCRIPTS_PATH_BASE), helper.ViewContext.HttpContext)));
            tagBuilder.MergeAttribute("data-main", UrlHelper.GenerateContentUrl(string.Format("~/{0}/main", SCRIPTS_PATH_BASE), helper.ViewContext.HttpContext));
            return new HtmlString(tagBuilder.ToString());
        }

        public static IHtmlString RequireJsModule(this HtmlHelper helper, string module)
        {
            var tagBuilder = new TagBuilder("script");
            tagBuilder.MergeAttribute("type", "text/javascript");

            var requireScript = new StringBuilder();
            var moduleVirtualPath = UrlHelper.GenerateContentUrl(string.Format("~/{0}/{1}.js", SCRIPTS_PATH_BASE, module), helper.ViewContext.HttpContext);
            if (File.Exists(helper.ViewContext.HttpContext.Server.MapPath(moduleVirtualPath)))
            {
                requireScript.AppendLine();
                requireScript.AppendLine("require(['main'], function () {");
                requireScript.AppendFormat("\trequire(['{0}']);", module);
                requireScript.AppendLine();
                requireScript.AppendLine("});");
            }

            tagBuilder.InnerHtml = requireScript.ToString();

            return new HtmlString(tagBuilder.ToString());
        }

        // Note: Pre-processor directives are probably not the best choice for this.
        private static string GetScriptsPathBase()
        {
#if DEBUG
            string jsLocation = "scripts";
#else
            string jsLocation = "scripts-built";
#endif
            return jsLocation;
        }
    }
}