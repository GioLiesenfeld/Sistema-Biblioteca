let livrosCarregados = [];

async function buscarLivros() {
    const resposta = await fetch("http://localhost:5124/api/livros");

    const livros = await resposta.json();

    livrosCarregados = livros;

    exibirLivros(livrosCarregados);
}

function exibirLivros(livros) {
    const listaLivros = document.getElementById("lista-livros");

    listaLivros.innerHTML = "";

    livros.forEach(livro => {
        const card = document.createElement("article");

        card.classList.add("livro-card");

        card.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
            <p>${livro.categoria}</p>
            <p>${livro.exemplaresDisponiveis} exemplar(es) disponível(is)</p>
            <button onclick="reservarLivro(${livro.id})">Reservar</button>
        `;

        listaLivros.appendChild(card);
    });
}

async function reservarLivro(livroId) {
    const estudanteId = 1;

    const resposta = await fetch(
        `http://localhost:5124/api/reservas?estudanteId=${estudanteId}&livroId=${livroId}`,
        {
            method: "POST"
        }
    );

    if (resposta.ok) {
        alert("Reserva realizada com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível realizar a reserva.");
    }
}

async function buscarReservas() {
    const estudanteId = 1;

    const resposta = await fetch(
        `http://localhost:5124/api/reservas/estudante/${estudanteId}`
    );

    const reservas = await resposta.json();

    console.log(reservas);
}

const menuReservas = document.getElementById("menu-reservas");

menuReservas.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Minhas Reservas foi clicado");

    buscarReservas();
});

const campoPesquisa = document.getElementById("pesquisa-livro");

campoPesquisa.addEventListener("input", () => {
    const termo = campoPesquisa.value.toLowerCase();

    const livrosFiltrados = livrosCarregados.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.categoria.toLowerCase().includes(termo)
    );

    exibirLivros(livrosFiltrados);
});

buscarLivros();