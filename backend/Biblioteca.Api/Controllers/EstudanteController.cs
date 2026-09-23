using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Biblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EstudantesController : ControllerBase
{
    private readonly EstudanteService _estudanteService;

    public EstudantesController(EstudanteService estudanteService)
    {
        _estudanteService = estudanteService;
    }
    [HttpGet("busca")]
    public async Task<IActionResult> BuscarEstudantes(
        [Required(ErrorMessage = "O termo de busca é obrigatório.")] string termo)
    {
        var estudantes = await _estudanteService
            .BuscarEstudantesAsync(termo);

        return Ok(estudantes);
    }


}