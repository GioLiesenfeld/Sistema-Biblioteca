namespace Biblioteca.Api.DTOs;

public class CriarLivroDto
{
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
}