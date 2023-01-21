import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Parceiros } from "../../entity/Parceiros";

export class ParceirosController {
    private parceirosRepository = getRepository(Parceiros);

    async getParceiros(request: Request, response: Response) {

      try { 
        this.parceirosRepository.metadata.tablePath = request.body['diretorio'] + ".CADPARC";
        this.parceirosRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.parceirosRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        response.status(500).send(error);
      } 
    }

    async upParceiro(request: Request, response: Response){
      try {
        var dados = request.body['parceiro'];
        var diretorio = request.body['diretorio'];
        this.parceirosRepository.metadata.tablePath = diretorio + ".CADPARC"; 
        this.parceirosRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.parceirosRepository.save(dados);

        //console.log(dados)

        var resp = await this.parceirosRepository
        .query(`UPDATE "`+diretorio+`"."CADPARC" 
                SET "NOME" = '`+dados['NOME']+`',`
                    +((dados['AVATAR']) ? `"AVATAR" = '`+dados['AVATAR']+`',`: `"AVATAR" = NULL,`)+` 
                    "BACKGROUND" = '`+dados['BACKGROUND']+`',
                    "TELEFONE" = '`+dados['TELEFONE']+`',
                    "CNPJ" = '`+dados['CNPJ']+`',
                    "CEP" = '`+dados['CEP']+`',
                    "ENDERECO" = '`+dados['ENDERECO']+`',
                    "CIDADE" = '`+dados['CIDADE']+`',
                    "BAIRRO" = '`+dados['BAIRRO']+`',
                    "UF" = '`+dados['UF']+`',
                    "NUMERO" = '`+dados['NUMERO']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){

          var resp = await this.parceirosRepository
          .query(`INSERT INTO "`+diretorio+`"."CADPARC"
          ("BACKGROUND", "AVATAR", "NOME", "TELEFONE","CNPJ", "CEP", "ENDERECO", "CIDADE", "BAIRRO", "UF", "NUMERO") 
          VALUES ('`+dados['BACKGROUND']+`',`+((dados['AVATAR']) ? `'`+dados['AVATAR']+`',`: null)+`,
                  '`+dados['NOME']+`', '`+dados['TELEFONE']+`', '`+dados['CNPJ']+`', '`+dados['CEP']+`', 
                  '`+dados['ENDERECO']+`','`+dados['CIDADE']+`', '`+dados['BAIRRO']+`','`+dados['UF']+`',
                  '`+dados['NUMERO']+`')`)
         } 

        resp = dados
        
        if (!resp || resp.length === 0) return { message: "Não foi possivel atualizar o parceiro" };
        return resp; 
      } catch (error) {
        response.status(500).send(error);
      } 
    }

    async delParceiro(request: Request, response: Response){
      try {
        var diretorio = request.params.diretorio;
        this.parceirosRepository.metadata.tablePath = diretorio + ".CADPARC"; 
        this.parceirosRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.parceirosRepository
        .createQueryBuilder()
            .delete()
            .from(Parceiros)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar parceiro" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
        try {
         var diretorio = request.body['diretorio'];
         this.parceirosRepository.metadata.tablePath = diretorio + ".CADPARC"; 
         this.parceirosRepository.metadata.tableMetadataArgs.schema = diretorio;
         var resp = await this.parceirosRepository.
         query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CADPARC"`);
         if (!resp) return { message: "Não foi possivel encontrar o ID" };
         return resp;
        } catch (error) {
          response.status(500).send(error);
        }
     }
}