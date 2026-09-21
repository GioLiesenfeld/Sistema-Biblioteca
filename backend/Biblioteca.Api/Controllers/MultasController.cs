using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MultasController : ControllerBase
{
    private readonly MultaService _multaService;

    public MultasController(MultaService multaService)
    {
        _multaService = multaService;
    }

    [HttpGet("estudante/{estudanteId}")]
    public async Task<IActionResult> BuscarPorEstudante(int estudanteId)
    {
        var multas = await _multaService
            .BuscarMultasPorEstudanteAsync(estudanteId);

        return Ok(multas);
    }
}