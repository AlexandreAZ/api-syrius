import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema, NonEmptyArray } from "type-graphql";
import express from "express"; 
import swaggerUi from "swagger-ui-express";
import cors from "cors"; 
import https from "https";
import fs from "fs";
import { Request, Response } from "express"; 
import { Routes } from "./routes";
import { Resolvers } from "./resolvers"; 

import bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json"); 
const path = require('path')

createConnection()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors()); 
    app.use(bodyParser.json({limit: '100mb'}));
    app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
    app.options('*', cors());


    const schema = await buildSchema({
      resolvers: Resolvers as NonEmptyArray<Function>, // add this
    });

    const server = new ApolloServer({ schema, playground: true, introspection: true });
    server.applyMiddleware({ app });

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.json(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });
    const port = 3000;

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.listen(port);

    /*https.createServer({
      cert: fs.readFileSync(path.join(__dirname, 'cert/certificate.crt')),
      key: fs.readFileSync(path.join(__dirname, 'cert/private.key'))
    }, 
    app).listen(port);*/

    console.log(
      `O servidor foi iniciado na porta ${port}. Abra https://api.sistemasyrius.com.br:${port}${server.graphqlPath} para ver os resultados.`
    );
  })
  .catch((error) => console.log(error));
