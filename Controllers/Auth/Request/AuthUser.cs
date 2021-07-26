using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Project_React.Models;

namespace Project_React.Controllers.Auth.Request
{
    /// <summary>
    ///     Class for authentication request processing.
    /// </summary>
    public class AuthUser
    {
        /// <summary>
        ///     Property for reading and writing usernames.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        ///     Poperty for reading and writing a user's name.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        ///     Operator overload for converting from a <paramref name="user"/>
        ///     object to an AuthUser object.
        /// </summary>
        /*public static implicit operator AuthUser(User user)
        {
            return new AuthUser { UserName = user.UserName, FirstName = $"{user.FirstName} {user.LastName}"};
        }*/
    }
}
