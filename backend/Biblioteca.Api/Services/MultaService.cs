using Biblioteca.Api.Data;
using Biblioteca.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Api.Services;

public class MultaService
{
    private readonly BibliotecaContext _context;

    public MultaService(BibliotecaContext context)
    {
        _context = context;
    }

    public async Task<List<MultaDto>> BuscarMultasPorEstudanteAsync(int estudanteId)
    {
        return await _context.Multas
            .Where(m => m.EstudanteId == estudanteId)
            .Select(m => new MultaDto
            {
                Id = m.Id,
                Valor = m.Valor,
                DiasAtraso = m.DiasAtraso,
                EmprestimoId = m.EmprestimoId
            })
            .ToListAsync();
    }
}