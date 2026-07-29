# Documento de Casos de Uso

| **Documento** | Casos de Uso |
|--------------|--------------|
| **Projeto** | Sistema de Gerenciamento de Biblioteca Escolar |
| **Versão** | 1.0 |
| **Data** | 27/07/2026 |
| **Autor** | Giovana Liesenfeld |

---

## 1. Introdução

Este documento apresenta os casos de uso do Sistema de Gerenciamento de Biblioteca Escolar. Os casos de uso representam as interações realizadas pelos atores com o sistema, detalhando o fluxo de execução das funcionalidades disponíveis. O objetivo deste documento é representar essas interações, servindo como base para a modelagem, os testes e a implementação do sistema.

---

## 2. Atores

Os atores representam as pessoas que interagem diretamente com o Sistema de Gerenciamento de Biblioteca Escolar para executar as funcionalidades disponíveis.

### 2.1 Bibliotecário

Responsável pelo gerenciamento da biblioteca por meio do sistema. Realiza o cadastro e a atualização do acervo, registra empréstimos e devoluções, controla multas e executa as demais atividades administrativas da biblioteca.

### 2.2 Estudante

Utiliza o sistema para consultar o acervo, realizar reservas, acompanhar seus empréstimos e consultar possíveis multas.

---

## 3. Casos de Uso

Esta seção apresenta os casos de uso identificados para o Sistema de Gerenciamento de Biblioteca Escolar, descrevendo as funcionalidades disponíveis para cada ator.

### 3.1 Casos de Uso do Estudante

| Código | Caso de Uso | Ator |
|---------|-------------|------|
| UC01 | Realizar Primeiro Acesso | Estudante |
| UC02 | Fazer Login | Estudante |
| UC03 | Consultar Acervo | Estudante |
| UC04 | Realizar Reserva | Estudante |
| UC05 | Cancelar Reserva | Estudante |
| UC06 | Consultar Empréstimos | Estudante |
| UC07 | Consultar Multas | Estudante |

## UC01 – Realizar Primeiro Acesso

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve possuir um e-mail institucional previamente cadastrado pela escola.

### Fluxo Principal

1. O estudante solicita o primeiro acesso.
2. O sistema solicita o e-mail institucional.
3. O estudante informa o e-mail.
4. O sistema envia um código de verificação para o e-mail informado.
5. O estudante informa o código recebido.
6. O sistema valida o código.
7. O sistema solicita a criação da senha.
8. O estudante informa a senha.
9. O sistema valida a senha.
10. O sistema ativa a conta do estudante.
11. O sistema autentica o estudante.
12. O sistema apresenta a página inicial.

### Fluxo Alternativo A1 – E-mail não encontrado

1. O sistema informa que o e-mail não foi encontrado.
2. O sistema solicita um novo e-mail.
3. O estudante informa novamente o e-mail.
4. O fluxo principal é retomado a partir do passo 4.

### Fluxo Alternativo A2 – Código inválido

1. O estudante informa um código inválido.
2. O sistema informa que o código é inválido.
3. O sistema solicita um novo código.
4. O fluxo principal é retomado a partir do passo 5.

### Fluxo Alternativo A3 – Senha inválida

1. O estudante informa uma senha que não atende aos critérios de segurança.
2. O sistema informa que a senha é inválida.
3. O sistema solicita uma nova senha.
4. O fluxo principal é retomado a partir do passo 8.

### Pós-condições

- A conta do estudante é ativada.
- O estudante está autenticado no sistema.

---

## UC02 – Fazer Login

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve possuir uma conta ativa.

### Fluxo Principal

1. O estudante seleciona a opção **Fazer Login**.
2. O sistema solicita o e-mail institucional e a senha.
3. O estudante informa suas credenciais.
4. O sistema valida as credenciais.
5. O sistema autentica o estudante.
6. O sistema apresenta a página inicial.

### Fluxo Alternativo A1 – Credenciais inválidas

1. O sistema informa que as credenciais são inválidas.
2. O sistema solicita que o estudante informe novamente seus dados.
3. O fluxo principal é retomado a partir do passo 2.

### Fluxo Alternativo A2 – Recuperação de senha

1. O estudante seleciona **Esqueci minha senha**.
2. O sistema solicita o e-mail institucional.
3. O estudante informa o e-mail.
4. O sistema envia as instruções para redefinição da senha.
5. O estudante redefine a senha.
6. O fluxo principal pode ser retomado.

### Pós-condições

- O estudante está autenticado no sistema.

---

