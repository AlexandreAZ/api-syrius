import { getConnectionOptions, getRepository } from "typeorm";
import { Request, Response } from "express"; 
import config from "../config/config"; 
import { Configuracoes } from "../entity/Configuracoes";

export class ConfigController { 

    private confRepository = getRepository(Configuracoes);

    async one(response: Response) {
    try {
        const conn = config.ambiente; 
        return conn; 
        } catch (error) {
            console.log(error)
        }  
    }

    async acessos(request: Request, response: Response){
        try {
          var diretorio = 'ADM';
          this.confRepository.metadata.tablePath = diretorio + ".CLIENTES"; 
          this.confRepository.metadata.tableMetadataArgs.schema = diretorio;
          
          var resp = await this.confRepository.findOneBy({
             ID: parseInt(request.params.id)
          });

          if (!resp) return { message: "Acessos não encontrato." };
          return resp;

        } catch (error) {
            response
            .status(401)
            .send({ message: "Quantidade de acessos." });
          }
    }


}