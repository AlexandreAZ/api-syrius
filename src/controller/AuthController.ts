import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Auth } from "../entity/Auth";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto-js";
import config from "../config/config"; 

export class AuthController {
  private authRepository = getRepository(Auth);

  private readonly _secret: any = config.jwtSecret;
  
  async login(request: Request, response: Response){ 

    try {
      
    const username = request.body.username;
    const password = request.body.password;

    var user;
    var dir = this.getFirstPart(username)
    var nome =  this.getSecondPart(username);
    this.authRepository.metadata.tablePath = dir + "." + "USERS"; 
    this.authRepository.metadata.tableMetadataArgs.schema = dir 

    user = await this.authRepository.findOne({
      where: { USERNAME: nome },
    }); 

    let resultado = false;
    if(user){
        if (user.TYPE === 0) {

          let resultado;
          if (user.PASSWORD === this.encSenha(password)) {
            resultado = true;
          } else {
            resultado = false; 
          }
          if (resultado && user.ENABLED === 1 && user.TYPE === 0) {
            const token = await this._generateJWTToken();
            return [
                  200,
                  {
                      user       : user,
                      username   : username,
                      accessToken: token,
                      tokenType  : 'bearer'
                  }
              ];
          } else {
            response.status(401).send({ message: "Usuário ou senha inválidos." });
          }
        } else {
        response.status(401).send({ message: "Usuário não encontrado." });
        }
      }  else {
        response.status(401).send({ message: "Usuário não encontrado." });
      }
  
    } catch (error) {
      response
              .status(401)
              .send({ message: "Cliente não encontrado." });
    }
  }


  getSecondPart(str) {
    return str.split('@')[1].toUpperCase();
  }

  getFirstPart(str) {
    return str.split('@')[0].toUpperCase();
  }

  private encSenha(senhaReq) {
    senhaReq = this.strToUtf16Bytes(senhaReq);
    senhaReq += 5827348;
    senhaReq = senhaReq % 10000000;
    return senhaReq.toString();
  }

  strToUtf16Bytes(str) {
    let bytes = 0; 
    for (var ii = 0; ii < str.length; ii++) {
      const code = str.charCodeAt(ii); // x00-xFFFF
      bytes += code;
    }
    return bytes;
  }
 
  private generateToken(user) {
    const token = jwt.sign(
      {
        data: user,
      },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    return token;
  }

  // -----------------------------------------------------------------------------------------------------
        // @ Verify and refresh the access token - POST
        // -----------------------------------------------------------------------------------------------------

    async refreshToken(request: Request, response: Response){
      try {

        const username = request.body.username; 
        const accessToken = request.body.accessToken;
        let user;
          var dir = this.getFirstPart(username)
          var nome =  this.getSecondPart(username);
          this.authRepository.metadata.tablePath = dir + "." + "USERS"; 
          this.authRepository.metadata.tableMetadataArgs.schema = dir 

          user = await this.authRepository.findOne({
            where: { USERNAME: nome },
          });

          // Verify the token
          if ( this._verifyJWTToken(accessToken) )
          {
              return [
                  200,
                  {
                      user       : user,
                      username   : username,
                      accessToken: this._generateJWTToken(),
                      tokenType  : 'bearer'
                  }
              ];
          }

          // Invalid token
          return [
              401,
              {
                  error: 'Invalid token'
              }
          ];
      } catch (error) {

        response.status(500).append(error);
        
      }
    }

  // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     */
     private _base64url(source: any): string
     {
         // Encode in classical base64
         let encodedSource = crypto.enc.Base64.stringify(source); 
           
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');
        
        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
    
        
 
         // Return the base64 encoded string
         return encodedSource;
     }
 
     /**
      * Generates a JWT token using CryptoJS library.
      *
      * This generator is for mocking purposes only and it is NOT
      * safe to use it in production frontend applications!
      *
      * @private
      */
      private _generateJWTToken(): string
      {
          // Define token header
          const header = {
              alg: 'HS256',
              typ: 'JWT'
          };
  
          // Calculate the issued at and expiration dates
          const date = new Date();
          const iat = Math.floor(date.getTime() / 1000);
          const exp = Math.floor((date.setDate(date.getDate() + 7)) / 1000);
  
          // Define token payload
          const payload = {
              iat: iat,
              iss: 'Fuse',
              exp: exp
          };
  
          // Stringify and encode the header
          const stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(header));
          const encodedHeader = this._base64url(stringifiedHeader);
  
          // Stringify and encode the payload
          const stringifiedPayload = crypto.enc.Utf8.parse(JSON.stringify(payload));
          const encodedPayload = this._base64url(stringifiedPayload);
  
          // Sign the encoded header and mock-api
          let signature: any = encodedHeader + '.' + encodedPayload;
           
          signature = crypto.HmacSHA256(signature, this._secret); 
          signature = this._base64url(signature);

          // Build and return the token
          return encodedHeader + '.' + encodedPayload + '.' + signature;
      }
 
     /**
      * Verify the given token
      *
      * @param token
      * @private
      */
     private _verifyJWTToken(token: string): boolean
     {
         // Split the token into parts
         const parts = token.split('.');
         const header = parts[0];
         const payload = parts[1];
         const signature = parts[2];
 
         let signatures: any = header + '.' + payload;
           
         signatures = crypto.HmacSHA256(signatures, this._secret); 
         signatures = this._base64url(signatures);

         // Re-sign and encode the header and payload using the secret
         const signatureCheck = signatures;
 
         // Verify that the resulting signature is valid
         return (signature === signatureCheck);
     }
} 
