using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Project_React.Models
{
    public class Role : IdentityRole
    {
        [Key]
        public Guid Id { get; set; }
    }
}
