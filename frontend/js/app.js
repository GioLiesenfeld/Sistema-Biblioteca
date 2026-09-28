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

    exibirReservas(reservas);
}
function exibirReservas(reservas) {
    const listaLivros = document.getElementById("lista-livros");

    listaLivros.innerHTML = "";

    reservas.forEach(reserva => {
        const card = document.createElement("article");

        card.classList.add("livro-card");

        card.innerHTML = `
            <h3>Reserva #${reserva.id}</h3>
            <p>Livro: ${reserva.tituloLivro}</p>
            <p>Posição na fila: ${reserva.posicaoFila}</p>
            <p>Status: ${reserva.status}</p>

            ${reserva.status === "Ativa"
                ? `<button onclick="cancelarReserva(${reserva.id})">Cancelar reserva</button>`
                : ""
            }
        `;

        listaLivros.appendChild(card);
    });
}
async function cancelarReserva(reservaId) {
    const resposta = await fetch(
        `http://localhost:5124/api/reservas/${reservaId}/cancelamento`,
        {
            method: "POST"
        }
    );

    if (resposta.ok) {
        alert("Reserva cancelada com sucesso.");

        buscarReservas();
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível cancelar a reserva.");
    }
}
async function buscarEmprestimos() {
    const estudanteId = 1;

    const resposta = await fetch(
        `http://localhost:5124/api/emprestimos/estudante/${estudanteId}`
    );

    const emprestimos = await resposta.json();

    console.log(emprestimos);

    exibirEmprestimos(emprestimos);
}
function exibirEmprestimos(emprestimos) {
    const listaLivros = document.getElementById("lista-livros");

    listaLivros.innerHTML = "";

    emprestimos.forEach(emprestimo => {
        const card = document.createElement("article");

        card.classList.add("livro-card");

        card.innerHTML = `
            <h3>${emprestimo.tituloLivro}</h3>
            <p>Exemplar: ${emprestimo.codigoExemplar}</p>
            <p>Data do empréstimo: ${emprestimo.dataEmprestimo}</p>
            <p>Previsão de devolução: ${emprestimo.dataPrevistaDevolucao}</p>
            <p>Status: ${emprestimo.status}</p>

            ${emprestimo.dataDevolucao
                ? `<p>Data de devolução: ${emprestimo.dataDevolucao}</p>`
                : ""
            }
        `;

        listaLivros.appendChild(card);
    });
}
async function buscarMultas() {
    const estudanteId = 1;

    const resposta = await fetch(
        `http://localhost:5124/api/multas/estudante/${estudanteId}`
    );

    const multas = await resposta.json();

    console.log(multas);

    exibirMultas(multas);
}
async function buscarEstudantes(termo) {
    const resposta = await fetch(
        `http://localhost:5124/api/estudantes/busca?termo=${encodeURIComponent(termo)}`
    );

    const estudantes = await resposta.json();

    console.log(estudantes);

    exibirEstudantes(estudantes);
}
function exibirEstudantes(estudantes) {
    const listaLivros = document.getElementById("lista-livros");

    listaLivros.innerHTML = "";

    estudantes.forEach(estudante => {
        const card = document.createElement("article");

        card.classList.add("livro-card");

        card.innerHTML = `
            <h3>${estudante.nome}</h3>
            <p>E-mail: ${estudante.emailInstitucional}</p>
            <p>Status: ${estudante.statusConta}</p>
            <p>ID: ${estudante.id}</p>
        `;

        listaLivros.appendChild(card);
    });
}
async function registrarEmprestimo(estudanteId, exemplarId) {
    const bibliotecarioId = 1;

    const resposta = await fetch(
        `http://localhost:5124/api/emprestimos?estudanteId=${estudanteId}&exemplarId=${exemplarId}&bibliotecarioId=${bibliotecarioId}`,
        {
            method: "POST"
        }
    );

    if (resposta.ok) {
        alert("Empréstimo registrado com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível registrar o empréstimo.");
    }
}
function exibirPesquisaLivros() {
    const areaPesquisa = document.getElementById("area-pesquisa");

    areaPesquisa.innerHTML = `
        <input
            type="text"
            id="pesquisa-livro"
            placeholder="Pesquisar livro..."
        >
    `;

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
}
function exibirMultas(multas) {
    const listaLivros = document.getElementById("lista-livros");

    listaLivros.innerHTML = "";

    multas.forEach(multa => {
        const card = document.createElement("article");

        card.classList.add("livro-card");

        card.innerHTML = `
            <h3>Multa #${multa.id}</h3>
            <p>Empréstimo: #${multa.emprestimoId}</p>
            <p>Dias de atraso: ${multa.diasAtraso}</p>
            <p>Valor: ${multa.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</p>
        `;

        listaLivros.appendChild(card);
    });
}
const menuAcervo = document.getElementById("menu-acervo");

menuAcervo.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Acervo";

    document.getElementById("descricao-pagina").textContent =
        "Encontre os livros disponíveis na biblioteca.";

    exibirPesquisaLivros();

    buscarLivros();
});
const menuReservas = document.getElementById("menu-reservas");

menuReservas.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Minhas Reservas foi clicado");

    buscarReservas();
});
const menuEmprestimos = document.getElementById("menu-emprestimos");

menuEmprestimos.addEventListener("click", (event) => {
    event.preventDefault();

    buscarEmprestimos();
});
const menuMultas = document.getElementById("menu-multas");

menuMultas.addEventListener("click", (event) => {
    event.preventDefault();

    buscarMultas();
});
const menuEstudantes = document.getElementById("menu-estudantes");


menuEstudantes.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Localizar Estudante";

    document.getElementById("descricao-pagina").textContent =
        "Pesquise um estudante pelo nome ou e-mail institucional.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
        <input
            type="text"
            id="pesquisa-estudante"
            placeholder="Digite o nome ou e-mail institucional..."
        >

        <button id="botao-buscar-estudante">Buscar</button>
    `;

    const botaoBuscarEstudante =
        document.getElementById("botao-buscar-estudante");

    botaoBuscarEstudante.addEventListener("click", () => {
        const termo =
            document.getElementById("pesquisa-estudante").value;

        buscarEstudantes(termo);
    });
});
const menuRegistrarEmprestimo =
    document.getElementById("menu-registrar-emprestimo");

menuRegistrarEmprestimo.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Registrar Empréstimo";

    document.getElementById("descricao-pagina").textContent =
        "Registre o empréstimo de um exemplar para um estudante.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
    <div>
        <label for="emprestimo-estudante">ID do estudante</label>
        <input
            type="number"
            id="emprestimo-estudante"
            placeholder="Digite o ID do estudante"
        >
    </div>

    <div>
        <label for="emprestimo-exemplar">ID do exemplar</label>
        <input
            type="number"
            id="emprestimo-exemplar"
            placeholder="Digite o ID do exemplar"
        >
    </div>

    <button id="botao-registrar-emprestimo">
        Registrar empréstimo
    </button>
`;
 const botaoRegistrarEmprestimo =
        document.getElementById("botao-registrar-emprestimo");

    botaoRegistrarEmprestimo.addEventListener("click", () => {
        const estudanteId =
            document.getElementById("emprestimo-estudante").value;

        const exemplarId =
            document.getElementById("emprestimo-exemplar").value;

        registrarEmprestimo(estudanteId, exemplarId);
    });
});
const campoPesquisa = document.getElementById("pesquisa-livro");



buscarLivros();