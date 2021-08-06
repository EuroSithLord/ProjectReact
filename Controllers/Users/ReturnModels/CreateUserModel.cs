using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Users.ReturnModels
{
    public class CreateUserModel
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}
