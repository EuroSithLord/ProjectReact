using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_React.Context;
using Project_React.Controllers.Users.ReturnModels;
using Project_React.Models;
using Project_React.Resources;
using System;
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
        private readonly SignInManager<User> _signInManager;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IdentityContext context)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetUsers()
        {
            var userDbList = _userManager.Users.ToList();

            if (userDbList is null) return BadRequest(AppResources.UsersDoNotExist);

            var userList = userDbList.Select(user => new InitialGetUserModel
            {
                Id = user.Id,
                Name = $"{user.FirstName} {user.LastName}",
                UserName = user.UserName,
                Email = user.Email,
            });

            return Ok(userList);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDetailedUsers(string id)
        {
            var userDb = _userManager.Users.FirstOrDefault(user => user.Id == id);

            if (userDb is null) return BadRequest(AppResources.UsersDoNotExist);

            /*var userList = userDbList.Select(user => new GetUsersModel
            {
                Id = user.Id,
                Name = $"{user.FirstName} {user.LastName}",
                UserName = user.UserName,
                Email = user.Email,
                Roles = new List<string>()
            });*/

            var roles = await _userManager.GetRolesAsync(userDb);

            return Ok(new GetUsersModel
            {
                Id = userDb.Id,
                Name = $"{userDb.FirstName} {userDb.LastName}",
                UserName = userDb.UserName,
                Email = userDb.Email,
                Roles = roles
            });
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> DeleteUser(GetUsersModel getUser)
        {
            // can we call GetUsers method?
            if (getUser is null) return BadRequest(AppResources.NullUser);

            var user = _context.Users.FirstOrDefault(user => user.Email == getUser.Email);

            if (user is null) return BadRequest(AppResources.UserDeletionNoUserInDb);

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded) return BadRequest(AppResources.UserDeletionImpossible);

            var userDbList = _userManager.Users.ToList();

            if (userDbList is null) return Ok(new UserRemovalModel { Message = AppResources.UserDeletionNoUsersLeft, Users = null });

            var userReturnList = userDbList.Select(async user => new GetUsersModel
            {
                Name = $"{user.FirstName} {user.LastName}",
                UserName = user.UserName,
                Email = user.Email,
                Roles = await _userManager.GetRolesAsync(user)
            });

            return Ok(new { Users = userReturnList, Message = AppResources.UserDeleted });
        }

        [HttpPost("creation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> CreateUser(CreateUserModel userToCreate)
        {
            if (userToCreate is null) return BadRequest(AppResources.NullUser);

            var user = _context.Users.FirstOrDefault(user => user.Id == userToCreate.Id);

            if (user is not null) return BadRequest(AppResources.UserAlreadyExists);

            var hasher = new PasswordHasher<CreateUserModel>();
            var hash = hasher.HashPassword(userToCreate, userToCreate.Password);
            // TODO: set guid to newUser
            // or configure dbcontext to give roles directly to newUser (virtual property - property.collection)
            var newUser = new User
            {
                Email = userToCreate.Email,
                PasswordHash = hash,
                UserName = userToCreate.Email,
                FirstName = userToCreate.FirstName,
                LastName = userToCreate.LastName,
            };
            var result = await _userManager.CreateAsync(newUser);

            if (!result.Succeeded) return BadRequest(AppResources.UserCreationImpossible);
            else
            {
                var roleResult = await _userManager.AddToRolesAsync(newUser, userToCreate.Roles);

                // TODO: Best practice for updating list 

                var userDbList = _userManager.Users.ToList();
                var userReturnList = userDbList.Select(async user => new GetUsersModel
                {
                    Name = $"{user.FirstName} {user.LastName}",
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = await _userManager.GetRolesAsync(user)
                });

                return Ok(new { Users = userReturnList, Message = AppResources.UserCreated });
                // return Ok(new { Users = userReturnList, Message = string.Format(AppResources.UserCreatedNoRole, rolesNotAdded) });
            }
        }

        [HttpPost("modification")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> ChangeUser(ChangeUserModel userToChange)
        {
            if (userToChange is null) return BadRequest(AppResources.NullUser);

            var user = _context.Users.FirstOrDefault(user => user.Id == userToChange.Id);

            if (user is null) return BadRequest(AppResources.UserDoesNotExist);

            var userRoles = await _userManager.GetRolesAsync(user);

            if
            (
                user.Email == userToChange.Email
                && user.UserName == userToChange.UserName
                && user.FirstName == userToChange.FirstName
                && user.LastName == userToChange.LastName
                && userRoles == userToChange.Roles
            ) return BadRequest(AppResources.UserModificationSameData);

            if (userToChange.Email.All(character => Char.IsLetterOrDigit(character))) user.Email = userToChange.Email;
            if (userToChange.UserName.All(character => Char.IsLetterOrDigit(character))) user.UserName = userToChange.UserName;
            if (userToChange.FirstName.All(character => Char.IsLetterOrDigit(character))) user.FirstName = userToChange.FirstName;
            if (userToChange.LastName.All(character => Char.IsLetterOrDigit(character))) user.LastName = userToChange.LastName;

            var rolesNotAdded = new List<string>();

            if (userToChange.Roles.Any())
            {
                var rolesRemovalResult = await _userManager.RemoveFromRolesAsync(user, userRoles);

                if (rolesRemovalResult.Succeeded)
                {
                    var roleResult = await _userManager.AddToRolesAsync(user, userToChange.Roles);
                }
                else rolesNotAdded = (List<string>)userToChange.Roles;
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(AppResources.UserEditImpossible);
            else
            {
                var userDbList = _userManager.Users.ToList();
                var userReturnList = userDbList.Select(async user => new GetUsersModel
                {
                    Name = $"{user.FirstName} {user.LastName}",
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = await _userManager.GetRolesAsync(user)
                });

                if (!rolesNotAdded.Any()) return Ok(new { Users = userReturnList, Message = AppResources.UserEdited });

                return Ok(new { Users = userReturnList, Message = string.Format(AppResources.UserEditedNoRoles, string.Join(",", rolesNotAdded.ToArray())) });
            }
        }
    }
}
