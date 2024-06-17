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

### Users
- **GET /users/{id}**: Buscar user pelo id

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL

### Passos para Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:JaquelineAPSantos/Desafio-BackEnd-CidadeAlta.git
   cd badge-system

2. **Instale as dependências:**
   
   ```bash
   npm install

3. **Configuração do Banco de Dados:**

   ```bash
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USER=root
    DATABASE_PASSWORD=sua-senha
    DATABASE_NAME=nome-do-banco
    JWT_SECRET=sua-chave-secreta

4. **Inicie a aplicação:**

   ```bash
   npm run start:dev

5. **Acesse a documentação da API:**

   ```bash
   Abra o navegador e acesse [http](//localhost:3000/api) para visualizar a documentação da API gerada pelo Swagger.

## Testando a API

### Registro de Usuário

#### Requisição:
- **Método:** POST
- **URL:** `http://localhost:3000/auth/register`
- **Body:**
  ```json
  {
    "username": "cecilia",
    "email": "cecilia@example.com",           
    "password": "123456"
  }

- **Resposta Esperada:**

  ```bash
  - Status: 201 Created
  - Descrição: Usuário registrado com sucesso.

### Login de Usuário

#### Requisição:

 - Método: POST
 - **URL:** `http://localhost:3000/auth/login`

- **Body:**

  ```json
   {
     "username": "cecilia",            
     "password": "123456"
    }


- **Resposta Esperada:**

- Status: 200 OK

- **Body:**
  ```json
  {
    "access_token": "seu_token_jwt"    
  }

### Listar Emblemas

#### Requisição:


- Método: GET
- **URL:** `http://localhost:3000/badges`

- **Resposta Esperada:**

- Status: 200 OK
- Body: Array de objetos Badge

### Resgatar um Emblema (Protegida por JWT)

#### Requisição:

- Método: POST
- **URL:** `http://localhost:3000/badges/:slug/redeem`
- Headers:

- Authorization: Bearer seu_token_jwt
- Body:
 
  ```json
  {
    "userId": 1                         
  }

- **Resposta Esperada:**

- Status: 200 OK

### Listar Emblemas Resgatados por um Usuário (Protegida por JWT)

#### Requisição:

- Método: GET
- **URL:**
- `htttp://localhost:3000/badges/user/:userId/redeemed`
- Headers:

  ```bash
  Authorization: Bearer seu_token_jwt      

- **Resposta Esperada:**

- Status: 200 OK

- Body: Array de objetos Badge

### Contribuição

- Se você encontrar problemas ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.


- Feito com muita dedicação, carinho e esforço por [Jaqueline Santos](https://github.com/JaquelineAPSantos)
