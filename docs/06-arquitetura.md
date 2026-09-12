# Arquitetura do Sistema

## Objetivo

Este documento apresenta a arquitetura definida para o Sistema de gerenciamento de Biblioteca Escolar, descrevdendo as principais tecnologias utilizadas e a forma como os componentes da aplicação se comunicam.

## Arquitetura

O sistema será desenvolvido como uma aplicação web, com separação entre front-end, back-end e banco de dados.

A comunicação entre o front-end e o back-end será realizada por meio de uma API REST.

A arquitetura seguirá o seguinte fluxo:

Front-end → API REST → Services → Entity Framework Core → Banco de Dados

## Tecnologias

- **Front-end:** HTML, CSS e Javascript
- **Back-end:** C# com ASP.NET Core Web API
- **ORM:** Ebtity Framework Core
- **Banco de Dados:** SQL Server
- **Versionamento:** Git e GitHub

## 4. Organização do Back-end

O back-end será organizado inicialmente nas seguintes partes:

- **Controllers:** recebem as requisições da API e retornam as respostas.
- **Services:** concentram as regras de negócio da aplicação.
- **Models:** representam as principais entidades do sistema.
- **Data:** contém a configuração de acesso e persistência dos dados.

Essa organização busca manter as responsabilidades do sistema separadas e facilitar a manutenção e evolução do projeto.