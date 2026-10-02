# Frontend — Sistema de Gerenciamento de Biblioteca Escolar

## 1. Objetivo

O frontend é responsável pela interface utilizada pelos estudantes e bibliotecários e pela comunicação com a API do Sistema de Gerenciamento de Biblioteca Escolar.

A interface foi desenvolvida com o objetivo de permitir o acesso às principais funcionalidades da primeira versão do sistema de forma simples e organizada.

---

## 2. Tecnologias Utilizadas

O frontend foi desenvolvido utilizando:

- HTML
- CSS
- JavaScript
- Fetch API

O HTML é responsável pela estrutura da interface.

O CSS é utilizado para estilização, organização do layout e adaptação para diferentes tamanhos de tela.

O JavaScript controla as interações da interface e realiza a comunicação com o backend por meio de requisições HTTP.

---

## 3. Estrutura do Frontend

O frontend está organizado da seguinte forma:

```text
frontend/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── index.html
```

### index.html

Contém a estrutura principal da interface, incluindo:

- seleção de perfil;
- menu de navegação;
- área de conteúdo;
- área de pesquisa;
- área de exibição dos livros.

### style.css

Contém os estilos utilizados na aplicação, incluindo:

- tela de seleção de perfil;
- menu lateral;
- formulários;
- campos de entrada;
- botões;
- cards dos livros;
- organização do conteúdo;
- adaptação para telas menores.

### app.js

Contém a lógica de interação da interface e a comunicação com a API.

Entre suas responsabilidades estão:

- consultar o acervo;
- pesquisar livros;
- realizar reservas;
- consultar reservas;
- cancelar reservas;
- consultar empréstimos;
- consultar multas;
- localizar estudantes;
- registrar empréstimos;
- registrar devoluções;
- renovar empréstimos;
- cadastrar livros;
- cadastrar exemplares;
- alterar o status de exemplares;
- controlar as funcionalidades apresentadas de acordo com o perfil selecionado.

---

## 4. Perfis da Interface

A primeira versão possui duas áreas de utilização: estudante e bibliotecário.

O perfil é selecionado manualmente na tela inicial para permitir a demonstração das funcionalidades disponíveis para cada tipo de usuário.

### 4.1 Estudante

O estudante possui acesso às seguintes funcionalidades:

- Acervo
- Minhas Reservas
- Meus Empréstimos
- Minhas Multas

No acervo, o estudante pode pesquisar livros e realizar reservas.

A pesquisa permite filtrar os livros utilizando informações como título, autor ou categoria.

### 4.2 Bibliotecário

O bibliotecário possui acesso às seguintes funcionalidades:

- Acervo
- Localizar Estudante
- Registrar Empréstimo
- Registrar Devolução
- Renovar Empréstimo
- Cadastrar Livro
- Cadastrar Exemplar
- Alterar Status do Exemplar

O bibliotecário também pode consultar o acervo, porém ações específicas do estudante, como o botão de reserva, não são apresentadas nesse perfil.

---

## 5. Comunicação com a API

O frontend utiliza a Fetch API do JavaScript para realizar requisições HTTP ao backend.

Exemplo de consulta ao acervo:

```javascript
const resposta = await fetch(
    "http://localhost:5124/api/livros"
);

const livros = await resposta.json();
```

Nesse fluxo, o JavaScript envia uma requisição para a API e utiliza os dados retornados para atualizar a interface.

A comunicação pode ser representada da seguinte forma:

```text
Usuário
   ↓
Interface HTML
   ↓
JavaScript
   ↓
Requisição HTTP
   ↓
ASP.NET Core Web API
   ↓
Services
   ↓
Entity Framework Core
   ↓
SQL Server
```

---

## 6. Acervo

A tela de acervo consulta os livros cadastrados por meio da API.

Para cada livro são apresentadas informações como:

- título;
- autor;
- categoria;
- quantidade de exemplares disponíveis.

O estudante também possui a opção de realizar uma reserva diretamente pelo card do livro.

