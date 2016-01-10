using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ChessRoom.Startup))]
namespace ChessRoom
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
