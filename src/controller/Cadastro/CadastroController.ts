import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Cadastro } from "../../entity/Cadastro";

export class CadastroController {
    private cadastroRepository = getRepository(Cadastro);

    async getPets(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CADPET";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository.find();
        
        if (!resp) return { message: "PETs não encontrados" };
        return resp;
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async getPetsByStatus(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CADPET";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository
        .query(` SELECT * FROM "`+request.body['diretorio']+`"."CADPET" 
                 WHERE "STATUS" = 'DISPONIVEL' `);
        
        if (!resp || resp.length === 0) return { message: "Nenhum PET encontrado" };
        return resp;
      } catch (error) {
        response.status(500).send(error);
      } 
    }

    async getPetID(request: Request, response: Response) {

      try { 
        this.cadastroRepository.metadata.tablePath = request.body['diretorio'] + ".CADPET";
        this.cadastroRepository.metadata.tableMetadataArgs.schema = request.body['diretorio'];
   
        var resp = await this.cadastroRepository
        .findOneBy({ ID: parseInt(request.params.id)});
    
        if (!resp) return { message: "PET não encontrado" };
        return resp;
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      } 
    }

    async upStatus(request: Request, response: Response){
      try {
        var id = request.body['id'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //console.log(diretorio);

        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CADPET" 
                SET "STATUS" = '` +request.body['status']+`'
                WHERE "ID" = ` + id)
        
        if (!resp || resp.length === 0) return { message: "Não foi possivel atualizar o PET" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }


    async upAvatar(request: Request, response: Response){
      try {
        var id = request.body['id'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        

        //console.log(diretorio);

        /*var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CADPET" 
                SET "AVATAR" = 
                WHERE "ID" = ` + id)
        
        if (!resp || resp.length === 0) return { message: "Não foi possivel atualizar o PET" };
        return resp; */
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async upPet(request: Request, response: Response){
      try {
        var dados = request.body['pet'];
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + "."+ "CADPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        //var resp = await this.cadastroRepository.save(dados);

        /*console.log(`UPDATE "`+diretorio+`"."CADPET" 
        SET "AVATAR" = '`+dados['AVATAR']+`', 
            "NOME" = '`+dados['NOME']+`', 
            "PAI" = '`+dados['PAI']+`',
            "MAE" = '`+dados['MAE']+`',
            "TIPO" = '`+dados['TIPO']+`',
            "RACA" = '`+dados['RACA']+`',
            "SEXO" = '`+dados['SEXO']+`',
            "CASTRADO" = '`+dados['CASTRADO']+`',
            "NASCIMENTO" = '`+dados['NASCIMENTO']+`',
            "COR" = '`+dados['COR']+`',
            "OLHOS" = '`+dados['OLHOS']+`',
            "PELAGEM" = '`+dados['PELAGEM']+`',
            "PORTE" = '`+dados['PORTE']+`',
            "TEMPERAMENTO" = '`+dados['TEMPERAMENTO']+`',
            "FALECIDO" = '`+dados['FALECIDO']+`',
            "ADOTADO" = '`+dados['ADOTADO']+`',
            "STATUS" = (CASE WHEN '`+dados['ADOTADO']+`' = 'SIM' THEN 'ADOTADO' ELSE 'DISPONIVEL' END)
        WHERE "ID" = ` + dados['ID']);*/

        var resp = await this.cadastroRepository
        .query(`UPDATE "`+diretorio+`"."CADPET" 
                SET "AVATAR" = '`+dados['AVATAR']+`', 
                    "NOME" = '`+dados['NOME']+`', 
                    "PAI" = '`+dados['PAI']+`',
                    "MAE" = '`+dados['MAE']+`',
                    "TIPO" = '`+dados['TIPO']+`',
                    "RACA" = '`+dados['RACA']+`',
                    "SEXO" = '`+dados['SEXO']+`',
                    "CASTRADO" = '`+dados['CASTRADO']+`',
                    "NASCIMENTO" = '`+dados['NASCIMENTO']+`',
                    "COR" = '`+dados['COR']+`',
                    "OLHOS" = '`+dados['OLHOS']+`',
                    "PELAGEM" = '`+dados['PELAGEM']+`',
                    "PORTE" = '`+dados['PORTE']+`',
                    "TEMPERAMENTO" = '`+dados['TEMPERAMENTO']+`',
                    "FALECIDO" = '`+dados['FALECIDO']+`',
                    "ADOTADO" = '`+dados['ADOTADO']+`',
                    "STATUS" = (CASE WHEN '`+dados['ADOTADO']+`' = 'SIM' THEN 'ADOTADO' ELSE 'DISPONIVEL' END)
                WHERE "ID" = ` + dados['ID'])

         if(resp[1]==0){


         var sql = `INSERT INTO "`+diretorio+`"."CADPET"
         ("BACKGROUND", "AVATAR", "NOME", "PAI", "MAE", "TIPO", "RACA", "CASTRADO", "NASCIMENTO", 
           "COR", "OLHOS", "PELAGEM", "PORTE", "TEMPERAMENTO", "FALECIDO", "ADOTADO", "STATUS") 
         VALUES ('`+dados['BACKGROUND']+`','`+dados['AVATAR']+`',
                 '`+dados['NOME']+`','`+dados['PAI']+`',
                 '`+dados['MAE']+`', '`+dados['TIPO']+`',
                 '`+dados['RACA']+`', '`+dados['CASTRADO']+`',
                 '`+dados['NASCIMENTO']+`', '`+dados['COR']+`',
                 '`+dados['OLHOS']+`', '`+dados['PELAGEM']+`',
                 '`+dados['PORTE']+`', '`+dados['TEMPERAMENTO']+`',
                 '`+dados['FALECIDO']+`', '`+dados['ADOTADO']+`',
                  (CASE WHEN '`+dados['ADOTADO']+`' = 'SIM' THEN 'ADOTADO' ELSE 'DISPONIVEL' END))`

          //console.log(sql)

          var resp = await this.cadastroRepository.query(sql)
         } 

        resp = dados
        
        if (!resp) return { message: "Não foi possivel atualizar o PET" };
        return resp; 
      } catch (error) {
        console.log(error)
        response.status(500).send(error);
      } 
    }

    async delPet(request: Request, response: Response){
      try {
        //console.log(request.params);
        var diretorio = request.params.diretorio;
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        
        /*let petToRemove = await this.cadastroRepository.findOne(request.body['params'].id);
        var resp  = await this.cadastroRepository.remove(petToRemove);*/

        var resp  = await this.cadastroRepository
        .createQueryBuilder()
            .delete()
            .from(Cadastro)
            .where("ID = :id", { id: request.params.id })
            .execute()
        if (!resp) return { message: "Não foi deletar pet" };
        return resp;
       } catch (error) {
          console.log(error)
          response.status(500).send(error);
       }
    }

    async getMAxID(request: Request, response: Response){
       try {
        var diretorio = request.body['diretorio'];
        this.cadastroRepository.metadata.tablePath = diretorio + ".CADPET"; 
        this.cadastroRepository.metadata.tableMetadataArgs.schema = diretorio;
        var resp = await this.cadastroRepository.
        query(`SELECT MAX("ID") as maxid FROM "`+ diretorio +`"` + `.`+`"CADPET"`);
        if (!resp) return { message: "Não foi possivel pegar o MAXID" };
        return resp;
       } catch (error) {
         console.log(error)
         response.status(500).send(error);
       }
    }
}