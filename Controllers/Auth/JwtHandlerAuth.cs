using Microsoft.IdentityModel.Tokens;
using Project_React.Controllers.Auth.Request;
using Project_React.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Project_React.Controllers.Auth
{
    /// <summary>
    ///     Jwt token handler for sign in.
    /// </summary>
    public class JwtHandlerAuth :IJwtHandlerAuth
    {
        private string _privateKey;

        /// <summary>
        ///     JwtHandler constructor.  Takes a <paramref name="privateKey"/> secret key
        ///     for token creation.
        /// </summary>
        public JwtHandlerAuth(string privateKey)
        {
            _privateKey = privateKey;
        }

        /// <summary>
        ///     Creates new claim for <paramref name="authUser"/> and generates
        ///     sign in token.
        /// </summary>
        /// <returns>A Jwt token.</returns>
        public string Authentication(AuthUser authUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim("UserName", authUser.Email),
                        new Claim("Email", authUser.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF32.GetBytes(_privateKey)),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            tokenHandler.WriteToken(token);

            return tokenHandler.WriteToken(token);
        }
    }
}
