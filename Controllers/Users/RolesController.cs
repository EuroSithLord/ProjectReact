using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_React.Context;
using Project_React.Controllers.Users.IncomingModels;
using Project_React.Models;
using Project_React.Resources;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers.Users
{
    /// <summary>
    ///     Controller for user roles in application.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IdentityContext _context;

        /// <summary>
        ///     Controller constructor, takes <paramref name="roleManager"/>
        ///     and <paramref name="context"/> as parameteres.
        /// </summary>
        public RolesController(RoleManager<IdentityRole> roleManager, IdentityContext context)
        {
            _roleManager = roleManager;
            _context = context;
        }

        /// <summary>
        ///     HTTP Get request method.
        /// </summary>
        /// <returns>All roles in application.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetRoles()
        {
            // TODO: web api name convention url
            // TODO: cancellation token
            var roleDbList = _roleManager.Roles.ToList();

            if (roleDbList is null) return BadRequest(AppResources.RolesDoNotExist);

            var roleList = roleDbList.Select(role => new RoleModel
            {
                Name = role.Name
            });

            return Ok(roleList);
        }

        /// <summary>
        ///     HTTP Post request method. Adds role to application. Takes
        ///     <paramref name="roleModel"/> as parameter from request body.
        /// </summary>
        /// <returns> 
        ///     Gets the name of the role and returns request status
        ///     and a message.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> CreateRole(RoleModel roleModel)
        {
            if (roleModel is null) return BadRequest(AppResources.NullRole);

            var role = _context.Roles.FirstOrDefault(role => role.Name == roleModel.Name);

            if (role is not null) return BadRequest(AppResources.RoleAlreadyExists);

            var newRole = new Role
            {
                Name = roleModel.Name
            };
            var result = await _roleManager.CreateAsync(newRole);

            if (result.Succeeded) return Ok(AppResources.RoleCreated);
            return BadRequest(AppResources.RoleCreationImpossible);
        }

        /// <summary>
        ///     HTTP Post request method. Removes role from application. Takes
        ///     <paramref name="roleModel"/> as parameter from request body.
        /// </summary>
        /// <returns> 
        ///     Gets the name of the role and returns request status
        ///     and a message.
        /// </returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> DeleteRole(RoleModel roleModel)
        {
            if (roleModel is null) return BadRequest(AppResources.NullRole);

            var role = _context.Roles.FirstOrDefault(role => role.Name == roleModel.Name);

            if (role is null) return BadRequest(AppResources.RoleDoesNotExist);

            var result = await _roleManager.DeleteAsync(role);

            if (result.Succeeded) return Ok(AppResources.RoleDeleted);
            return BadRequest(AppResources.RoleDeletionImpossible);
        }
    }
}
