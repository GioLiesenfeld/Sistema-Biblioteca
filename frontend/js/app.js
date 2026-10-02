let livrosCarregados = [];

const selecaoPerfil =
    document.getElementById("selecao-perfil");

const sistema =
    document.getElementById("sistema");

const acessoEstudante =
    document.getElementById("acesso-estudante");

const acessoBibliotecario =
    document.getElementById("acesso-bibliotecario");

const menuEstudante =
    document.querySelectorAll(".menu-estudante");

const menuBibliotecario =
    document.querySelectorAll(".menu-bibliotecario");

const botaoTrocarPerfil =
    document.getElementById("botao-trocar-perfil");

botaoTrocarPerfil.addEventListener("click", () => {
    sistema.style.display = "none";
    selecaoPerfil.style.display = "block";
});

menuEstudante.forEach(item => {
    item.style.display = "block";
});

menuBibliotecario.forEach(item => {
    item.style.display = "block";
});

acessoEstudante.addEventListener("click", () => {
    selecaoPerfil.style.display = "none";
    sistema.style.display = "flex";

    menuEstudante.forEach(item => {
        item.style.display = "block";
    });

    menuBibliotecario.forEach(item => {
        item.style.display = "none";
    });

    document.getElementById("menu-acervo").style.display = "block";

    document.getElementById("titulo-pagina").textContent = "Acervo";

    document.getElementById("descricao-pagina").textContent =
        "Encontre os livros disponíveis na biblioteca.";

    exibirPesquisaLivros();
    buscarLivros();
});

acessoBibliotecario.addEventListener("click", () => {
    selecaoPerfil.style.display = "none";
    sistema.style.display = "flex";

    menuEstudante.forEach(item => {
        item.style.display = "none";
    });

    menuBibliotecario.forEach(item => {
        item.style.display = "block";
    });

    document.getElementById("menu-acervo").style.display = "block";

    document.getElementById("titulo-pagina").textContent = "Acervo";

    document.getElementById("descricao-pagina").textContent =
        "Encontre os livros disponíveis na biblioteca.";

    exibirPesquisaLivros();
    buscarLivros();
});
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
async function registrarDevolucao(emprestimoId) {
    const resposta = await fetch(
        `http://localhost:5124/api/emprestimos/${emprestimoId}/devolucao`,
        {
            method: "POST"
        }
    );

    if (resposta.ok) {
        alert("Devolução registrada com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível registrar a devolução.");
    }
}
async function renovarEmprestimo(emprestimoId) {
    const resposta = await fetch(
        `http://localhost:5124/api/emprestimos/${emprestimoId}/renovacao`,
        {
            method: "POST"
        }
    );

    if (resposta.ok) {
        alert("Empréstimo renovado com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível renovar o empréstimo.");
    }
}
async function cadastrarLivro(titulo, autor, isbn, categoria) {
    const livro = {
        titulo: titulo,
        autor: autor,
        isbn: isbn,
        categoria: categoria
    };

    const resposta = await fetch(
        "http://localhost:5124/api/livros",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(livro)
        }
    );

    if (resposta.ok) {
        alert("Livro cadastrado com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível cadastrar o livro.");
    }
}
async function cadastrarExemplar(codigoIdentificacao, livroId) {
    const exemplar = {
        codigoIdentificacao: codigoIdentificacao,
        livroId: Number(livroId)
    };

    const resposta = await fetch(
        "http://localhost:5124/api/exemplares",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exemplar)
        }
    );

    if (resposta.ok) {
        alert("Exemplar cadastrado com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível cadastrar o exemplar.");
    }
}
async function alterarStatusExemplar(exemplarId, status) {
    const dados = {
        status: status
    };

    const resposta = await fetch(
        `http://localhost:5124/api/exemplares/${exemplarId}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        }
    );

    if (resposta.ok) {
        alert("Status do exemplar alterado com sucesso.");
    } else {
        const erro = await resposta.json();

        alert(erro.detail || "Não foi possível alterar o status do exemplar.");
    }
}
const menuRenovarEmprestimo =
    document.getElementById("menu-renovar-emprestimo");

menuRenovarEmprestimo.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Renovar Empréstimo";

    document.getElementById("descricao-pagina").textContent =
        "Renove o prazo de um empréstimo ativo.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
        <div>
            <label for="renovacao-emprestimo">ID do empréstimo</label>
            <input
                type="number"
                id="renovacao-emprestimo"
                placeholder="Digite o ID do empréstimo"
            >
        </div>

        <button id="botao-renovar-emprestimo">
            Renovar empréstimo
        </button>
    `;
    const botaoRenovarEmprestimo =
        document.getElementById("botao-renovar-emprestimo");

    botaoRenovarEmprestimo.addEventListener("click", () => {
        const emprestimoId =
            document.getElementById("renovacao-emprestimo").value;

        renovarEmprestimo(emprestimoId);
    });
});
const menuCadastrarLivro =
    document.getElementById("menu-cadastrar-livro");