## UC03 – Consultar Acervo

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve estar autenticado.

### Fluxo Principal

1. O estudante seleciona **Consultar Acervo**.
2. O sistema apresenta as categorias disponíveis.
3. O estudante seleciona uma categoria ou realiza uma pesquisa.
4. O sistema apresenta os livros encontrados.
5. O sistema apresenta as informações do livro selecionado.
6. O estudante consulta as informações do livro.

### Pós-condições

- O estudante consulta as informações do acervo.

---

## UC04 – Realizar Reserva

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve estar autenticado.

### Fluxo Principal

1. O estudante consulta o acervo.
2. O sistema apresenta os livros encontrados.
3. O estudante seleciona um livro.
4. O estudante solicita a reserva.
5. O sistema verifica a quantidade de estudantes na lista de espera.
6. O sistema registra a reserva.
7. O sistema informa que a reserva foi realizada com sucesso.

### Fluxo Alternativo A1 – Lista de espera completa

1. O estudante solicita a reserva.
2. O sistema verifica que a lista de espera possui cinco estudantes.
3. O sistema informa que não é possível realizar a reserva.
4. O caso de uso é encerrado.

### Pós-condições

- A reserva é registrada na lista de espera.

---

## UC05 – Cancelar Reserva

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve estar autenticado.
- O estudante deve possuir uma reserva ativa.

### Fluxo Principal

1. O estudante seleciona **Consultar Reservas**.
2. O sistema apresenta as reservas do estudante.
3. O estudante seleciona a reserva desejada.
4. O estudante confirma o cancelamento.
5. O sistema cancela a reserva.
6. O sistema informa que a reserva foi cancelada com sucesso.

### Pós-condições

- A reserva é removida da lista de espera.

---

## UC06 – Consultar Empréstimos

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve estar autenticado.

### Fluxo Principal

1. O estudante seleciona **Consultar Empréstimos**.
2. O sistema apresenta os empréstimos em andamento.
3. O sistema apresenta o histórico de empréstimos.

### Pós-condições

- O estudante consulta seus empréstimos.

---

## UC07 – Consultar Multas

**Ator Principal:** Estudante

**Pré-condições:**
- O estudante deve estar autenticado.

### Fluxo Principal

1. O estudante seleciona **Consultar Multas**.
2. O sistema apresenta as multas registradas.

### Pós-condições

- O estudante consulta suas multas.

## 3.2 Casos de Uso do Bibliotecário

### UC08 – Fazer Login

**Objetivo:** Permitir que o bibliotecário acesse o sistema por meio de suas credenciais institucionais.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve possuir uma conta cadastrada e ativa.

**Fluxo Principal:**

1. O bibliotecário seleciona a opção **"Fazer Login"**.
2. O sistema solicita o e-mail institucional e a senha.
3. O bibliotecário informa suas credenciais.
4. O sistema valida as credenciais.
5. O sistema autentica o bibliotecário.
6. O sistema apresenta a página inicial.

**Fluxo Alternativo 1 – Credenciais inválidas**

4.1. O sistema informa que as credenciais são inválidas.
4.2. O sistema solicita que o bibliotecário informe as credenciais novamente.
4.3. O fluxo principal é retomado.

**Fluxo Alternativo 2 – Recuperação de Senha**

2.1. O bibliotecário seleciona a opção **"Esqueci minha senha"**.
2.2. O sistema solicita o e-mail institucional.
2.3. O bibliotecário informa o e-mail.
2.4. O sistema envia as instruções para recuperação da senha.
2.5. O bibliotecário redefine a senha.
2.6. O fluxo principal é retomado.

**Pós-condições:**
- O bibliotecário encontra-se autenticado no sistema.

---

### UC09 – Localizar Estudante

**Objetivo:** Permitir que o bibliotecário localize um estudante para realizar operações relacionadas à biblioteca.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.

**Fluxo Principal:**

1. O bibliotecário identifica o estudante que deseja localizar.
2. O bibliotecário pesquisa pelo nome ou pela turma do estudante.
3. O sistema apresenta os estudantes encontrados.
4. O bibliotecário seleciona o estudante.

**Pós-condições:**
- O estudante encontra-se selecionado para realização de outras operações.

---

### UC10 – Registrar Empréstimo

**Objetivo:** Registrar o empréstimo de um exemplar para um estudante.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.
- O estudante deve estar selecionado.
- O exemplar deve estar disponível para empréstimo.

**Fluxo Principal:**

