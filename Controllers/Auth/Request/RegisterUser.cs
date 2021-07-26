using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Auth.Request
{
    public class RegisterUser
    {
        /// <summary>
        ///     Property for reading and writing the first name client.
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        ///     Property for reading and writing the last name from client.
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        ///     Property for reading and writing the username from client.
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        ///     Property for reading and writing the email from client.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        ///     Property for reading and writing the password from client.
        /// </summary>
        public string Password { get; set; }
    }
}
