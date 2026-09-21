using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservasController : ControllerBase
{
    private readonly ReservaService _reservaService;

    public ReservasController(ReservaService reservaService)
    {
        _reservaService = reservaService;
    }
    [HttpPost]
    public async Task<IActionResult> RegistrarReserva(
    int estudanteId,
    int livroId)
    {
        await _reservaService.RegistrarReservaAsync(
            estudanteId,
            livroId);

        return Ok("Reserva registrada com sucesso.");
    }

    [HttpPost("{reservaId}/cancelamento")]
    public async Task<IActionResult> CancelarReserva(int reservaId)
    {
        await _reservaService.CancelarReservaAsync(reservaId);

        return Ok("Reserva cancelada com sucesso.");
    }
}