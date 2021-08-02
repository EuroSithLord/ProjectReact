using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Project_React.Context;
using Project_React.Controllers.Auth.Request;
using Project_React.Interfaces;
using Project_React.Models;
using Project_React.Resources;
using System.Linq;
using System.Threading.Tasks;

namespace Project_React.Controllers
{
    /// <summary>
    ///     Authentication request controller.
    /// </summary>
    [Authorize]
    [Route("/api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IdentityContext _context;
        private IConfiguration _configuration;
        private readonly IJwtHandlerAuth _jwtHandlerAuth;

        /// <summary>
        ///     Authentication controller constructor. Takes:
        ///     <paramref name="userManager"/>
        ///     <paramref name="signInManager"/>,
        ///     <paramref name="context"/>,
        ///     <paramref name="iConfig"/> and
        ///     <paramref name="jwtHandlerAuth"/>.
        /// </summary>
        public AuthController(
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            IdentityContext context, 
            IConfiguration iConfig,
            IJwtHandlerAuth jwtHandlerAuth)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _configuration = iConfig;
            _jwtHandlerAuth = jwtHandlerAuth;
        }

        /// <summary>
        ///     Authentication request logic, taking user data from request body <paramref name="authUser"/>. 
        ///     Returns username and full name.
        /// </summary>
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> LoginPost(AuthUser authUser)
        {
            var user = _context.Users.FirstOrDefault(user => user.Email == authUser.Email);

            if (authUser is null) return BadRequest(AppResources.NullUser);
            if (user is null) return BadRequest(AppResources.UserBadCredentials);
            else
            {
                var isPassword = _userManager.CheckPasswordAsync(user, authUser.Password);

                if (!isPassword.Result) return BadRequest(AppResources.UserBadCredentials);

                var token = _jwtHandlerAuth.Authentication(authUser);

                if (token == null) return BadRequest(AppResources.UserAuthenticationImpossible);

                var signInResult = await _signInManager.PasswordSignInAsync(authUser.Email, authUser.Password, false, false);

                if (!signInResult.Succeeded) return BadRequest(AppResources.UserAuthenticationImpossible);

                string cookieValue = Request.Cookies["jwt"];

                var returnUser = new ReturnUser
                {
                    Email = user.Email,
                    Name = $"{user.FirstName} {user.LastName}",
                    UserName = user.UserName
                };

                if (cookieValue != token)
                {
                    Response.Cookies.Append("jwt", token, new CookieOptions
                    {
                        HttpOnly = true,
                        IsEssential = true,
                        SameSite = SameSiteMode.None,
                        Secure = true
                    });
                }

                return Ok(returnUser);
            }
        }

        /// <summary>
        ///     User registration method. Takes <paramref name="registerUser"/> as the user
        ///     attempting registration.
        /// </summary>
        /// <returns>   Ok is registration was successful or BadRequest if unseccessful.</returns>
        [AllowAnonymous]
        [HttpPost("registration")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> RegisterPost(RegisterUser registerUser)
        {
            if (registerUser is null) return BadRequest(AppResources.NullUser);
            // move if to var
            if (_context.Users.FirstOrDefault(user => user.Email == registerUser.Email) != null) return BadRequest(AppResources.UserAlreadyRegistered);

            var hasher = new PasswordHasher<RegisterUser>();
            var hash = hasher.HashPassword(registerUser, registerUser.Password);
            var newUser = new User { 
                Email = registerUser.Email, 
                PasswordHash = hash, 
                UserName = registerUser.Email, 
                FirstName = registerUser.FirstName, 
                LastName = registerUser.LastName
            };
            var result = await _userManager.CreateAsync(newUser);

            if (result.Succeeded)
            {
                return Ok();
            }
            else return BadRequest(AppResources.UserRegistrationImpossible);
        }
    }
}