using Biblioteca.Api.Data;
using Biblioteca.Api.Services;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Exceptions;
using Microsoft.AspNetCore.Diagnostics;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<EmprestimoService>();
builder.Services.AddScoped<ReservaService>();
builder.Services.AddScoped<MultaService>();
builder.Services.AddScoped<LivroService>();
builder.Services.AddScoped<ExemplarService>();
builder.Services.AddScoped<EstudanteService>();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exception = context.Features
            .Get<IExceptionHandlerFeature>()?
            .Error;

        context.Response.StatusCode = exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            BusinessException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };

        await Results.Problem(
            statusCode: context.Response.StatusCode,
            detail: exception?.Message
        ).ExecuteAsync(context);
    });
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

