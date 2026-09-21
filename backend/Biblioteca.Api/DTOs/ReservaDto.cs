namespace Biblioteca.Api.DTOs;

public class ReservaDto
{
    public int Id { get; set; }
    public string TituloLivro { get; set; } = string.Empty;
    public DateOnly DataReserva { get; set; }
    public int PosicaoFila { get; set; }
    public string Status { get; set; } = string.Empty;
}