menuCadastrarLivro.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Cadastrar Livro";

    document.getElementById("descricao-pagina").textContent =
        "Cadastre um novo livro no acervo da biblioteca.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
        <div>
            <label for="livro-titulo">Título</label>
            <input
                type="text"
                id="livro-titulo"
                placeholder="Digite o título"
            >
        </div>

        <div>
            <label for="livro-autor">Autor</label>
            <input
                type="text"
                id="livro-autor"
                placeholder="Digite o autor"
            >
        </div>

        <div>
            <label for="livro-isbn">ISBN</label>
            <input
                type="text"
                id="livro-isbn"
                placeholder="Digite o ISBN"
            >
        </div>

        <div>
            <label for="livro-categoria">Categoria</label>
            <input
                type="text"
                id="livro-categoria"
                placeholder="Digite a categoria"
            >
        </div>

        <button id="botao-cadastrar-livro">
            Cadastrar livro
        </button>
    `;
    const botaoCadastrarLivro =
        document.getElementById("botao-cadastrar-livro");

    botaoCadastrarLivro.addEventListener("click", () => {
        const titulo =
            document.getElementById("livro-titulo").value;

        const autor =
            document.getElementById("livro-autor").value;

        const isbn =
            document.getElementById("livro-isbn").value;

        const categoria =
            document.getElementById("livro-categoria").value;

        cadastrarLivro(titulo, autor, isbn, categoria);
    });
});
const menuCadastrarExemplar =
    document.getElementById("menu-cadastrar-exemplar");

menuCadastrarExemplar.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Cadastrar Exemplar";

    document.getElementById("descricao-pagina").textContent =
        "Cadastre um novo exemplar de um livro.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
        <div>
            <label for="exemplar-codigo">Código de identificação</label>
            <input
                type="text"
                id="exemplar-codigo"
                placeholder="Digite o código do exemplar"
            >
        </div>

        <div>
            <label for="exemplar-livro">ID do livro</label>
            <input
                type="number"
                id="exemplar-livro"
                placeholder="Digite o ID do livro"
            >
        </div>

        <button id="botao-cadastrar-exemplar">
            Cadastrar exemplar
        </button>
    `;
    const botaoCadastrarExemplar =
        document.getElementById("botao-cadastrar-exemplar");

    botaoCadastrarExemplar.addEventListener("click", () => {
        const codigoIdentificacao =
            document.getElementById("exemplar-codigo").value;

        const livroId =
            document.getElementById("exemplar-livro").value;

        cadastrarExemplar(codigoIdentificacao, livroId);
    });
});
const menuAlterarStatusExemplar =
    document.getElementById("menu-alterar-status-exemplar");

menuAlterarStatusExemplar.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Alterar Status do Exemplar";

    document.getElementById("descricao-pagina").textContent =
        "Altere o status de um exemplar da biblioteca.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
        <div>
            <label for="status-exemplar-id">ID do exemplar</label>
            <input
                type="number"
                id="status-exemplar-id"
                placeholder="Digite o ID do exemplar"
            >
        </div>

        <div>
            <label for="status-exemplar">Novo status</label>
            <select id="status-exemplar">
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
            </select>
        </div>

        <button id="botao-alterar-status-exemplar">
            Alterar status
        </button>
    `;
    const botaoAlterarStatusExemplar =
        document.getElementById("botao-alterar-status-exemplar");

    botaoAlterarStatusExemplar.addEventListener("click", () => {
        const exemplarId =
            document.getElementById("status-exemplar-id").value;

        const status =
            document.getElementById("status-exemplar").value;

        alterarStatusExemplar(exemplarId, status);
    });
});
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

    document.getElementById("titulo-pagina").textContent =
        "Minhas Reservas";

    document.getElementById("descricao-pagina").textContent =
        "Acompanhe e gerencie suas reservas.";

    document.getElementById("area-pesquisa").innerHTML = "";

    buscarReservas();
});


const menuEmprestimos = document.getElementById("menu-emprestimos");

menuEmprestimos.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Meus Empréstimos";

    document.getElementById("descricao-pagina").textContent =
        "Consulte seus empréstimos e prazos de devolução.";

    document.getElementById("area-pesquisa").innerHTML = "";

    buscarEmprestimos();
});


const menuMultas = document.getElementById("menu-multas");

menuMultas.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Minhas Multas";

    document.getElementById("descricao-pagina").textContent =
        "Consulte as multas vinculadas à sua conta.";

    document.getElementById("area-pesquisa").innerHTML = "";

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
const menuRegistrarDevolucao =
    document.getElementById("menu-registrar-devolucao");

menuRegistrarDevolucao.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("titulo-pagina").textContent =
        "Registrar Devolução";

    document.getElementById("descricao-pagina").textContent =
        "Registre a devolução de um empréstimo.";

    document.getElementById("lista-livros").innerHTML = "";

    document.getElementById("area-pesquisa").innerHTML = `
        <div>
            <label for="devolucao-emprestimo">ID do empréstimo</label>
            <input
                type="number"
                id="devolucao-emprestimo"
                placeholder="Digite o ID do empréstimo"
            >
        </div>

        <button id="botao-registrar-devolucao">
            Registrar devolução
        </button>
    `;

    const botaoRegistrarDevolucao =
        document.getElementById("botao-registrar-devolucao");

    botaoRegistrarDevolucao.addEventListener("click", () => {
        const emprestimoId =
            document.getElementById("devolucao-emprestimo").value;

        registrarDevolucao(emprestimoId);
    });
});


buscarLivros();