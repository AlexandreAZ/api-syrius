import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import config from "../config/config";  
import { Cadastro } from "../entity/Cadastro";
import * as crypto from "crypto-js";

export const checkRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*const token = <string>req.headers["authorization"];
  var decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);

  console.log(decoded.data);
   
  req.params.diretorio = decoded.data.username */
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  try {
    
     jwtPayload = <any>(
      jwt.verify(token.replace("Bearer ", ""), config.jwtSecret)
    );

    // Stringify and encode the payload
    const stringifiedPayload = crypto.enc.Utf8.parse(JSON.stringify(jwtPayload));
    const encodedPayload = _base64url(stringifiedPayload);

    //res.locals.jwtPayload = jwtPayload; 
    console.log(encodedPayload); 
  } catch (error) {
    res.status(401).send({message: error});
    return;
  }

  
 
  next();
};

function _base64url(source: any): string {
  let encodedSource = crypto.enc.Base64.stringify(source); 
        
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');
  
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  

   // Return the base64 encoded string
   return encodedSource;
}