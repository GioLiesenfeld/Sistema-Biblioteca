namespace Biblioteca.Api.DTOs;

public class EmprestimoDto
{
    public int Id { get; set; }
    public string TituloLivro { get; set; } = string.Empty;
    public string CodigoExemplar { get; set; } = string.Empty;
    public DateOnly DataEmprestimo { get; set; }
    public DateOnly DataPrevistaDevolucao { get; set; }
    public DateOnly? DataDevolucao { get; set; }
    public string Status { get; set; } = string.Empty;
}