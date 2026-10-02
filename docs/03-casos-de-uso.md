# Documento de Casos de Uso

| Campo | Valor |
|-------|-------|
| **Documento** | Casos de Uso |
| **Projeto** | Sistema de Gerenciamento de Biblioteca Escolar |
| **Versão** | 1.0 |
| **Data** | 27/07/2026 |
| **Autor** | Giovana Liesenfeld |
| **Status** | Concluído |

---

## 1. Introdução

Este documento apresenta os casos de uso da primeira versão funcional do Sistema de Gerenciamento de Biblioteca Escolar.

Os casos de uso representam as principais interações realizadas pelos estudantes e bibliotecários com o sistema e servem como referência para a implementação e os testes das funcionalidades.

---

## 2. Atores

### 2.1 Estudante

Utiliza o sistema para consultar o acervo, realizar e cancelar reservas, acompanhar seus empréstimos e consultar multas.

### 2.2 Bibliotecário

Responsável pelas operações administrativas da biblioteca, incluindo localização de estudantes, cadastro do acervo e gerenciamento de empréstimos, devoluções e renovações.

---

# 3. Casos de Uso do Estudante

| Código | Caso de Uso |
|--------|-------------|
| UC01 | Consultar Acervo |
| UC02 | Realizar Reserva |
| UC03 | Cancelar Reserva |
| UC04 | Consultar Empréstimos |
| UC05 | Consultar Multas |

---

## UC01 – Consultar Acervo

**Ator Principal:** Estudante

### Fluxo Principal

1. O estudante acessa o acervo.
2. O sistema apresenta os livros cadastrados.
3. O sistema apresenta título, autor, categoria e quantidade de exemplares disponíveis.
4. O estudante pode pesquisar livros por título, autor ou categoria.
5. O sistema apresenta os livros correspondentes à pesquisa.

### Pós-condições

- O estudante visualiza as informações disponíveis no acervo.

---

## UC02 – Realizar Reserva

**Ator Principal:** Estudante

### Pré-condições

- O livro deve estar cadastrado.

### Fluxo Principal

1. O estudante consulta o acervo.
2. O estudante seleciona a opção de reservar um livro.
3. O sistema verifica as regras aplicáveis à reserva.
4. O sistema registra a reserva.
5. O sistema determina a posição da reserva.
6. O sistema informa que a reserva foi realizada com sucesso.

### Fluxo Alternativo A1 – Reserva duplicada

1. O sistema identifica que o estudante já possui uma reserva ativa para o mesmo livro.
2. O sistema impede a criação de uma nova reserva.
3. O sistema informa o motivo ao estudante.

### Fluxo Alternativo A2 – Limite de reservas atingido

1. O sistema identifica que o livro já possui cinco reservas ativas.
2. O sistema impede a nova reserva.
3. O sistema informa o motivo ao estudante.

### Pós-condições

- A reserva fica registrada no sistema.

---

## UC03 – Cancelar Reserva

**Ator Principal:** Estudante

### Pré-condições

- O estudante deve possuir uma reserva ativa.

### Fluxo Principal

1. O estudante acessa suas reservas.
2. O sistema apresenta as reservas existentes.
3. O estudante solicita o cancelamento.
4. O sistema cancela a reserva.
5. O sistema reorganiza as posições posteriores, quando necessário.
6. O sistema informa que a reserva foi cancelada.

### Pós-condições

- A reserva deixa de estar ativa.
- O registro da reserva permanece armazenado no sistema.

---

## UC04 – Consultar Empréstimos

**Ator Principal:** Estudante

### Fluxo Principal

1. O estudante acessa a opção "Meus Empréstimos".
2. O sistema consulta os empréstimos vinculados ao estudante.
3. O sistema apresenta as informações encontradas.

### Pós-condições

- O estudante visualiza seus empréstimos.

---

## UC05 – Consultar Multas

**Ator Principal:** Estudante

### Fluxo Principal

1. O estudante acessa a opção "Minhas Multas".
2. O sistema consulta as multas vinculadas ao estudante.
3. O sistema apresenta as informações encontradas.

### Pós-condições

- O estudante visualiza suas multas.

---

# 4. Casos de Uso do Bibliotecário

| Código | Caso de Uso |
|--------|-------------|
| UC06 | Consultar Acervo |
| UC07 | Localizar Estudante |
| UC08 | Registrar Empréstimo |
| UC09 | Registrar Devolução |
| UC10 | Renovar Empréstimo |
| UC11 | Cadastrar Livro |
| UC12 | Cadastrar Exemplar |
| UC13 | Alterar Status do Exemplar |

---

## UC06 – Consultar Acervo

**Ator Principal:** Bibliotecário

### Fluxo Principal

