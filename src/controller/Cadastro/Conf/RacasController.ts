import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Racas } from "../../../entity/Conf/Racas";

export class RacasController {
    private cadastroRepository = getRepository(Racas);

    async getRacas(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CONFRACA";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async getRacaID(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CONFRACA";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository
        .findOneBy({ ID: parseInt(request.params.id)});
    
        if (!resp) return { message: "Raça não encontrada" };
        return resp;
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      } 
    }

    async upRaca(request: Request, response: Response){
      try {
        var dados = request.body['raca'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFRACA"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        //var resp = await this.cadastroRepository.save(dados);

        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CONFRACA" 
                SET "BACKGROUND" = '', 
                    "DESCRICAO" = '`+dados['DESCRICAO']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){
          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CONFRACA"("BACKGROUND", "DESCRICAO") 
                  VALUES ('', '`+dados['DESCRICAO']+`')`)
         } 

        resp = dados;
        if (!resp) return { message: "Não foi possivel atualizar a Raça" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delRaca(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CONFRACA"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Racas)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar a Raça" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + "." + "CONFRACA"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CONFRACA"`);
        if (!resp) return { message: "Não foi possivel buscar o MAXID das Racas" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}