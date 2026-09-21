using Biblioteca.Api.Data;
using Biblioteca.Api.DTOs;
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
}