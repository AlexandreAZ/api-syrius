import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Porte } from "../../../entity/Conf/Porte";

export class PorteController {
    private cadastroRepository = getRepository(Porte);

    async getPortes(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CONFPORT";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upPorte(request: Request, response: Response){
      try {
        var dados = request.body['porte'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFPORT"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);

        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CONFPORT" 
                SET "BACKGROUND" = '', 
                    "DESCRICAO" = '`+dados['DESCRICAO']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){
          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CONFPORT"("BACKGROUND", "DESCRICAO") 
                  VALUES ('', '`+dados['DESCRICAO']+`')`)
         } 

        resp = dados;
        if (!resp) return { message: "Não foi possivel atualizar o Porte" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delPorte(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFPORT"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Porte)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar o Porte" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFPORT"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CONFPORT"`);
        if (!resp) return { message: "Não foi possivel buscar o MAXID dos Portes" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}