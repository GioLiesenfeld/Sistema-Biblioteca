# Arquitetura do Sistema

## 1. Objetivo

Este documento apresenta a arquitetura utilizada no Sistema de Gerenciamento de Biblioteca Escolar, descrevendo as principais tecnologias e a forma como os componentes da aplicação se comunicam.

---

## 2. Arquitetura

O sistema foi desenvolvido como uma aplicação web com separação entre **frontend, backend e banco de dados**.

O frontend é responsável pela interface e interação com o usuário, enquanto o backend disponibiliza uma API responsável pelo processamento das requisições e aplicação das regras de negócio.

A persistência das informações é realizada em um banco de dados relacional.

O fluxo principal da aplicação é:

```text id="swnljp"
Frontend
   ↓
API REST / Controllers
   ↓
Services
   ↓
Entity Framework Core
   ↓
SQL Server