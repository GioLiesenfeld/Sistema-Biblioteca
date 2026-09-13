namespace Biblioteca.Api.Models;

public class Estudante
{
    public int Id { get; set; }

    public required string Nome { get; set; }
    public required string EmailInstitucional { get; set; }
    public required string Senha { get; set; }
    public required string StatusConta { get; set; }



    //Referência para Turma
    public int TurmaId { get; set; }
    public required Turma Turma { get; set; }


    //relacionamento com emprestimo    
    public List<Emprestimo> Emprestimos { get; set; } = new();


    //Relacionamento com Reserva
    public List<Reserva> Reservas { get; set; } = new();

    //Relacionamento com Multas
    public List<Multa> Multas { get; set; } = new();
}