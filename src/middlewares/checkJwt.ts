import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  try {
    
     jwtPayload = <any>(
      jwt.verify(token.replace("Bearer ", ""), config.jwtSecret)
    );
    res.locals.jwtPayload = jwtPayload;  
  } catch (error) {
    res.status(401).send({message: error});
    return;
  }
  next();
};
