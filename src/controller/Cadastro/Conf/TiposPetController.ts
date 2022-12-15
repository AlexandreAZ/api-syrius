import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { TiposPet } from "../../../entity/Conf/TiposPet";

export class TiposPetController {
    private cadastroRepository = getRepository(TiposPet);

    async getTipos(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CONFTIPOSPET";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upTipo(request: Request, response: Response){
      try {
        var dados = request.body['tipos'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFTIPOSPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);
        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CONFTIPOSPET" 
                SET "BACKGROUND" = '', 
                    "DESCRICAO" = '`+dados['DESCRICAO']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){
          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CONFTIPOSPET"("BACKGROUND", "DESCRICAO") 
                  VALUES ('', '`+dados['DESCRICAO']+`')`)
         } 

        resp = dados;
        if (!resp) return { message: "Não foi possivel atualizar Tipo de Pet" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delTipo(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFTIPOSPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(TiposPet)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar o Tipo de Pet" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    
    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFTIPOSPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CONFTIPOSPET"`);
        if (!resp) return { message: "Não foi possivel buscar o MAXID Tipos de Pet" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}