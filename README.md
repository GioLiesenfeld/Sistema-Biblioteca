# 📚 Sistema de Gerenciamento de Biblioteca Escolar

Sistema web desenvolvido para simular o gerenciamento de uma biblioteca escolar, permitindo o controle de livros, exemplares, estudantes, empréstimos, reservas, devoluções, renovações e multas.

O projeto foi desenvolvido como parte do meu portfólio durante a graduação em Análise e Desenvolvimento de Sistemas, com o objetivo de aplicar na prática conceitos de desenvolvimento web, APIs REST, Programação Orientada a Objetos, banco de dados relacional e regras de negócio.

---

## 🎯 Objetivo

Desenvolver uma aplicação capaz de centralizar operações comuns de uma biblioteca escolar, oferecendo funcionalidades específicas para estudantes e bibliotecários.

O sistema foi construído de forma incremental, passando pelas etapas de levantamento de requisitos, modelagem, desenvolvimento do backend, integração com banco de dados e construção da interface web.

---

## 👤 Área do Estudante

O estudante pode:

- Consultar o acervo da biblioteca
- Pesquisar livros por título, autor ou categoria
- Visualizar a quantidade de exemplares disponíveis
- Reservar livros
- Consultar suas reservas
- Cancelar reservas
- Consultar seus empréstimos
- Consultar multas

---

## 🧑‍💼 Área do Bibliotecário

O bibliotecário pode:

- Consultar o acervo
- Localizar estudantes
- Registrar empréstimos
- Registrar devoluções
- Renovar empréstimos
- Cadastrar livros
- Cadastrar exemplares
- Alterar o status de exemplares

---

## ⚙️ Regras de Negócio

Entre as regras implementadas estão:

- Empréstimos possuem prazo padrão de 7 dias
- A renovação acrescenta 7 dias ao prazo atual
- Exemplares emprestados ficam automaticamente indisponíveis
- A devolução torna o exemplar disponível novamente
- Atrasos podem gerar multa de R$ 1,00 por dia
- Um estudante não pode manter duas reservas ativas para o mesmo livro
- Cada livro possui limite de reservas ativas
- Livros e exemplares são entidades independentes, permitindo que um livro possua múltiplos exemplares

---

## 🛠️ Tecnologias

### Backend

- C#
- .NET
- ASP.NET Core Web API
- Entity Framework Core

### Banco de Dados

- SQL Server
- SQL Server Management Studio (SSMS)

### Frontend

- HTML
- CSS
- JavaScript

### Versionamento

- Git
- GitHub

---

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura organizada em camadas de responsabilidade.

```text
Frontend
   ↓
Controllers
   ↓
Services
   ↓
Entity Framework Core
   ↓
SQL Server