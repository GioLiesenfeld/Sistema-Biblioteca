using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmprestimosController : ControllerBase
{
    private readonly EmprestimoService _emprestimoService;

    public EmprestimosController(EmprestimoService emprestimoService)
    {
        _emprestimoService = emprestimoService;
    }
    [HttpPost]
    public async Task<IActionResult> RegistrarEmprestimo(
    int estudanteId,
    int exemplarId,
    int bibliotecarioId)
    {
        await _emprestimoService.RegistrarEmprestimoAsync(
            estudanteId,
            exemplarId,
            bibliotecarioId);

        return Ok("Empréstimo registrado com sucesso.");
    }
    [HttpPost("{emprestimoId}/devolucao")]
    public async Task<IActionResult> RegistrarDevolucao(int emprestimoId)
    {
        await _emprestimoService.RegistrarDevolucaoAsync(emprestimoId);

        return Ok("Devolução registrada com sucesso.");
    }
}