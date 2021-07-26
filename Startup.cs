using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Project_React.Context;
using Project_React.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Project_React
{
    /// <summary>
    ///     Startup class, effectively builds the app.
    /// </summary>
    public class Startup
    {
        /// <summary>
        ///     Startup constructor, takes <paramref name="configuration"/> 
        ///     for app config and <paramref name="webHostEnvironment"/>
        ///     for env variables.
        /// </summary>
        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            WebHostEnvironment = webHostEnvironment;
        }
        /// <summary>
        ///     COnfiguration getter.
        /// </summary>
        public IConfiguration Configuration { get; }
        /// <summary>
        ///     Appp environment getter.
        /// </summary>
        public IWebHostEnvironment WebHostEnvironment { get; }

        /// <summary>
        ///     Adds different <paramref name="services"/> from collection to app.
        ///     Includes filters, cookie auth and client app config.
        /// </summary>
        /// 
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDbContext<UserContext>(options =>
            {
                if (!options.IsConfigured) options.UseSqlServer(Configuration.GetConnectionString("ProjectReact"));
            });

            //services.AddIdentityCore<User>().AddEntityFrameworkStores<UserContext>();

            var builder = services.AddIdentityCore<User>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddRoles<IdentityRole>();
            identityBuilder.AddEntityFrameworkStores<UserContext>();
            identityBuilder.AddSignInManager<SignInManager<User>>();
            identityBuilder.AddDefaultTokenProviders();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
            //    authenticationScheme: JwtBearerDefaults.AuthenticationScheme,
            //    configureOptions: options => {
            //        options.IncludeErrorDetails = true;
            //        options.TokenValidationParameters = new TokenValidationParameters()
            //        {
            //            IssuerSigningKey = new SymmetricSecurityKey(
            //                Encoding.UTF32.GetBytes(Configuration["Jwt:PrivateKey"])
            //            ),
            //            ValidAudience = "ctifclientapp",
            //            ValidIssuer = "ctifserverapp",
            //            RequireExpirationTime = true,
            //            RequireAudience = true,
            //            ValidateIssuer = true,
            //            ValidateLifetime = true,
            //            ValidateAudience = true,
            //        };
            //    });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(x => x.LoginPath="/");
        }

        /// <summary>
        ///     Configures the aplication <paramref name="app"/> using
        ///     the <paramref name="env"/> environment.
        /// </summary> 
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
