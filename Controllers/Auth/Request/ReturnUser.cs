using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Auth.Request
{
    /// <summary>
    ///     Object class to be returned on auth sign in request.
    /// </summary>
    public class ReturnUser
    {
        /// <summary>
        ///     Name property for ReturnUser.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        ///     Email property for ReturnUser.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        ///     UserName property for ReturnUser.
        /// </summary>
        public string UserName { get; set; }
    }
}
