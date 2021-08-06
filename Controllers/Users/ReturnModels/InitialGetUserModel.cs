using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Users.ReturnModels
{
    /// <summary>
    ///     Model for initial (non-detailed) users table.
    /// </summary>
    public class InitialGetUserModel
    {
        /// <summary>
        ///    Gets and sets the user UserId.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     Gets and sets the username.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        ///     Gets and sets the email.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        ///     Gets and sets user's name.
        /// </summary>
        public string Name { get; set; }
    }
}
