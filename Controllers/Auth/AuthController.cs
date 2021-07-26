using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_React.Models;
using Project_React.Controllers.Auth.Request;
using Project_React.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace Project_React.Controllers
{
    /// <summary>
    ///     Authentication request controller.
    /// </summary>
    [Route("/api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly UserContext _context;
        private IConfiguration _configuration;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, UserContext context, IConfiguration iConfig)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _configuration = iConfig;
        }

        /// <summary>
        ///     Authentication request logic, taking user data from request body <paramref name="authUser"/>. 
        ///     Returns username and full name.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> LoginPost(AuthUser authUser)
        {
            var user = _context.Users.FirstOrDefault(user => user.Email == authUser.Email);
            var privateKey = _configuration.GetSection("Jwt").GetSection("PrivateKey").Value;

            if (authUser is null) return BadRequest("Utilizatorul nu poate fi nul");
            if (user is null) return BadRequest("Date de autentificare greșite");
            else
            {
                var isPassword = _userManager.CheckPasswordAsync(user, authUser.Password);
                if (!isPassword.Result) return BadRequest("Date de autentificare greșite");
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKe = Encoding.UTF32.GetBytes()
                // await _signInManager.SignInAsync(user, false);
                // if (!User.Identity.IsAuthenticated) return BadRequest("Nu s-a putut realiza autentificarea");
                var signInResult = await _signInManager.PasswordSignInAsync(authUser.Email, authUser.Password, false, false);
                if (!signInResult.Succeeded) return BadRequest("Nu s-a putut realiza autentificarea");
                return Ok();
            }
        }

        /// <summary>
        ///     User registration method. Takes <paramref name="registerUser"/> as the user
        ///     attempting registration.
        /// </summary>
        /// <returns>   Ok is registration was successful or BadRequest if unseccessful.</returns>
        [HttpPost("{register}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        async public Task<IActionResult> RegisterPost(RegisterUser registerUser)
        {
            if (registerUser is null) return BadRequest("Utilizatorul nu poate fi nul");
            if (_context.Users.FirstOrDefault(user => user.Email == registerUser.Email) != null) return BadRequest("Emailul ales este deja înregistrat");

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
            else return BadRequest("Înregistrarea utilizatorului imposibilă. Încercați din nou.");
        }
    }
}