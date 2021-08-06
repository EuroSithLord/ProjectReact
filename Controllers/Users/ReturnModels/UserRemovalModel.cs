using System.Collections.Generic;

namespace Project_React.Controllers.Users.ReturnModels
{
    /// <summary>
    ///     Model for user deletion method return.
    /// </summary>
    public class UserRemovalModel
    {
        /// <summary>
        ///     Return user model list getter and setter
        /// </summary>
        public IEnumerable<GetUsersModel> Users { get; set; }

        /// <summary>
        ///     Return message getter and setter.
        /// </summary>
        public string Message { get; set; }
    }
}
