namespace Biblioteca.Api.Models;

public class Exemplar
{
    public int Id { get; set; }

    public required string codigoIdentificacao { get; set; }
    public required string status { get; set; }

    //relacionamento com livro
    public int LivroId { get; set; }
    public required Livro Livro { get; set; }

    //relacionamento com empréstimo 
    public List<Emprestimo> Emprestimos { get; set; } = new();

}