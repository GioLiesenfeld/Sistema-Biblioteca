using Biblioteca.Api.Data;
using Biblioteca.Api.DTOs;
using Biblioteca.Api.Models;
using Biblioteca.Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Api.Services;

public class ExemplarService
{
    private readonly BibliotecaContext _context;

    public ExemplarService(BibliotecaContext context)
    {
        _context = context;
    }

    public async Task CadastrarExemplarAsync(CriarExemplarDto dto)
    {
        var livro = await _context.Livros
            .FirstOrDefaultAsync(l => l.Id == dto.LivroId);

        if (livro == null)
        {
            throw new NotFoundException("Livro não encontrado.");
        }

        var exemplar = new Exemplar
        {
            codigoIdentificacao = dto.CodigoIdentificacao,
            status = "Disponível",
            LivroId = dto.LivroId,
            Livro = livro
        };

        _context.Exemplares.Add(exemplar);

        await _context.SaveChangesAsync();
    }

    public async Task AlterarStatusAsync(
        int exemplarId,
        AlterarStatusExemplarDto dto)
    {
        var exemplar = await _context.Exemplares
            .FirstOrDefaultAsync(e => e.Id == exemplarId);

        if (exemplar == null)
        {
            throw new NotFoundException("Exemplar não encontrado.");
        }

        if (dto.Status != "Disponível" &&
            dto.Status != "Indisponível")
        {
            throw new BusinessException("Status inválido.");
        }

        exemplar.status = dto.Status;

        await _context.SaveChangesAsync();
    }
}