namespace Biblioteca.Api.Models;
public class Reserva
{
    public int Id { get; set; }

    public required DateOnly DataReserva { get; set; }
    public required string Status { get; set; }
    public int PosicaoFila { get; set; }


    //Relacionamento com Estudante
    public int EstudanteId { get; set; }
    public required Estudante Estudante { get; set; }


    //Relacionamento com Livro
    public int LivroId { get; set; }
    public required Livro Livro { get; set; }
}