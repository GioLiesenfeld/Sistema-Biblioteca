using System.ComponentModel.DataAnnotations;

namespace Biblioteca.Api.DTOs;

public class CriarLivroDto
{
    [Required(ErrorMessage = "O título é obrigatório.")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "O autor é obrigatório.")]
    public string Autor { get; set; } = string.Empty;

    [Required(ErrorMessage = "O ISBN é obrigatório.")]
    public string Isbn { get; set; } = string.Empty;

    [Required(ErrorMessage = "A categoria é obrigatória.")]
    public string Categoria { get; set; } = string.Empty;
}