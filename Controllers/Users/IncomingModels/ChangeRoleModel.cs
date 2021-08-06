using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Users.IncomingModels
{
    /// <summary>
    ///     Object model for incoming role to be changed.
    /// </summary>
    public class ChangeRoleModel
    {
        /// <summary>
        ///     Getter/setter for the old name of the role.
        /// </summary>
        public string OldName { get; set; }

        /// <summary>
        ///     Getter/setter for the new name of the role.
        /// </summary>
        public string NewName { get; set; }
    }
}
