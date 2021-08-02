using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_React.Context;
using Project_React.Controllers.Users.ReturnModels;
using Project_React.Models;
using Project_React.Resources;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IdentityContext _context;

        public UsersController(UserManager<User> userManager, IdentityContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetUsers()
        {
            var userDbList = _userManager.Users.ToList();

            if (userDbList is null) return BadRequest(AppResources.UsersDoNotExist);

            var userList = userDbList.Select(user => new GetUsersModel
            {
                Name = $"{user.FirstName} {user.LastName}",
                UserName = user.UserName,
                Email = user.Email
            });

            return Ok(userList);
        }
    }
}
