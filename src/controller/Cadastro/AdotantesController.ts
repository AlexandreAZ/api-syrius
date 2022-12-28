import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Adotantes } from "../../entity/Adotantes";

export class AdotantesController {
    private cadastroRepository = getRepository(Adotantes);

    async getAdotantes(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CADADOT";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp || resp.length === 0) return [];
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async one(request: Request, response: Response) {
      try {
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CADADOT";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
        
        var resp = await this.cadastroRepository.findOneBy({ ID: parseInt(request.params.id)}); 

        if (!resp) return { message: "adotante não encontrado" };
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      }
    }

    async upAdotante(request: Request, response: Response){
      try {
        var dados = request.body['adotante'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADADOT"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);

        //console.log(dados)

        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CADADOT" 
                SET "NOME" = '`+dados['NOME']+`',
                    "BACKGROUND" = '`+dados['BACKGROUND']+`',
                    "TELEFONE" = '`+dados['TELEFONE']+`',
                    "CELULAR" = '`+dados['CELULAR']+`',
                    "CEP" = '`+dados['CEP']+`',
                    "ENDERECO" = '`+dados['ENDERECO']+`',
                    "CIDADE" = '`+dados['CIDADE']+`',
                    "BAIRRO" = '`+dados['BAIRRO']+`',
                    "UF" = '`+dados['UF']+`',
                    "NUMERO" = '`+dados['NUMERO']+`',
                    "EMAIL" = '`+dados['EMAIL']+`'
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){

          var resp = await this.cadastroRepository
          .query(`INSERT INTO "`+diretorio+`"."CADADOT"
          ("BACKGROUND", "NOME", "TELEFONE", "CELULAR", "CEP", "ENDERECO", "CIDADE", 
           "BAIRRO", "UF", "NUMERO", "EMAIL") 
          VALUES ('`+dados['BACKGROUND']+`',
                  '`+dados['NOME']+`', '`+dados['TELEFONE']+`',
                  '`+dados['CELULAR']+`', '`+dados['CEP']+`',
                  '`+dados['ENDERECO']+`', '`+dados['CIDADE']+`', 
                  '`+dados['BAIRRO']+`','`+dados['UF']+`',
                  '`+dados['NUMERO']+`', '`+dados['EMAIL']+`')`)
         } 

        resp = dados
        
        if (!resp || resp.length === 0) return { message: "Não foi possivel atualizar o Adotante" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delAdotante(request: Request, response: Response){
      try {
        console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADADOT"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Adotantes)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar o Adotante" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADADOT"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CADADOT"`);
        if (!resp) return { message: "Não foi possivel buscat o MAXID do adotante" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}