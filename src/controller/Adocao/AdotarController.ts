import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Adocao } from "../../entity/Adocao";

export class AdotarController {
    private cadastroRepository = getRepository(Adocao);

    async getAdocoes(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".ADOCAO";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository
        .query(`SELECT A.*, 
                B."AVATAR" AS "AAVATAR",
                P."AVATAR" AS "PAVATAR" 
                FROM "ONGADM"."ADOCAO" A
                INNER JOIN  "ONGADM"."CADADOT" B ON A."ADOTANTE_ID" = B."ID"
                INNER JOIN  "ONGADM"."CADPET" P ON A."PET_ID" = P."ID" `);
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upAdocao(request: Request, response: Response){
      try {
        var dados = request.body['adocao'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".ADOCAO"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);

        var sql = `INSERT INTO "`+diretorio+`"."ADOCAO"
        ("BACKGROUND", "ADOTANTE", "PET", "DTADOCAO", "STATUS", "ADOTANTE_ID", "PET_ID") 
        VALUES ('`+dados['BACKGROUND']+`','`+dados['ADOTANTE']+`', '`+dados['PET']+`',
                '`+dados['DTADOCAO']+`', '`+dados['STATUS']+`', '`+dados['ADOTANTE_ID']+`', 
                '`+dados['PET_ID']+`')`

         //console.log(sql)
         
         var resp = await this.cadastroRepository.query(sql);

         resp = dados

         console.log(resp)

        if (!resp) return { message: "Não foi possivel atualizar  a adoção" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delAdocao(request: Request, response: Response){
      try {
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".ADOCAO"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Adocao)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar a adoção" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".ADOCAO"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"ADOCAO"`);
        if (!resp) return { message: "Não foi possivel buscat o MAXID da adoção" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}