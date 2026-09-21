using Biblioteca.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Biblioteca.Api.DTOs;

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
    [HttpPost]
    public async Task<IActionResult> CadastrarLivro(CriarLivroDto dto)
    {
        await _livroService.CadastrarLivroAsync(dto);

        return Ok("Livro cadastrado com sucesso.");
    }
}