# Especificação de Requisitos

| Campo | Valor |
|--------|-------|
| Projeto | Sistema de Gerenciamento de Biblioteca |
| Documento | Especificação de Requisitos |
| Versão | 1.0 |
| Autor | Giovana Liesenfeld |
| Status | Em elaboração |

---

# 1. Introdução

Este documento apresenta a especificação de requisitos do Sistema de Gerenciamento de Biblioteca. Seu objetivo é descrever os requisitos funcionais e não funcionais que o sistema deve possuir para atender às necessidades das partes interessadas.

---

# 2. Objetivo

O objetivo do Sistema de Gerenciamento de Biblioteca é informatizar as atividades relacionadas à biblioteca escolar, como cadastros, consultas, empréstimos, devoluções e gerenciamento do acervo, proporcionando maior organização, agilidade e eficiência na administração da biblioteca.

---

# 3. Escopo

O Sistema de Gerenciamento de Biblioteca informatiza os processos relacionados ao acervo de livros da escola. Seu escopo contempla o cadastro de livros, exemplares e categorias, a consulta ao sistema acadêmico para identificação dos estudantes matriculados, a consulta e disponibilidade do acervo, o controle de empréstimos, devoluções, reservas, listas de espera e multas, reunindo as funcionalidades necessárias para a administração da biblioteca escolar.

---

# 4. Requisitos Funcionais

## 4.1 Gestão do Acervo

**RF01** – O sistema deve permitir o cadastro de livros, registrando informações como título, autor, editora, ISBN, categoria e ano de publicação.

**RF02** – O sistema deve permitir o cadastro de exemplares vinculados a um livro previamente cadastrado. O usuário informa a quantidade de exemplares adquiridos, e o sistema gera automaticamente um código único de identificação para cada exemplar.

**RF11** – O sistema deve permitir à bibliotecária cadastrar, editar, consultar e inativar as categorias utilizadas para classificar os livros do acervo.

---

## 4.2 Gestão de Empréstimos

**RF03** – O sistema deve permitir registrar o empréstimo de exemplares para estudantes matriculados, registrando a data do empréstimo e definindo automaticamente a data prevista para devolução.

**RF04** – O sistema deve permitir renovar empréstimos de exemplares.

**RF05** – O sistema deve permitir registrar a devolução de exemplares, encerrando o respectivo empréstimo.

**RF06** – O sistema deve calcular automaticamente a multa gerada pelo atraso na devolução de exemplares.

---

## 4.3 Consulta e Reserva

**RF07** – O sistema deve permitir que os estudantes consultem o catálogo de livros da biblioteca.

**RF08** – O sistema deve permitir que os estudantes reservem exemplares da biblioteca.

**RF09** – O sistema deve permitir que estudantes ingressem em listas de espera para exemplares indisponíveis.

**RF10** – O sistema deve consultar a lista de estudantes matriculados no sistema acadêmico da escola, permitindo utilizar essas informações para a realização de empréstimos, reservas e demais operações da biblioteca.

---

## 4.4 Gestão de Usuários

**RF12** – O sistema deve permitir que estudantes matriculados realizem o primeiro acesso, vinculando seu e-mail e cadastrando uma senha para utilização do sistema.

**RF13** – O sistema deve permitir que usuários autenticados realizem login utilizando suas credenciais.

# 5. Regras de Negócio

## 5.1 Empréstimos

**RN01** – Somente exemplares disponíveis podem ser emprestados.

**RN02** – A renovação do empréstimo é opcional.

**RN03** – A renovação do empréstimo poderá ser realizada após 7 dias da data do empréstimo.

**RN04** – Multas são aplicadas quando ocorre atraso na devolução de um exemplar.

**RN05** – O valor da multa é acrescido diariamente enquanto houver atraso na devolução.

**RN06** – Cada empréstimo poderá ser renovado apenas uma vez.

**RN07** – O prazo padrão para devolução de um exemplar é de 15 dias a partir da data do empréstimo.

**RN08** – Em caso de perda ou dano de um exemplar, o estudante deverá repor a obra à biblioteca.

**RN09** – Cada estudante poderá possuir apenas um empréstimo ativo por vez.

**RN15** – Estudantes com multas pendentes não poderão realizar novos empréstimos.

**RN16** – Não existe limite máximo para o valor acumulado das multas.

**RN17** – Todo exemplar deverá ser cadastrado antes de estar disponível para empréstimo.

**RN18** – A devolução de exemplares deverá ocorrer conforme o cronograma estabelecido pela biblioteca.

