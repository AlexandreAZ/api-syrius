
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuarios } from '../entity/Usuarios';
import moment from "moment";

export class UserController {

    private userRepository = getRepository(Usuarios)

    async all(request: Request, response: Response, next: NextFunction) {
        const username = request.body['username']; 
        var dir = this.getFirstPart(username)
        this.userRepository.metadata.tablePath = dir + "." + "USERS"; 
        this.userRepository.metadata.tableMetadataArgs.schema = dir
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const username = request.body['username']; 
        var dir = this.getFirstPart(username)
        var nome =  this.getSecondPart(username);
        this.userRepository.metadata.tablePath = dir + "." + "USERS"; 
        this.userRepository.metadata.tableMetadataArgs.schema = dir 
        
        const user = await this.userRepository.findOne({
            where: { USERNAME: nome }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async oneId(request: Request, response: Response, next: NextFunction) {
      const username = request.body['username']; 
      var dir = this.getFirstPart(username)
      var id =  request.body['id'];
      this.userRepository.metadata.tablePath = dir + "." + "USERS"; 
      this.userRepository.metadata.tableMetadataArgs.schema = dir 
      
      const user = await this.userRepository.findOne({
          where: { ID: id }
      })

      if (!user) {
          return "unregistered user"
      }
      return user
    }

    async add(request: Request, response: Response){
      try {
        var dados = request.body['dados'];
        var idUsuario = request.body['id'];
        var diretorio = request.body['diretorio'];
        this.userRepository.metadata.tablePath = diretorio + ".USERS"; 
        this.userRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados); 

        let role;
        if(dados['TYPE'] === 'operador'){
          role = 1;
        } else {
          role = 0
        }
        /*console.log(` UPDATE "`+diretorio+`"."USERS" 
                       SET "USERNAME" = '`+dados['USERNAME']+`' 
                       "PASSWORD" = '`+dados['PASSWORD']+`',
                       "UPDATED" = '`+ new Date()+`',
                       "TYPE" = `+role+`,
                       "ENABLED" = 1
                       WHERE "ID" = ` + idUsuario+` 
                    `)*/
       var resp = await this.userRepository
        .query(` UPDATE "`+diretorio+`"."USERS"
                       SET "USERNAME" = '`+dados['USERNAME']+`',
                       "PASSWORD" = '`+dados['PASSWORD']+`',
                       "UPDATED" = '`+ moment(new Date()).format('yyyy-MM-DD') +`',
                       "TYPE" = `+role+`,
                       "ENABLED" = 1
                       WHERE "ID" = ` + idUsuario+`
                    `); 
         if(resp[1]==0){ 
          var resp = await this.userRepository
          .query(`INSERT INTO "`+diretorio+`"."USERS"
                 ("USERNAME","PASSWORD","CREATED","UPDATED", "TYPE","ENABLED", "ID_EMPRESA") 
                 VALUES ('`+dados['USERNAME']+`','`+dados['PASSWORD']+`',
                 '`+ moment(new Date()).format('yyyy-MM-DD')+`',
                 '`+ moment(new Date()).format('yyyy-MM-DD')+`',
                 `+role+`,1, 0)`);
         } 

        resp = dados
        
        if (!resp || resp.length === 0) return { message: "Não foi possivel incluir ou atualizar o usuário" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async updateType(request: Request, response: Response){
      try { 
        var idUsuario = request.body['id'];
        var tipo = request.body['tipo'];
        var diretorio = request.body['diretorio'];
        this.userRepository.metadata.tablePath = diretorio + ".USERS"; 
        this.userRepository.metadata.tableMetadataArgs.schema = diretorio; 
        var resp = await this.userRepository

        .query(`UPDATE "`+diretorio+`"."USERS"
                       SET "TYPE" = `+tipo+`
                       WHERE "ID" = ` + idUsuario+`
                `); 
        if (!resp || resp.length === 0) return { message: "Não foi atualizar o tipo de usuário." };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      }
    }

    async remove(request: Request, response: Response){
      try { 
        var diretorio = request.params.diretorio;
        this.userRepository.metadata.tablePath = diretorio + ".USERS"; 
        this.userRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.userRepository
        .createQueryBuilder()
            .delete()
            .from(Usuarios)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar o usuario" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async he(request: Request,  response: Response) { 
        try {
          console.log(request.params.id) 
          return [
            200,
            'OK'
          ]
        } catch (error) {
          response.status(500).send(error);
        }
        
      }  


    getSecondPart(str) {
        return str.split('@')[1].toUpperCase();
      }
    
      getFirstPart(str) {
        return str.split('@')[0].toUpperCase();
      }

}