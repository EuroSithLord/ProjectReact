using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_React.Controllers.Auth
{
    /// <summary>
    ///     JWT Authentication Options. Provides token
    ///     details.
    /// </summary>
    public class AuthOptions
    {
        /// <summary>
        ///     JWT security token issuing party.
        /// </summary>
        public const string ISSUER = "CTIFServer";
        /// <summary>
        ///     JWT security token consumer.
        /// </summary>
        public const string AUDIENCE = "CTIFClient";
        const string KEY = "loremipsum";
        /// <summary>
        ///     JWT security token lifetime.
        /// </summary>
        public const int LIFETIME = 30;
        /// <summary>
        ///     JWT security token encoding method.
        /// </summary>
        /// <returns>   A new security key.</returns>
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
