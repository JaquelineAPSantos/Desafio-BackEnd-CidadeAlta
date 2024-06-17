<<<<<<< HEAD
# Desafio-BackEnd-CidadeAlta
Desafio técnico Back-End da empresa Cidade Alta
=======
# Badge System API

Este projeto é uma API para gerenciar usuários e emblemas (badges), permitindo que os usuários resgatem emblemas e visualizem os emblemas que já resgataram. A API é construída utilizando o framework [NestJS](https://nestjs.com/) com TypeScript e integra o uso de autenticação JWT para proteger rotas específicas.

## Tecnologias Utilizadas

- **NestJS**: Framework de Node.js para construção de aplicações server-side eficientes e escaláveis.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática ao código.
- **TypeORM**: ORM (Object-Relational Mapper) para interagir com o banco de dados.
- **JWT (JSON Web Token)**: Para autenticação de rotas protegidas.
- **bcrypt**: Biblioteca para hashing de senhas.
- **Swagger**: Para documentação da API.
- **MySQL**: Banco de dados relacional utilizado.

## Estrutura do Projeto

- **auth/**: Contém a lógica de autenticação, incluindo estratégias JWT e guardas de autenticação.
- **user/**: Contém a lógica relacionada aos usuários, incluindo a entidade User e o serviço UserService.
- **badge/**: Contém a lógica relacionada aos emblemas, incluindo a entidade Badge e o serviço BadgeService.
- **main.ts**: Arquivo principal para inicializar a aplicação NestJS.
- **app.module.ts**: Módulo raiz da aplicação que importa e configura todos os outros módulos.

## Endpoints Disponíveis

### Autenticação

- **POST /auth/register**: Registrar um novo usuário.
- **POST /auth/login**: Fazer login e obter um token JWT.

### Emblemas

- **GET /badges**: Listar todos os emblemas.
- **GET /badges/user/:userId/redeemed**: Listar todos os emblemas resgatados por um usuário específico (rota protegida por JWT).
- **POST /badges/:slug/redeem**: Resgatar um emblema específico pelo slug (rota protegida por JWT).

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL

### Passos para Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:JaquelineAPSantos/Desafio-BackEnd-CidadeAlta.git
   cd git@github.com:JaquelineAPSantos/Desafio-BackEnd-CidadeAlta.git

2. **Instale as dependências:**

 - npm install

3. **Configuração do Banco de Dados:**

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=nome-do-banco
JWT_SECRET=sua-chave-secreta
>>>>>>> master
