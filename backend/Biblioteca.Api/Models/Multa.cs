namespace Biblioteca.Api.Models;

public class Multa
{
    public int Id { get; set; }

    public decimal Valor { get; set; }
    public int DiasAtraso { get; set; }



    //Relacionamento com Estudante
    public int EstudanteId { get; set; }
    public required Estudante Estudante { get; set; }


    //Relacionamento com Empréstimo 
    public int EmprestimoId { get; set;}
    public required Emprestimo Emprestimo { get; set; }
}

