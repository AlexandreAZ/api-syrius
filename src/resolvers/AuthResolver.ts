import { Resolver, Arg, Query } from "type-graphql";
import { Auth, AuthSuccess } from "../entity/Auth";
import * as isEmail from "isemail";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../config/config";

@Resolver()
export class AuthResolver {
  @Query(() => AuthSuccess)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const auth = await Auth.findOne({ where: { USERNAME: username } });
    if (isEmail.validate(username) && auth) {
      const resultado = await bcrypt.compare(password, auth.PASSWORD);
      if (resultado && auth.ENABLED ===1) {
        const token = this.generateToken(auth);
        //const device = await Devices.findOne({ where: { USERNAME: username } });
        const resp = {
          USERNAME: auth.USERNAME,
          TOKEN: token,
          ///BIN: device.BIN,
         // SHOPCODE: device.SHOPCODE,
        };
        return resp;
      }
    }
    throw new Error("Usário ou senha inválidos.");
  }
  private generateToken(user) {
    const token = jwt.sign(
      {
        data: user,
      },
      config.jwtSecret,
      { expiresIn: 60 * 60 }
    );
    return token;
  }
}
