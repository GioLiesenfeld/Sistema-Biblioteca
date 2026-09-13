namespace Biblioteca.Api.Models;

public class Livro
{
    public int Id { get; set; }

    public required string Titulo { get; set; }
    public required string Autor { get; set; }
    public required string Isbn { get; set; }
    public required string Categoria { get; set; }



    //Relacionamento com Exemplares
    public List<Exemplar> Exemplares { get; set; } = new();


    //Relacionamento com Reserva
    public List<Reserva> Reservas { get; set; } = new();

    
}