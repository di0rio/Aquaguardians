using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace SGE.Models
{
    public class User
    {
        public Guid IdUser { get; set; }

        [Required(ErrorMessage = "O campo de Nome de usuário é obrigatório")]
        [MinLength(3, ErrorMessage = "O campo Nome deve ter no " +
                       "mínimo 3 caracteres")]
        [StringLength(100, ErrorMessage = "O campo Nome deve ter no " +
            "máximo 80 caracteres")]
        [Display(Name = "Nome do usuário")]
        public string Username { get; set; }

        [Required(ErrorMessage = "O campo Email é obrigatório")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }
        
        public string Senha { get; set; }
        
        // [DataType(DataType.Date)]
        // [Display(Name = "Data de Nascimento")]
        // [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório")]
        // public DateTime DataNascimento { get; set; }
    }
}