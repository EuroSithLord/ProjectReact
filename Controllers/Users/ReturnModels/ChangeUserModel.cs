using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_React.Controllers.Users.ReturnModels
{
    /// <summary>
    ///    Object model for user modification method return.
    /// </summary>
    public class ChangeUserModel
    {
        public string Id { get; set; }

        /// <summary>
        ///     User new first name getter/setter.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        ///     User new last name getter/setter.
        /// </summary>
        public string LastName { get; set; }


        /// <summary>
        ///     User new email getter/setter.
        /// </summary>
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
        public string Email { get; set; }

        /// <summary>
        ///     User new username getter/setter.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        ///     User new roles getter/setter.
        /// </summary>
        public IEnumerable<string> Roles { get; set; }
    }
}
