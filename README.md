# API DEVinBank - Conta 365

DEVinBank é uma api para gerenciamento de despesas. Através dela é possível cadastrar usuários e as despesas diárias, mensais e anuais desses usuários. A api converte dados .xlsx para .json, formato no qual os dados ficam armazenados.

## INSTALL

Após o clonar o repositório, acesse a pasta pra onde o repositório foi clonado e instale a api:

`npm install or yarn install`

## Exemplos de uso

A seguir alguns exemplos de como a api pode ser usada:



#### Hello World

Endpoint de boas vindas da API:

`GET /api/v1/  `



#### Get Users

Esse é o primeiro edpoint da nossa API. Ele devolve uma lista com todos os usuários cadastrados. Para usa-lo basta fazer uma solicitação do tipo GET. 

`GET /api/v1/users`



#### Get Users By Id

Endpoint para obter as informações específicas de um determinado usuário. Para isso, o id do usuário deve ser passado como parâmetro pelo url.

`GET /api/v1/user/{id}`



#### New User

Endponit para cadastrar um novo usuário. 

`POST /api/v1/user`

Exemplo de como as informações devem ser passadas no body da requisição:

`{  "name": "any",  "email": "any" }`

#### Update User

Endpoint para atualizar dados de um determinado usuário. É preciso passar o userId como parâmetro via url.

`PATCH /api/v1/user/{id}`