O campo de pesquisa permite filtrar os livros carregados utilizando JavaScript.

---

## 7. Integração das Funcionalidades

As funcionalidades do frontend foram integradas aos endpoints existentes no backend.

Entre os principais fluxos estão:

### Empréstimo

```text
Bibliotecário
      ↓
Informa estudante e exemplar
      ↓
Frontend envia requisição
      ↓
API registra o empréstimo
      ↓
Exemplar passa para "Emprestado"
```

### Devolução

```text
Bibliotecário
      ↓
Informa o empréstimo
      ↓
Frontend envia requisição
      ↓
API registra a devolução
      ↓
Exemplar volta para "Disponível"
```

### Reserva

```text
Estudante
      ↓
Consulta o acervo
      ↓
Seleciona "Reservar"
      ↓
Frontend envia requisição
      ↓
API aplica as regras de reserva
      ↓
Reserva é registrada
```

---

## 8. Tratamento das Respostas

O frontend verifica as respostas retornadas pela API para informar ao usuário se uma operação foi realizada com sucesso ou se ocorreu algum erro.

Exemplo:

```javascript
if (resposta.ok) {
    alert("Operação realizada com sucesso.");
} else {
    const erro = await resposta.json();
    alert(erro.detail || "Não foi possível realizar a operação.");
}
```

Dessa forma, erros de validação e regras de negócio processados pelo backend podem ser apresentados ao usuário na interface.

---

## 9. Responsividade

A interface possui regras de CSS para adaptação em telas menores.

Em dispositivos com largura reduzida:

- o layout principal passa a ser organizado verticalmente;
- o menu lateral ocupa a largura disponível;
- os cards do acervo são apresentados em uma única coluna;
- o espaçamento da área principal é reduzido.

---

## 10. Testes de Integração

Os principais fluxos do frontend foram testados em conjunto com a API e o banco de dados.

Foram verificados:

- consulta e pesquisa do acervo;
- cadastro de livro;
- cadastro de exemplar;
- atualização da disponibilidade do acervo;
- localização de estudante;
- registro de empréstimo;
- alteração automática do exemplar para `Emprestado`;
- renovação de empréstimo;
- registro de devolução;
- retorno automático do exemplar para `Disponível`;
- realização de reserva;
- consulta de reservas;
- cancelamento de reserva;
- bloqueio de reserva duplicada;
- alteração manual do status de exemplar;
- consulta de empréstimos;
- consulta de multas;
- separação das funcionalidades apresentadas para estudante e bibliotecário.

---

## 11. Limitações da Versão Atual

A primeira versão utiliza uma seleção manual de perfil para permitir o acesso às funcionalidades de estudante e bibliotecário.

A autenticação ainda não está implementada.

Por esse motivo, a identificação do estudante utilizada em algumas operações da área do estudante ainda é definida diretamente pela aplicação.

Essa abordagem é utilizada apenas na primeira versão funcional e deverá ser substituída pela identificação do usuário autenticado quando o módulo de autenticação for implementado.

---

## 12. Evoluções Futuras

As principais evoluções planejadas para o frontend são:

- tela de login;
- primeiro acesso do estudante;
- recuperação de senha;
- identificação automática do usuário autenticado;
- controle de acesso baseado no perfil autenticado;
- melhorias de acessibilidade;
- melhorias adicionais na experiência do usuário.

---

## 13. Resultado da Etapa

Ao final desta etapa, o frontend encontra-se integrado ao backend e ao banco de dados por meio da API.

As principais funcionalidades da primeira versão podem ser executadas pela interface, permitindo demonstrar o funcionamento completo da aplicação desde a interação do usuário até a persistência dos dados.

O fluxo geral da aplicação é:

```text
HTML / CSS / JavaScript
        ↓
ASP.NET Core Web API
        ↓
Controllers
        ↓
Services
        ↓
Entity Framework Core
        ↓
SQL Server
```

A autenticação permanece como uma evolução futura do projeto.