using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Models;

namespace Biblioteca.Api.Data;

public class BibliotecaContext : DbContext
{
    public BibliotecaContext(DbContextOptions<BibliotecaContext> options)
        : base(options)
    {
    }

    public DbSet<Livro> Livros { get; set; }
    public DbSet<Exemplar> Exemplares { get; set; }
    public DbSet<Turma> Turmas { get; set; }
    public DbSet<Estudante> Estudantes { get; set; }
    public DbSet<Bibliotecario> Bibliotecarios { get; set; }
    public DbSet<Emprestimo> Emprestimos { get; set; }
    public DbSet<Reserva> Reservas { get; set; }
    public DbSet<Multa> Multas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Emprestimo>()
            .HasOne(e => e.Multa)
            .WithOne(m => m.Emprestimo)
            .HasForeignKey<Multa>(m => m.EmprestimoId);

        base.OnModelCreating(modelBuilder);
    }
}