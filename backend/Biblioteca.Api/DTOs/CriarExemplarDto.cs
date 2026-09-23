using System.ComponentModel.DataAnnotations;

namespace Biblioteca.Api.DTOs;

public class CriarExemplarDto
{
    [Required(ErrorMessage = "O código de identificação é obrigatório.")]
    public string CodigoIdentificacao { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "O LivroId deve ser válido.")]
    public int LivroId { get; set; }
}