1. O bibliotecário acessa o acervo.
2. O sistema apresenta os livros cadastrados e a disponibilidade de exemplares.
3. O bibliotecário pode pesquisar livros.

### Pós-condições

- O bibliotecário visualiza as informações do acervo.

---

## UC07 – Localizar Estudante

**Ator Principal:** Bibliotecário

### Fluxo Principal

1. O bibliotecário acessa a opção "Localizar Estudante".
2. O sistema solicita um termo para pesquisa.
3. O bibliotecário informa o termo.
4. O sistema consulta os estudantes cadastrados.
5. O sistema apresenta os estudantes encontrados.

### Pós-condições

- O bibliotecário obtém as informações do estudante procurado.

---

## UC08 – Registrar Empréstimo

**Ator Principal:** Bibliotecário

### Pré-condições

- O estudante deve estar cadastrado.
- O exemplar deve estar cadastrado.
- O exemplar deve possuir status "Disponível".

### Fluxo Principal

1. O bibliotecário acessa a opção "Registrar Empréstimo".
2. O bibliotecário informa o estudante e o exemplar.
3. O sistema verifica a disponibilidade do exemplar.
4. O sistema registra o empréstimo.
5. O sistema define a data prevista de devolução.
6. O sistema altera automaticamente o status do exemplar para "Emprestado".
7. O sistema confirma a operação.

### Pós-condições

- O empréstimo fica registrado.
- O exemplar passa para o status "Emprestado".

---

## UC09 – Registrar Devolução

**Ator Principal:** Bibliotecário

### Pré-condições

- Deve existir um empréstimo ativo.

### Fluxo Principal

1. O bibliotecário acessa a opção "Registrar Devolução".
2. O bibliotecário informa o empréstimo.
3. O sistema registra a devolução.
4. O sistema verifica se houve atraso.
5. Havendo atraso, o sistema calcula e registra a multa correspondente.
6. O sistema altera o status do exemplar para "Disponível".
7. O sistema confirma a operação.

### Pós-condições

- O empréstimo é encerrado.
- O exemplar volta para o status "Disponível".
- Havendo atraso, a multa fica registrada.

---

## UC10 – Renovar Empréstimo

**Ator Principal:** Bibliotecário

### Pré-condições

- O empréstimo deve estar ativo.

### Fluxo Principal

1. O bibliotecário acessa a opção "Renovar Empréstimo".
2. O bibliotecário informa o empréstimo.
3. O sistema verifica se o empréstimo está ativo.
4. O sistema acrescenta 7 dias à data prevista de devolução.
5. O sistema registra a alteração.
6. O sistema confirma a renovação.

### Pós-condições

- A data prevista de devolução é atualizada.

---

## UC11 – Cadastrar Livro

**Ator Principal:** Bibliotecário

### Fluxo Principal

1. O bibliotecário acessa a opção "Cadastrar Livro".
2. O sistema solicita os dados do livro.
3. O bibliotecário informa título, autor, ISBN e categoria.
4. O sistema registra o livro.
5. O sistema confirma o cadastro.

### Pós-condições

- O livro fica cadastrado no acervo.

---

## UC12 – Cadastrar Exemplar

**Ator Principal:** Bibliotecário

### Pré-condições

- O livro deve estar previamente cadastrado.

### Fluxo Principal

1. O bibliotecário acessa a opção "Cadastrar Exemplar".
2. O bibliotecário informa o código de identificação do exemplar e o ID do livro.
3. O sistema verifica o livro informado.
4. O sistema registra o exemplar vinculado ao livro.
5. O exemplar recebe o status inicial "Disponível".
6. O sistema confirma o cadastro.

### Pós-condições

- O exemplar fica cadastrado e vinculado ao livro.
- A disponibilidade do livro é atualizada no acervo.

---

## UC13 – Alterar Status do Exemplar

**Ator Principal:** Bibliotecário

### Pré-condições

- O exemplar deve estar cadastrado.

### Fluxo Principal

1. O bibliotecário acessa a opção "Alterar Status do Exemplar".
2. O bibliotecário informa o exemplar.
3. O bibliotecário seleciona "Disponível" ou "Indisponível".
4. O sistema atualiza o status.
5. O sistema confirma a alteração.

### Pós-condições

- O status do exemplar é atualizado.
- A quantidade de exemplares disponíveis apresentada no acervo é atualizada.

---

# 5. Funcionalidades Futuras

Os seguintes casos de uso foram identificados durante o planejamento, mas não fazem parte da primeira versão funcional:

- Realizar primeiro acesso
- Fazer login como estudante
- Fazer login como bibliotecário
- Recuperar senha
- Integração automática com o sistema acadêmico

Esses casos poderão ser incorporados em versões futuras do sistema.