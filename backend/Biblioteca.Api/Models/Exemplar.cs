namespace Biblioteca.Api.Models;

public class Exemplar
{
    public int Id { get; set; }

    public required string codigoIdentificacao { get; set; }
    public required string status { get; set; }

    //relacionamento com empréstimo 
    public List<Emprestimo> Emprestimos { get; set; } = new();

}