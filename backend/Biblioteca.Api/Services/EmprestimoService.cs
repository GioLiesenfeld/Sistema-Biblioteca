using Biblioteca.Api.Data;
using Biblioteca.Api.Models;
using Biblioteca.Api.DTOs;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Exceptions;

namespace Biblioteca.Api.Services;

public class EmprestimoService
{
    private readonly BibliotecaContext _context;

    public EmprestimoService(BibliotecaContext context)
    {
        _context = context;
    }
    public async Task<Estudante?> BuscarEstudantePorIdAsync(int estudanteId)
    {
        return await _context.Estudantes
            .FirstOrDefaultAsync(e => e.Id == estudanteId);
    }

    public async Task<Exemplar?> BuscarExemplarPorIdAsync(int exemplarId)
    {
        return await _context.Exemplares
            .FirstOrDefaultAsync(e => e.Id == exemplarId);
    }
    public bool ExemplarEstaDisponivel(Exemplar exemplar)
    {
        if (exemplar.status != "Disponível")
        {
            return false;
        }

        return true;
    }

    public async Task<Bibliotecario?> BuscarBibliotecarioPorIdAsync(int bibliotecarioId)
    {
        return await _context.Bibliotecarios
            .FirstOrDefaultAsync(b => b.Id == bibliotecarioId);
    }
    public async Task RegistrarEmprestimoAsync(
       int estudanteId,
       int exemplarId,
       int bibliotecarioId)
    {
        var estudante = await BuscarEstudantePorIdAsync(estudanteId);

        if (estudante == null)
            throw new NotFoundException("Estudante não encontrado.");

        var exemplar = await BuscarExemplarPorIdAsync(exemplarId);

        if (exemplar == null)
            throw new NotFoundException("Exemplar não encontrado.");

        if (!ExemplarEstaDisponivel(exemplar))
            throw new BusinessException(
                "Exemplar não está disponível para empréstimo.");

        var bibliotecario = await BuscarBibliotecarioPorIdAsync(bibliotecarioId);

        if (bibliotecario == null)
            throw new NotFoundException("Bibliotecário não encontrado.");

        var emprestimo = new Emprestimo
        {
            EstudanteId = estudanteId,
            Estudante = estudante,

            ExemplarId = exemplarId,
            Exemplar = exemplar,

            BibliotecarioId = bibliotecarioId,
            Bibliotecario = bibliotecario,

            DataEmprestimo = DateOnly.FromDateTime(DateTime.Today),
            DataPrevistaDevolucao = DateOnly.FromDateTime(DateTime.Today.AddDays(7)),
            Status = "Ativo"
        };
        exemplar.status = "Emprestado";

        _context.Emprestimos.Add(emprestimo);

        await _context.SaveChangesAsync();
    }

    public async Task<List<EmprestimoDto>> BuscarEmprestimosPorEstudanteAsync(int estudanteId)
    {
        return await _context.Emprestimos
            .Where(e => e.EstudanteId == estudanteId)
            .Select(e => new EmprestimoDto
            {
                Id = e.Id,
                TituloLivro = e.Exemplar.Livro.Titulo,
                CodigoExemplar = e.Exemplar.codigoIdentificacao,
                DataEmprestimo = e.DataEmprestimo,
                DataPrevistaDevolucao = e.DataPrevistaDevolucao,
                DataDevolucao = e.DataDevolucao,
                Status = e.Status
            })
            .ToListAsync();
    }
    public async Task<Emprestimo?> BuscarEmprestimoPorIdAsync(int emprestimoId)
    {
        return await _context.Emprestimos
            .Include(e => e.Exemplar)
            .Include(e => e.Estudante)
            .FirstOrDefaultAsync(e => e.Id == emprestimoId);
    }
    public async Task RegistrarDevolucaoAsync(int emprestimoId)
    {
        var emprestimo = await BuscarEmprestimoPorIdAsync(emprestimoId);

        if (emprestimo == null)
            throw new NotFoundException("Empréstimo não encontrado.");

        if (emprestimo.Status != "Ativo")
            throw new BusinessException(
                "Este empréstimo não está ativo.");
        var dataDevolucao = DateOnly.FromDateTime(DateTime.Today);

        emprestimo.DataDevolucao = dataDevolucao;

        if (dataDevolucao > emprestimo.DataPrevistaDevolucao)
        {
            int diasAtraso = dataDevolucao.DayNumber
                - emprestimo.DataPrevistaDevolucao.DayNumber;

            decimal valorMulta = diasAtraso * 1.00m;

            var multa = new Multa
            {
                Valor = valorMulta,
                DiasAtraso = diasAtraso,

                EstudanteId = emprestimo.EstudanteId,
                Estudante = emprestimo.Estudante,

                EmprestimoId = emprestimo.Id,
                Emprestimo = emprestimo
            };

            _context.Multas.Add(multa);
        }
        emprestimo.Status = "Devolvido";

        emprestimo.Exemplar.status = "Disponível";

        await _context.SaveChangesAsync();
    }
    public async Task RenovarEmprestimoAsync(int emprestimoId)
    {
        var emprestimo = await BuscarEmprestimoPorIdAsync(emprestimoId);

        if (emprestimo == null)
        {
            throw new NotFoundException("Empréstimo não encontrado.");
        }

        if (emprestimo.Status != "Ativo")
        {
            throw new BusinessException(
                "Somente empréstimos ativos podem ser renovados.");
        }

        emprestimo.DataPrevistaDevolucao =
            emprestimo.DataPrevistaDevolucao.AddDays(7);

        await _context.SaveChangesAsync();
    }

}