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



#### Delete User

Para deletar um usuário, basta enviar o userId como parâmetro pra o seguinte endpoint:

`DELETE /api/v1/user/{id}`



### Financial

Endpoints de transações financeiras.



#### Transações por Usuário

Endpoint devolve todas as despesas cadastras por usuário. O id do usuário deve ser passado como parâmetro via url. O userId é requisito obrigatório. Opcionalmente é possível passar parâmetros por query para refinar a busca. A *search* query permite que seja passado um termo para pesquisar pelos tipos de despesas cadastradas, termos como moradia, transporte e etc. As queries *start* e *end* permitir criar um range de datas para que as pesquisa seja refinada por períodos de tempo. Start é a data inicial a ser pesquisada, já end é a data final do período a ser pesquisado.

`GET /api/v1/expenses/{userId}`



#### Cadastrando despesas/transações por usuário

Endpoint do tipo POST que recebe um xlsx, enviado como form-data, com os dados das despesas a serem cadastradas. O userId do usuário, que é um requisito obrigatório, deve ser passado como parâmetro na URL. A tabela xlsx deve conter quatro colunas com dados como nome da despesa, tipo da despesa, data, e valor gasto. O cabeçalho da tabela deve ser 'name, date, typeOfExpenses, amount'.

`POST /api/v1/expenses/{userId}`



#### Deletando uma despesa

Endpoint do tipo DELETE para apagar do banco de dados uma despesa específica. Tanto o id da despesa quanto o id do usuário devem ser passados como parâmetros via URL.

`DELETE /api/v1/expenses/{userId}/{expenseId}`

