import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Pelagem } from "../../../entity/Conf/Pelagem";

export class PelagemController {
    private cadastroRepository = getRepository(Pelagem);

    async getPelagem(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CONFPELA";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upPelagem(request: Request, response: Response){
      try {
        var dados = request.body['pelagem'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFPELA"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);
        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CONFPELA" 
                SET "BACKGROUND" = '', 
                    "DESCRICAO" = '`+dados['DESCRICAO']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){
          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CONFPELA"("BACKGROUND", "DESCRICAO") 
                  VALUES ('', '`+dados['DESCRICAO']+`')`)
         } 

        resp = dados
        if (!resp) return { message: "Não foi possivel atualizar a Pelagem" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delPelagem(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFPELA"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Pelagem)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar a Pelagem" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFPELA"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CONFPELA"`);
        if (!resp) return { message: "Não foi possivel buscar o MAXID das pelagem" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}