namespace Biblioteca.Api.DTOs;

public class EstudanteDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string EmailInstitucional { get; set; } = string.Empty;
    public string StatusConta { get; set; } = string.Empty;
}