**RN19** – Após a realização do empréstimo ou da renovação, o estudante permanecerá responsável pelo exemplar até a sua devolução.

**RN29** – O histórico de empréstimos e as pendências de estudantes deverão permanecer registrados no sistema, mesmo após o encerramento da matrícula.

**RN30** – As pendências de empréstimos e multas dos estudantes deverão permanecer disponíveis para consulta pela bibliotecária.

**RN31** – O histórico operacional de empréstimos deverá permanecer disponível no sistema por 2 anos. Após esse período, os registros poderão ser arquivados e posteriormente excluídos pelo sistema.

---

## 5.2 Reservas

**RN10** – Quando um exemplar estiver indisponível, os estudantes poderão ingressar em uma lista de espera.

**RN11** – Cada lista de espera poderá conter, no máximo, cinco estudantes.

**RN12** – Após a devolução de um exemplar reservado, ele ficará disponível na estante de livros reservados para o primeiro estudante da lista de espera.

**RN13** – O primeiro estudante da lista de espera terá prioridade para decidir se deseja retirar o exemplar reservado.

**RN14** – Caso o primeiro estudante da lista desista da reserva, sua solicitação será cancelada e o exemplar ficará disponível para o próximo estudante da lista.

**RN23** – Quando um exemplar reservado for devolvido, ele ficará disponível para retirada pelo primeiro estudante da lista de espera durante a semana destinada à retirada.

**RN24** – Caso o estudante prioritário não retire o exemplar dentro da semana prevista, sua reserva será cancelada e ele será reposicionado no final da lista de espera.

**RN25** – Após o reposicionamento do estudante, a prioridade de retirada será concedida ao próximo estudante da lista de espera.

---

## 5.3 Usuários

**RN21** – A bibliotecária será a única responsável por realizar operações de cadastro, empréstimo, renovação, devolução e demais movimentações do acervo.

**RN22** – Os demais usuários da escola terão acesso apenas à consulta do catálogo, à solicitação de reservas e ao ingresso em listas de espera.

**RN26** – Os dados dos estudantes serão obtidos automaticamente a partir do sistema acadêmico da escola.

**RN27** – Somente estudantes com matrícula ativa poderão realizar empréstimos, reservas e ingressar em listas de espera.

---

## 5.4 Acervo

**RN28** – Livros e exemplares poderão ser inativados, mas não poderão ser excluídos do sistema, a fim de preservar a consistência do histórico de empréstimos e demais registros.

**RN32** – Todo livro deverá estar associado a uma categoria para facilitar sua organização e consulta no catálogo.

---

# 6. Requisitos Não Funcionais

## 6.1 Compatibilidade

**RNF01** – O sistema deverá ser acessível por meio dos principais navegadores web modernos (Google Chrome, Microsoft Edge e Mozilla Firefox).

**RNF02** – O sistema deverá possuir interface responsiva, adaptando-se corretamente a computadores, tablets e smartphones.

---

## 6.2 Segurança

**RNF03** – O sistema deverá exigir autenticação para acesso às funcionalidades restritas.

**RNF04** – Os estudantes deverão autenticar-se utilizando sua matrícula e a senha cadastrada no sistema.

**RNF05** – O sistema deverá permitir a recuperação de senha por meio do e-mail cadastrado pelo estudante.

**RNF06** – O sistema deverá armazenar as senhas dos usuários de forma segura, utilizando algoritmos de hash, não permitindo o armazenamento das senhas em texto puro.

---

## 6.3 Disponibilidade

**RNF07** – O sistema deverá permanecer disponível para acesso dos usuários durante 24 horas por dia, 7 dias por semana, exceto em períodos programados de manutenção.

---

## 6.4 Usabilidade

**RNF08** – O sistema deverá apresentar uma interface simples, intuitiva e de fácil utilização, adequada para estudantes do 6º ano do Ensino Fundamental ao 3º ano do Ensino Médio e para a bibliotecária.

---

## 6.5 Desempenho

**RNF09** – O sistema deverá responder às operações de consulta e pesquisa em até 2 segundos, em condições normais de uso.

---

## 6.6 Confiabilidade

**RNF10** – O sistema deverá realizar backups periódicos dos dados, permitindo sua recuperação em caso de falhas.

---

## 6.7 Acessibilidade

**RNF11** – O sistema deverá seguir boas práticas de acessibilidade, proporcionando navegação clara, contraste adequado e compatibilidade com tecnologias assistivas sempre que possível.