1. O bibliotecário seleciona o estudante.
2. O sistema apresenta o painel do estudante.
3. O bibliotecário seleciona a opção **"Registrar Empréstimo"**.
4. O sistema solicita as informações necessárias para realizar o empréstimo.
5. O bibliotecário informa os dados do exemplar.
6. O sistema verifica se o exemplar está disponível.
7. O sistema calcula a data de devolução.
8. O sistema registra o empréstimo.
9. O sistema atualiza o status do exemplar.
10. O sistema apresenta a confirmação do empréstimo.

**Pós-condições:**
- O empréstimo é registrado.
- O exemplar passa para o status **Emprestado**.

---

### UC11 – Registrar Devolução

**Objetivo:** Registrar a devolução de um exemplar emprestado.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.
- O estudante deve estar selecionado.
- Deve existir um empréstimo ativo para o exemplar.

**Fluxo Principal:**

1. O bibliotecário seleciona o estudante.
2. O sistema apresenta o painel do estudante.
3. O bibliotecário seleciona a opção **"Registrar Devolução"**.
4. O sistema registra a data da devolução.
5. O sistema verifica se a devolução ocorreu após a data prevista.
6. Caso haja atraso, o sistema calcula automaticamente a multa correspondente aos dias em atraso.
7. O sistema apresenta o valor acumulado da multa, quando houver.
8. O sistema atualiza o status do exemplar para **Disponível**.
9. O sistema apresenta a confirmação da devolução.

**Pós-condições:**
- A devolução é registrada.
- O exemplar passa para o status **Disponível**.
- Havendo atraso, a multa é registrada e vinculada ao estudante.

---

### UC12 – Consultar Empréstimos

**Objetivo:** Consultar o histórico de empréstimos de um estudante.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.
- O estudante deve estar selecionado.

**Fluxo Principal:**

1. O bibliotecário seleciona o estudante.
2. O sistema apresenta o painel do estudante.
3. O bibliotecário seleciona a opção **"Consultar Empréstimos"**.
4. O sistema apresenta o histórico de empréstimos do estudante.

**Pós-condições:**
- O histórico de empréstimos é apresentado.

---

### UC13 – Consultar Multas

**Objetivo:** Consultar o histórico de multas de um estudante.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.
- O estudante deve estar selecionado.

**Fluxo Principal:**

1. O bibliotecário seleciona o estudante.
2. O sistema apresenta o painel do estudante.
3. O bibliotecário seleciona a opção **"Consultar Multas"**.
4. O sistema apresenta o histórico de multas do estudante.

**Pós-condições:**
- O histórico de multas e os respectivos valores acumulados são apresentados ao bibliotecário.

---

### UC14 – Alterar Status do Livro

**Objetivo:** Alterar o status de um livro cadastrado.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.
- O livro deve estar cadastrado.

**Fluxo Principal:**

1. O bibliotecário seleciona o livro.
2. O sistema apresenta os dados cadastrais do livro.
3. O bibliotecário seleciona a opção **"Alterar Status do Livro"**.
4. O sistema apresenta as opções de status.
5. O bibliotecário seleciona o novo status.
6. O sistema atualiza o status do livro.

**Pós-condições:**
- O status do livro é atualizado.

---

### UC15 – Cadastrar Livro

**Objetivo:** Cadastrar um novo livro no acervo da biblioteca.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.

**Fluxo Principal:**

1. O bibliotecário acessa a página inicial do sistema.
2. O bibliotecário seleciona a opção **"Cadastrar Livro"**.
3. O sistema solicita os dados obrigatórios do livro.
4. O bibliotecário informa os dados.
5. O sistema registra o livro.
6. O sistema atualiza o acervo.

**Pós-condições:**
- O livro é cadastrado no sistema.

---

### UC16 – Cadastrar Exemplar

**Objetivo:** Cadastrar novos exemplares de um livro existente.

**Ator:** Bibliotecário

**Pré-condições:**
- O bibliotecário deve estar autenticado.
- O livro deve estar previamente cadastrado.

**Fluxo Principal:**

1. O bibliotecário acessa a página inicial do sistema.
2. O bibliotecário seleciona um livro previamente cadastrado.
3. O sistema apresenta os dados do livro.
4. O bibliotecário seleciona a opção **"Cadastrar Exemplar"**.
5. O sistema solicita a quantidade de exemplares.
6. O bibliotecário informa a quantidade.
7. O sistema gera um código de identificação para cada exemplar cadastrado.
8. O sistema conclui o cadastro.

**Pós-condições:**
- Os exemplares são cadastrados e vinculados ao livro.