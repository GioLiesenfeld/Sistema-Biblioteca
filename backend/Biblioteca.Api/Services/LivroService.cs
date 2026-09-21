using Biblioteca.Api.Data;
using Biblioteca.Api.DTOs;
using Biblioteca.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Api.Services;

public class LivroService
{
    private readonly BibliotecaContext _context;

    public LivroService(BibliotecaContext context)
    {
        _context = context;
    }

    public async Task<List<LivroDto>> BuscarLivrosAsync()
    {
        return await _context.Livros
            .Select(l => new LivroDto
            {
                Id = l.Id,
                Titulo = l.Titulo,
                Autor = l.Autor,
                Isbn = l.Isbn,
                Categoria = l.Categoria,
                ExemplaresDisponiveis = l.Exemplares
                    .Count(e => e.status == "Disponível")
            })
            .ToListAsync();
    }
    public async Task CadastrarLivroAsync(CriarLivroDto dto)
    {
        var livro = new Livro
        {
            Titulo = dto.Titulo,
            Autor = dto.Autor,
            Isbn = dto.Isbn,
            Categoria = dto.Categoria
        };

        _context.Livros.Add(livro);

        await _context.SaveChangesAsync();
    }
}