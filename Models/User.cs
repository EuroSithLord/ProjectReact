using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;


namespace Project_React.Models
{
    /// <summary>
    ///     Class defining User objects.
    /// </summary>
    public class User : IdentityUser
    {
        /// <summary>
        ///     Property for reading and writing the first name.
        /// </summary>
        [Required]
        public string FirstName { get; set; }
        /// <summary>
        ///     Property for reading and writing the last name.
        /// </summary>
        [Required]
        public string LastName { get; set; }
    }
}
