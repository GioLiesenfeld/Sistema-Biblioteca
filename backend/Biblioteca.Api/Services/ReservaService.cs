using Biblioteca.Api.Data;
using Biblioteca.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Api.Services;

public class ReservaService
{
    private readonly BibliotecaContext _context;

    public ReservaService(BibliotecaContext context)
    {
        _context = context;
    }
    public async Task<Reserva?> BuscarReservaPorIdAsync(int reservaId)
    {
        return await _context.Reservas
            .FirstOrDefaultAsync(r => r.Id == reservaId);
    }

    public async Task<Estudante?> BuscarEstudantePorIdAsync(int estudanteId)
    {
        return await _context.Estudantes
            .FirstOrDefaultAsync(e => e.Id == estudanteId);
    }
    public async Task<Livro?> BuscarLivroPorIdAsync(int livroId)
    {
        return await _context.Livros
            .FirstOrDefaultAsync(l => l.Id == livroId);
    }
    public async Task RegistrarReservaAsync(int estudanteId, int livroId)
    {
        var estudante = await BuscarEstudantePorIdAsync(estudanteId);

        if (estudante == null)
        {
            throw new Exception("Estudante não encontrado.");
        }
        var livro = await BuscarLivroPorIdAsync(livroId);

        if (livro == null)
        {
            throw new Exception("Livro não encontrado.");
        }
        var reservaExistente = await _context.Reservas
        .FirstOrDefaultAsync(r =>
        r.EstudanteId == estudanteId &&
        r.LivroId == livroId &&
        r.Status == "Ativa");
        if (reservaExistente != null)
        {
            throw new Exception("O estudante já possui uma reserva ativa para este livro.");
        }
        var quantidadeReservas = await _context.Reservas
        .CountAsync(r => r.LivroId == livroId && r.Status == "Ativa");
        if (quantidadeReservas >= 5)
        {
            throw new Exception("A fila de reservas deste livro está cheia.");
        }
        int posicaoFila = quantidadeReservas + 1;
        var reserva = new Reserva
        {
            DataReserva = DateOnly.FromDateTime(DateTime.Today),
            Status = "Ativa",
            PosicaoFila = posicaoFila,

            EstudanteId = estudanteId,
            Estudante = estudante,

            LivroId = livroId,
            Livro = livro
        };
        _context.Reservas.Add(reserva);

        await _context.SaveChangesAsync();

    }
    public async Task CancelarReservaAsync(int reservaId)
    {
        var reserva = await BuscarReservaPorIdAsync(reservaId);

        if (reserva == null)
        {
            throw new Exception("Reserva não encontrada.");
        }
        if (reserva.Status != "Ativa")
        {
            throw new Exception("Esta reserva não está ativa.");
        }
        var reservasPosteriores = await _context.Reservas
        .Where(r =>
            r.LivroId == reserva.LivroId &&
            r.Status == "Ativa" &&
            r.PosicaoFila > reserva.PosicaoFila)
        .ToListAsync();

        foreach (var reservaPosterior in reservasPosteriores)
        {
            reservaPosterior.PosicaoFila--;
        }

        reserva.Status = "Cancelada";
        await _context.SaveChangesAsync();

        
    }
    

}
