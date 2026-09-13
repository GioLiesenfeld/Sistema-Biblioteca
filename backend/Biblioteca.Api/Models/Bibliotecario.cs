namespace Biblioteca.Api.Models;

public class Bibliotecario
{
    public int Id { get; set; }

    public required string Nome { get; set; }
    public required string Email { get; set; }
    public required string Senha { get; set; }

    //Relacionamento com Empréstimo
    public List<Emprestimo> Emprestimos { get; set; } = new();

}