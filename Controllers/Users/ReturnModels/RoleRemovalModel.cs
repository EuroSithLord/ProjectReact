using Project_React.Controllers.Users.IncomingModels;
using System.Collections.Generic;

namespace Project_React.Controllers.Users.ReturnModels
{
    /// <summary>
    ///     Model for role deletion method return.
    /// </summary>
    public class RoleRemovalModel
    {
        /// <summary>
        ///     Return role model list getter and setter.
        /// </summary>
        public IEnumerable<RoleModel> Roles { get; set; }

        /// <summary>
        ///     Return message getter and setter.
        /// </summary>
        public string Message { get; set; }
    }
}
