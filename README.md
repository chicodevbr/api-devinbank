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

`GET /api/users`

