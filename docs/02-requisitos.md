# Especificação de Requisitos

| Campo | Valor |
|-------|-------|
| Projeto | Sistema de Gerenciamento de Biblioteca |
| Documento | Especificação de Requisitos |
| Versão | 1.0 |
| Autor | Giovana Liesenfeld |
| Status | Concluído |

---

# 1. Introdução

Este documento apresenta a especificação de requisitos do Sistema de Gerenciamento de Biblioteca. Seu objetivo é descrever os requisitos funcionais, regras de negócio e requisitos não funcionais considerados na primeira versão funcional do sistema.

---

# 2. Objetivo

O objetivo do Sistema de Gerenciamento de Biblioteca é informatizar atividades relacionadas à biblioteca escolar, permitindo o gerenciamento do acervo, empréstimos, devoluções, renovações, reservas e multas.

---

# 3. Escopo

A primeira versão do sistema contempla o gerenciamento de livros e exemplares, consulta ao acervo, localização de estudantes, controle de empréstimos, devoluções e renovações, reservas e consulta de multas.

O sistema possui interfaces distintas para estudantes e bibliotecários, que consomem uma API responsável pelas regras de negócio e pela comunicação com o banco de dados.

Funcionalidades de autenticação e recuperação de senha estão previstas como evolução futura.

---

# 4. Requisitos Funcionais

## 4.1 Gestão do Acervo

**RF01** – O sistema deve permitir ao bibliotecário cadastrar livros contendo título, autor, ISBN e categoria.

**RF02** – O sistema deve permitir ao bibliotecário cadastrar exemplares vinculados a livros previamente cadastrados.

**RF03** – O sistema deve permitir consultar os livros existentes no acervo.

**RF04** – O sistema deve informar a quantidade de exemplares disponíveis de cada livro.

**RF05** – O sistema deve permitir ao bibliotecário alterar manualmente o status de um exemplar entre Disponível e Indisponível.

---

## 4.2 Gestão de Empréstimos

**RF06** – O sistema deve permitir ao bibliotecário registrar o empréstimo de um exemplar para um estudante.

**RF07** – O sistema deve definir automaticamente a data prevista de devolução no momento do empréstimo.

**RF08** – O sistema deve permitir ao bibliotecário registrar a devolução de um empréstimo.

**RF09** – O sistema deve permitir ao bibliotecário renovar um empréstimo ativo.

**RF10** – O sistema deve permitir ao estudante consultar seus empréstimos.

**RF11** – O sistema deve calcular multa quando houver devolução realizada após a data prevista.

---

## 4.3 Reservas

**RF12** – O sistema deve permitir ao estudante reservar um livro.

**RF13** – O sistema deve permitir ao estudante consultar suas reservas.

**RF14** – O sistema deve permitir ao estudante cancelar uma reserva ativa.

**RF15** – O sistema deve controlar a posição das reservas de um livro.

**RF16** – O sistema deve impedir que o mesmo estudante possua mais de uma reserva ativa para o mesmo livro.

---

## 4.4 Estudantes

**RF17** – O sistema deve permitir ao bibliotecário localizar estudantes cadastrados.

---

## 4.5 Multas

**RF18** – O sistema deve permitir ao estudante consultar suas multas.

**RF19** – O sistema deve registrar multa quando uma devolução em atraso gerar penalidade.

---

# 5. Regras de Negócio

## 5.1 Empréstimos

**RN01** – Somente exemplares com status Disponível podem ser emprestados.

**RN02** – O prazo padrão de um empréstimo é de 7 dias.

**RN03** – Ao registrar um empréstimo, o exemplar deve assumir automaticamente o status Emprestado.

**RN04** – Somente empréstimos ativos podem ser renovados.

**RN05** – Cada renovação acrescenta 7 dias à data prevista de devolução atual.

**RN06** – Ao registrar uma devolução, o empréstimo deve ser encerrado.

**RN07** – Após a devolução, o exemplar deve voltar automaticamente para o status Disponível.

**RN08** – Quando houver atraso na devolução, deve ser gerada multa correspondente aos dias de atraso.

**RN09** – O valor da multa é de R$ 1,00 por dia de atraso.

---

## 5.2 Reservas

**RN10** – Um estudante não pode possuir duas reservas ativas para o mesmo livro.

**RN11** – Cada livro pode possuir no máximo cinco reservas ativas.

**RN12** – A posição de uma nova reserva deve ser definida de acordo com a quantidade de reservas ativas existentes para o livro.

**RN13** – Somente reservas ativas podem ser canceladas.

**RN14** – Quando uma reserva é cancelada, as posições posteriores devem ser atualizadas.

**RN15** – Reservas canceladas devem permanecer registradas para preservação do histórico.

---

## 5.3 Acervo

**RN16** – Um livro pode existir no sistema mesmo sem possuir exemplares cadastrados.

**RN17** – Cada exemplar deve estar vinculado a um livro.

**RN18** – Um livro pode possuir vários exemplares.

**RN19** – Exemplares recém-cadastrados devem possuir status Disponível.

**RN20** – A alteração manual de status permite apenas os estados Disponível e Indisponível.

**RN21** – O status Emprestado é controlado automaticamente pelo fluxo de empréstimos e devoluções.

---

## 5.4 Perfis

**RN22** – Operações de cadastro e movimentação do acervo são destinadas ao perfil de bibliotecário.

**RN23** – Operações de reserva e consulta de informações pessoais são destinadas ao perfil de estudante.

**RN24** – Tanto estudantes quanto bibliotecários podem consultar o acervo.

---

# 6. Requisitos Não Funcionais

## 6.1 Usabilidade

**RNF01** – O sistema deve apresentar uma interface simples e de fácil utilização.

**RNF02** – As funcionalidades devem estar organizadas de acordo com o perfil do usuário.

---

## 6.2 Compatibilidade

**RNF03** – O frontend deve ser executável em navegadores web modernos.

---

## 6.3 Arquitetura

**RNF04** – O frontend deve consumir as funcionalidades do sistema por meio de uma API HTTP.

**RNF05** – O backend deve separar as responsabilidades de acesso HTTP, regras de negócio e persistência de dados.

**RNF06** – Os dados da aplicação devem ser armazenados em banco de dados relacional.

---

## 6.4 Manutenibilidade

**RNF07** – O código deve possuir organização que permita a evolução das funcionalidades do sistema.

---

# 7. Funcionalidades Planejadas para Versões Futuras

As seguintes funcionalidades pertencem à evolução planejada do sistema e não fazem parte da primeira versão funcional:

- Autenticação de estudantes e bibliotecários
- Primeiro acesso do estudante
- Recuperação de senha
- Armazenamento seguro de senhas utilizando hash
- Integração automática com o sistema acadêmico da escola
- Gerenciamento completo de categorias
- Notificações relacionadas às reservas
- Evolução das regras de lista de espera
- Melhorias de acessibilidade e segurança