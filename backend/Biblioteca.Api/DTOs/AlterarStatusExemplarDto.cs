using System.ComponentModel.DataAnnotations;

namespace Biblioteca.Api.DTOs;

public class AlterarStatusExemplarDto
{
    [Required(ErrorMessage = "O status é obrigatório.")]
    public string Status { get; set; } = string.Empty;
}