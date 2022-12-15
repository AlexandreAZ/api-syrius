import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Sexos } from "../../../entity/Conf/Sexos";

export class SexosController {
    private cadastroRepository = getRepository(Sexos);

    async getSexos(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CONFSEXO";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upSexo(request: Request, response: Response){
      try {
        var dados = request.body['sexo'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFSEXO"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);
        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CONFSEXO" 
                SET "BACKGROUND" = '', 
                    "DESCRICAO" = '`+dados['DESCRICAO']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){
          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CONFSEXO"("BACKGROUND", "DESCRICAO") 
                  VALUES ('', '`+dados['DESCRICAO']+`')`)
         } 

        resp = dados;
        if (!resp) return { message: "Não foi possivel atualizar o Sexo" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delSexo(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFSEXO"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Sexos)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar o Sexo" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFSEXO"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CONFSEXO"`);
        if (!resp) return { message: "Não foi possivel buscar o MAXID dos Sexos" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}