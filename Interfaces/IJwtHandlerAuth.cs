using Project_React.Controllers.Auth.Request;

namespace Project_React.Interfaces
{
    /// <summary>
    ///     Interface for the Jwt handler.
    /// </summary>
    public interface IJwtHandlerAuth
    {
        string Authentication(AuthUser authUser);
    }
}
