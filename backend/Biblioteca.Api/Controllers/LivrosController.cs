using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LivrosController : ControllerBase
{
    private readonly LivroService _livroService;

    public LivrosController(LivroService livroService)
    {
        _livroService = livroService;
    }

    [HttpGet]
    public async Task<IActionResult> BuscarLivros()
    {
        var livros = await _livroService.BuscarLivrosAsync();

        return Ok(livros);
    }
}