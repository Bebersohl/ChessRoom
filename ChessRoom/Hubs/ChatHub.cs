using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ChessRoom.Models;
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
        public void Send(string who, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            var name = Context.User.Identity.Name;
            using (var db = new bebersohl_DBEntities())
            {
                var user = db.Users.Find(who);
                if (user == null)
                {
                    Clients.Caller.showErrorMessage("Could not find that user.");
                }
                else
                {
                    db.Entry(user)
                        .Collection(u => u.Connections)
                        .Query()
                        .Where(c => c.Connected == true)
                        .Load();

                    if (user.Connections == null)
                    {
                        Clients.Caller.showErrorMessage("The user is no longer connected.");
                    }
                    else
                    {
                        //foreach (var connection in user.Connections)
                        //{
                        //    Clients.Client(connection.ConnectionID)
                        //        .addChatMessage(name + ": " + message);
                        //}
                        Clients.All.addNewMessageToPage(who, message);
                    }
                }
            }
            

        }
    }
}