using Biblioteca.Api.Data;
using Biblioteca.Api.DTOs;
using Biblioteca.Api.Models;
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
            throw new Exception("Livro não encontrado.");
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
}