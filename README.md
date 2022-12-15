# Api syrius ORM TypeScript

## Detalhes do projeto

O projeto usa a biblioteca [typeorm](https://typeorm.io/#/) como ORM.
Usa o [express](https://expressjs.com/) como servidor http.
Também usa [Apollo Server](https://www.apollographql.com/) como servidor para GraphQL. (Mais sobre GraphQL pode ser encontrado no [site oficial](https://graphql.org/))
E [swagger](https://swagger.io/) para a documentação REST.

## Como executar o projeto

Configurar os dados do servidor no arquivo `ormconfig.json`.


bash
```
npm i
npm run start
```

## Detalhes

### Pastas

#### entity

Pasta onde estão as entidades do banco de dados. Podem ser considerados os models.

#### controller

Nesta pasta estão os controllers da API REST.

#### middlewares

Aqui encontramos os middlewares do servidor express, podem ser adicionados vários, apenas adicionando eles nas rotas desejadas.

#### resolvers

Estes são responsáveis pela parte do GraphQL, como os controllers da REST.

### Outros Arquivos

#### resolvers.ts

Nesse arquivo configuramos todos os resolvers que desejamos que a API GraphQL tenha.

#### routes.ts

Aqui temos as rotas da API REST, assim como os middlewares e métodos.

#### swagger_output.json

Arquivo json onde ficam as especificações da API REST.

## TO DO

- [ ] Implementar a API também em websocket;
- [ ] Criar os migrations para o banco de dados. (Necessário reestruturar);
- [ ] Fallback para o ORM;
- [ ] Dockerizar o projeto;
- [ ] Jwt no GraphQL;
- [ ] 