using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_React.Context;
using Project_React.Controllers.Users.ReturnModels;
using Project_React.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IdentityContext _context;

        public UsersController(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, IdentityContext context)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("getusers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetUsers()
        {
            var userList = new List<GetUsersModel>();
            var userDbList = _userManager.Users.ToList();

            foreach (var user in userDbList)
            {
                var newUser = new GetUsersModel
                {
                    Name = $"{user.FirstName} {user.LastName}",
                    Email = user.Email,
                    UserName = user.UserName,
                    
                };

                userList.Add(newUser);
            }

            return Ok(userList);
        }
    }
}
