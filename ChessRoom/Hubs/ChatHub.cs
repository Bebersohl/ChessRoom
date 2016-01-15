using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ChessRoom.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace ChessRoom.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public override Task OnConnected()
        {

            var name = Context.User.Identity.Name;
            using (var db = new bebersohl_DBEntities())
            {
                var user = db.Users
                    .Include(u => u.Connections)
                    .SingleOrDefault(u => u.UserName == name);

                if (user == null)
                {
                    user = new User
                    {
                        UserName = name,
                        EloRating = 1500,
                        Connections = new List<Connection>()
                    };
                    db.Users.Add(user);
                }

                user.Connections.Add(new Connection
                {
                    ConnectionID = Context.ConnectionId,
                    UserAgent = Context.Request.Headers["User-Agent"],
                    Connected = true
                });
                db.SaveChanges();
            }
            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            using (var db = new bebersohl_DBEntities())
            {
                var connection = db.Connections.Find(Context.ConnectionId);
                db.Connections.Remove(connection);
                db.SaveChanges();
            }
            return base.OnDisconnected(stopCalled);
        }
        public void Send(string message, string sender)
        {
            
            if (message.Contains("/pm"))
            {

                string[] words = message.Split(' ');
                if (words.Length >= 2)
                {
                    Clients.User(words[1])
                        .addNewMessageToPage(message.Substring(message.IndexOf(' ', message.IndexOf(' ') + 1)),
                            "text-info", sender);
                    Clients.Caller.addNewMessageToPage(
                        "To " + words[1] + ": " + message.Substring(message.IndexOf(' ', message.IndexOf(' ') + 1)),
                        "text-info", sender);
                }
                else
                {
                    Clients.Caller.addNewMessageToPage("No target user found", "text-danger", "[Error]");
                }

            }
            else
            {
                Clients.All.addNewMessageToPage(message, "all", Context.User.Identity.GetUserName());
            }
        }
            
        
    }
}