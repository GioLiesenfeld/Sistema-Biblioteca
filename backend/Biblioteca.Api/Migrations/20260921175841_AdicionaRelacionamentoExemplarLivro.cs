using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Biblioteca.Api.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaRelacionamentoExemplarLivro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exemplares_Livros_LivroId",
                table: "Exemplares");

            migrationBuilder.AlterColumn<int>(
                name: "LivroId",
                table: "Exemplares",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Exemplares_Livros_LivroId",
                table: "Exemplares",
                column: "LivroId",
                principalTable: "Livros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exemplares_Livros_LivroId",
                table: "Exemplares");

            migrationBuilder.AlterColumn<int>(
                name: "LivroId",
                table: "Exemplares",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Exemplares_Livros_LivroId",
                table: "Exemplares",
                column: "LivroId",
                principalTable: "Livros",
                principalColumn: "Id");
        }
    }
}
