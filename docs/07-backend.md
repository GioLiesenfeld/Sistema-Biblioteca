# Backend — Sistema de Gerenciamento de Biblioteca Escolar

## 1. Objetivo

O backend é responsável por receber as requisições realizadas pela interface do sistema, executar as regras de negócio e realizar a comunicação com o banco de dados.

A aplicação foi desenvolvida utilizando:

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

---

## 2. Estrutura do Backend

O backend foi organizado principalmente nas seguintes pastas:

### Controllers

Recebem as requisições HTTP realizadas pelos clientes da API e encaminham as operações para os Services.

Exemplos:

- LivrosController
- ExemplaresController
- EmprestimosController
- ReservasController
- MultasController
- EstudantesController

### Services

Concentram a lógica da aplicação e as principais regras de negócio.

Exemplos:

- LivroService
- ExemplarService
- EmprestimoService
- ReservaService
- MultaService
- EstudanteService

### Models

Representam as principais entidades do sistema.

Foram criados os seguintes Models:

- Bibliotecario
- Emprestimo
- Estudante
- Exemplar
- Livro
- Multa
- Reserva
- Turma

### DTOs

Os DTOs (Data Transfer Objects) são utilizados para controlar os dados recebidos ou devolvidos pela API.

Eles permitem, por exemplo, retornar somente as informações necessárias para uma consulta, evitando expor diretamente toda a entidade do banco de dados.

Também foram utilizados para receber dados de cadastro e aplicar validações.

### Data

Contém o `BibliotecaContext`, responsável pela comunicação entre a aplicação e o Entity Framework Core.

### Exceptions

Contém exceções personalizadas utilizadas para diferenciar erros de negócio e recursos não encontrados.

Foram criadas:

- BusinessException
- NotFoundException

---

## 3. Fluxo da Aplicação

De forma simplificada, uma operação percorre o seguinte caminho:

Cliente / Front-end
        ↓
Controller
        ↓
Service
        ↓
BibliotecaContext
        ↓
Entity Framework Core
        ↓
SQL Server

Na resposta de uma consulta, o caminho pode ser entendido como:

SQL Server
        ↓
Entity Framework Core
        ↓
Service
        ↓
DTO
        ↓
Controller
        ↓
JSON

---

## 4. Entity Framework Core e Banco de Dados

O Entity Framework Core foi utilizado como ORM da aplicação.

Sua função é permitir que a aplicação C# trabalhe com os dados do SQL Server através de objetos e classes.

O `BibliotecaContext` representa o contexto do banco de dados e contém os `DbSet` das entidades.

Exemplo conceitual:

Model
    ↓
DbSet
    ↓
BibliotecaContext
    ↓
Entity Framework Core
    ↓
SQL Server

As alterações da estrutura do banco foram controladas através de migrations.

Foram realizadas migrations para:

- criação inicial do banco;
- criação das tabelas e relacionamentos;
- inclusão do relacionamento entre Exemplar e Livro.

O banco utilizado pela aplicação é:

`BibliotecaDb`

---

## 5. Funcionalidades implementadas

### Livros

- Consultar acervo
- Cadastrar livro
- Consultar quantidade de exemplares disponíveis

### Exemplares

- Cadastrar exemplar
- Associar exemplar a um livro
- Alterar status do exemplar
- Atualizar automaticamente a disponibilidade durante empréstimos e devoluções

Os principais estados utilizados são:

- Disponível
- Indisponível
- Emprestado

O estado `Emprestado` é controlado automaticamente pelo fluxo de empréstimo.

### Empréstimos

- Registrar empréstimo
- Registrar devolução
- Renovar empréstimo
- Consultar empréstimos de um estudante

O prazo padrão de empréstimo utilizado é de 7 dias.

A renovação acrescenta 7 dias à data prevista de devolução atual.

Quando um empréstimo é registrado, o exemplar passa de `Disponível` para `Emprestado`.

Quando ocorre a devolução, o exemplar volta para `Disponível`.

### Reservas

- Registrar reserva
- Cancelar reserva
- Consultar reservas do estudante
- Controlar posição na fila
- Reorganizar automaticamente a fila após cancelamentos
- Limitar a fila a 5 reservas ativas por livro
- Impedir uma nova reserva ativa do mesmo livro pelo mesmo estudante

As reservas canceladas permanecem registradas para permitir a manutenção do histórico.

### Multas

