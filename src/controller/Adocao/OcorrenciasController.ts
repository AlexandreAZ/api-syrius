import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Ocorrencias } from "../../entity/Ocorrencias";

export class OcorrenciasController {

    private ocorrenciaRepository = getRepository(Ocorrencias);

    async getOcorrencias(request: Request, response: Response) {

        try { 
          this.ocorrenciaRepository.metadata.tablePath = request.body['diretorio'] + ".OCORRENCIAS";
          this.ocorrenciaRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
     
          var resp = await this.ocorrenciaRepository.find()
          
          if (!resp || resp.length === 0) return [];
          return resp;
        } catch (error) {
          console.log(error)
          response.status(500).send(error);
        } 
    }

    async adotante(request: Request, response: Response) {
        try {
          this.ocorrenciaRepository.metadata.tablePath = request.body['diretorio'] + ".OCORRENCIAS";
          this.ocorrenciaRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
          
          var resp = await this.ocorrenciaRepository.findBy(
            { ADOTANTE_ID: parseInt(request.params.id)}
            ); 
  
          if (!resp) return { message: "Ocorrência não encontrada" };
          return resp;
        } catch (error) {
          console.log(error)
          response.status(500).send(error);
        }
    }

    async upOcorrencia(request: Request, response: Response){
        try {
          var dados = request.body['ocorrencia'];
          var diretorio = request.body['diretorio'];
          this.ocorrenciaRepository.metadata.tablePath = diretorio + ".OCORRENCIAS"; 
          this.ocorrenciaRepository.metadata.tableMetadataArgs.schema = diretorio;
   
          var resp = await this.ocorrenciaRepository
          .query(`INSERT INTO "`+diretorio+`"."OCORRENCIAS"
                  ("MOTIVO", "DESCRICAO", "ADOTANTE_ID") 
                  VALUES ('`+dados['MOTIVO']+`','`+dados['DESCRICAO']+`','`+dados['ADOTANTE_ID']+`')`)
          
          resp = dados
          
          if (!resp || resp.length === 0) return { message: "Não foi possivel atualizar a Ocorrência" };
          return resp; 
        } catch (error) {
          console.log(error)
          response.status(500).send(error);
        } 
    }
    async delOcorrencia(request: Request, response: Response){
        try {
         // console.log(request.params);
          var diretorio = request.params.diretorio;
          this.ocorrenciaRepository.metadata.tablePath = diretorio + ".OCORRENCIAS"; 
          this.ocorrenciaRepository.metadata.tableMetadataArgs.schema = diretorio;
  
          var resp  = await this.ocorrenciaRepository
          .createQueryBuilder()
              .delete()
              .from(Ocorrencias)
              .where("ID = :id", { id: request.params.id })
              .execute()
          if (!resp) return { message: "Não foi deletar a ocorrência" };
          return resp;
         } catch (error) {
            console.log(error)
            response.status(500).send(error);
         }
    }

    async getMAxID(request: Request, response: Response){
      try {
       var diretorio = request.body['diretorio'];
       this.ocorrenciaRepository.metadata.tablePath = diretorio + ".OCORRENCIAS"; 
       this.ocorrenciaRepository.metadata.tableMetadataArgs.schema = diretorio;
       var resp = await this.ocorrenciaRepository.
       query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"OCORRENCIAS"`);
       if (!resp) return { message: "Não foi possivel buscar o MAXID das OCORRENCIAS" };
       return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      }
   }
}