
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuarios } from '../entity/Usuarios';

export class UserController {

    private userRepository = getRepository(Usuarios)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const username = request.body['username']; 
        var dir = this.getFirstPart(username)
        var nome =  this.getSecondPart(username);
        this.userRepository.metadata.tablePath = dir + "." + "USERS"; 
        this.userRepository.metadata.tableMetadataArgs.schema = dir 
        
        const user = await this.userRepository.findOne({
            where: { USERNAME: nome }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }


    getSecondPart(str) {
        return str.split('@')[1].toUpperCase();
      }
    
      getFirstPart(str) {
        return str.split('@')[0].toUpperCase();
      }

}