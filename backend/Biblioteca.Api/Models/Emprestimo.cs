namespace Biblioteca.Api.Models;

public class Emprestimo
{
    public int Id { get; set; }

    public required DateOnly DataEmprestimo { get; set; }
    public required DateOnly DataPrevistaDevolucao { get; set; }
    public DateOnly? DataDevolucao { get; set; }
    public required string Status { get; set; }



    // Relacionamento com Estudante
    public int EstudanteId { get; set; }
    public required Estudante Estudante { get; set; }


    //Relacionamento com Exemplar
    public int ExemplarId {get; set;}
    public required Exemplar Exemplar { get; set;}


    //Relacionamento com Bibliotecário
    public int BibliotecarioId { get; set; }
    public required Bibliotecario Bibliotecario { get; set; }


    // Relacionamento com Multa
    public Multa? Multa { get; set; }
}