namespace Project_React.Controllers.Users.ReturnModels
{
    /// <summary>
    ///     User model for return on GetUsers request in Users Panel.
    /// </summary>
    public class GetUsersModel
    {
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

        /// <summary>
        ///     Gets and sets user's role.
        /// </summary>
        public string Role { get; set; }
    }
}
