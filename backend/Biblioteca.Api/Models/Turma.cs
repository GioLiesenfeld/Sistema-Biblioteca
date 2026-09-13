namespace Biblioteca.Api.Models;

public class Turma
{
    public int Id { get; set; }

    public required string Nome { get; set; }
    public required string AnoLetivo { get; set; }

    public required string Turno { get; set; }
    public List<Estudante> Estudantes { get; set; } = new();
}