using Biblioteca.Api.Data;
using Biblioteca.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Api.Services;

public class EstudanteService
{
    private readonly BibliotecaContext _context;

    public EstudanteService(BibliotecaContext context)
    {
        _context = context;
    }

    public async Task<List<EstudanteDto>> BuscarEstudantesAsync(string termo)
    {
        return await _context.Estudantes
            .Where(e =>
                e.Nome.Contains(termo) ||
                e.EmailInstitucional.Contains(termo))
            .Select(e => new EstudanteDto
            {
                Id = e.Id,
                Nome = e.Nome,
                EmailInstitucional = e.EmailInstitucional,
                StatusConta = e.StatusConta
            })
            .ToListAsync();
    }
}