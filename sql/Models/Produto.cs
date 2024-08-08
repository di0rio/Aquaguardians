using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace SGE.Models
{
    public class Produto
    {
        public Guid IdProduto { get; set; }
        public string NomeProduto { get; set; }
    }
}