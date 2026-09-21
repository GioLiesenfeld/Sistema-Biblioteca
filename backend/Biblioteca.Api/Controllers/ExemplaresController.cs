using Biblioteca.Api.DTOs;
using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExemplaresController : ControllerBase
{
    private readonly ExemplarService _exemplarService;

    public ExemplaresController(ExemplarService exemplarService)
    {
        _exemplarService = exemplarService;
    }

    [HttpPost]
    public async Task<IActionResult> CadastrarExemplar(CriarExemplarDto dto)
    {
        await _exemplarService.CadastrarExemplarAsync(dto);

        return Ok("Exemplar cadastrado com sucesso.");
    }
}