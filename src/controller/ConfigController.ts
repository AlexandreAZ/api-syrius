import { getConnectionOptions, getRepository } from "typeorm";
import { Response } from "express"; 
import config from "../config/config"; 

export class ConfigController { 
     
    async one(response: Response) {
    try {
        const conn = config.ambiente; 
        return conn; 
        } catch (error) {
            console.log(error)
        }  
    }
}