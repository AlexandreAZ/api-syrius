import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Estabelecimentos } from "../../entity/Estabelecimentos";

export class EstabelecimentosController {
    private cadastroRepository = getRepository(Estabelecimentos);

    async getEstabelecimentos(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CADEST";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upEst(request: Request, response: Response){
      try {
        var dados = request.body['est'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADEST"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);

        console.log(dados)

        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CADEST" 
                SET "NOME" = '`+dados['NOME']+`',
                    "BACKGROUND" = '`+dados['BACKGROUND']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){

          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CADEST"
                 ("BACKGROUND", "NOME") 
                 VALUES ('`+dados['BACKGROUND']+`','`+dados['NOME']+`')`)
         } 

        resp = dados
        
        if (!resp || resp.length === 0) return { message: "Não foi possivel atualizar o Estabelecimento" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delEst(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADEST"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Estabelecimentos)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar o Estabelecimento" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADEST"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CADEST"`);
        if (!resp) return { message: "Não foi possivel buscar o MAXID dos estabelecimentos" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}