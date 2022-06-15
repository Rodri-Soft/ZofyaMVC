using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZofyaMVC.Models
{
    public partial class staff
    {
        public string RFC { get; set; } = null!;
        public string CURP { get; set; } = null!;
        public string Rol { get; set; } = null!;

        [Required(ErrorMessage = "Email Required Field")]
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;

        [Required(ErrorMessage = "Password Required Field")]
        public string Password { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}