- Gerar multa automaticamente em devoluções atrasadas
- Consultar multas de um estudante

A regra implementada é:

`R$ 1,00 × quantidade de dias de atraso`

A multa começa a ser calculada a partir do primeiro dia posterior à data prevista de devolução.

### Estudantes

- Buscar estudante pelo nome
- Buscar estudante pelo e-mail institucional

A consulta utiliza DTO para retornar somente os dados necessários e não expor a senha armazenada na entidade.

---

## 6. Principais endpoints

### Livros

`GET /api/livros`

Consulta o acervo.

`POST /api/livros`

Cadastra um livro.

### Exemplares

`POST /api/exemplares`

Cadastra um exemplar.

`PUT /api/exemplares/{exemplarId}/status`

Altera manualmente o status de um exemplar.

### Empréstimos

`POST /api/emprestimos`

Registra um empréstimo.

`POST /api/emprestimos/{emprestimoId}/devolucao`

Registra uma devolução.

`POST /api/emprestimos/{emprestimoId}/renovacao`

Renova um empréstimo.

`GET /api/emprestimos/estudante/{estudanteId}`

Consulta os empréstimos de um estudante.

### Reservas

`POST /api/reservas`

Registra uma reserva.

`POST /api/reservas/{reservaId}/cancelamento`

Cancela uma reserva.

`GET /api/reservas/estudante/{estudanteId}`

Consulta as reservas de um estudante.

### Multas

`GET /api/multas/estudante/{estudanteId}`

Consulta as multas de um estudante.

### Estudantes

`GET /api/estudantes/busca?termo=...`

Pesquisa estudantes por nome ou e-mail institucional.

---

## 7. Validações

Foram adicionadas validações de entrada utilizando DataAnnotations.

Exemplos:

- campos obrigatórios no cadastro de livros;
- código de identificação obrigatório no cadastro de exemplar;
- LivroId maior que zero;
- IDs obrigatoriamente maiores que zero em operações principais;
- termo obrigatório na busca de estudantes;
- status obrigatório na alteração de exemplar.

A presença de `[ApiController]` permite que erros dessas validações sejam automaticamente transformados em respostas HTTP 400.

As regras de negócio permanecem nos Services.

---

## 8. Tratamento de Erros

Foi implementado tratamento centralizado de exceções.

Foram criadas duas exceções personalizadas:

### NotFoundException

Utilizada quando um recurso solicitado não existe.

Resultado HTTP:

`404 Not Found`

### BusinessException

Utilizada quando a operação viola uma regra de negócio.

Resultado HTTP:

`400 Bad Request`

Outras exceções inesperadas resultam em:

`500 Internal Server Error`

Dessa forma, os Controllers não precisam implementar blocos `try/catch` individualmente para essas situações.

---

## 9. Testes realizados

Os principais fluxos da API foram testados de forma integrada.

Foi testado o seguinte fluxo:

1. Cadastro de livro
2. Cadastro de exemplar
3. Consulta da disponibilidade
4. Registro de empréstimo
5. Alteração automática do exemplar para `Emprestado`
6. Renovação do empréstimo
7. Acréscimo de 7 dias ao prazo
8. Registro da devolução
9. Retorno automático do exemplar para `Disponível`
10. Atualização da disponibilidade no acervo

Também foram testados:

- criação de reserva;
- consulta de reservas;
- cancelamento;
- fila com múltiplos estudantes;
- reorganização da posição após cancelamento;
- consulta de estudantes;
- validação da busca;
- consulta de multas;
- cálculo de multa por atraso;
- respostas HTTP 400;
- respostas HTTP 404.

---

## 10. Funcionalidades pendentes

A autenticação ainda não faz parte da implementação atual do backend.

Permanecem para uma etapa posterior:

- primeiro acesso do estudante;
- envio de código de verificação;
- criação de senha;
- login;
- recuperação de senha;
- autenticação/autorização de estudante e bibliotecário;
- armazenamento seguro das senhas através de hash.

Os campos de senha existentes atualmente não devem ser considerados uma implementação final de segurança.

---

## 11. Resultado da etapa

Ao final desta fase, o projeto possui uma API funcional integrada ao SQL Server.

Os principais fluxos de negócio da biblioteca foram implementados, integrados e testados.

A arquitetura atual pode ser resumida como:

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

O próximo estágio do projeto é o desenvolvimento do front-end e sua integração com os endpoints existentes.