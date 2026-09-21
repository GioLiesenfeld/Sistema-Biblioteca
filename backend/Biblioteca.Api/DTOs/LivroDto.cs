namespace Biblioteca.Api.DTOs;

public class LivroDto
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public int ExemplaresDisponiveis { get; set; }
}