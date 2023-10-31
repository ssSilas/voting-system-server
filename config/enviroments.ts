import * as dotenv from 'dotenv';

class SetEnv {
  userDb: string;
  passDb: string;
  portDb: number;
  portApp: number;
  salt: string;
  secret: string;
  expireToken: string;

  constructor() {
    dotenv.config();
    this.setVariable();
  }

  setVariable(): void {
    //DB
    this.userDb = process.env.USER_DB;
    this.passDb = process.env.PASSWORD_DB;
    this.portDb = parseInt(process.env.PORT_DB);

    //APP
    this.portApp = parseInt(process.env.PORT_APP);

    //AUTH
    this.salt = process.env.SALT;
    this.secret = process.env.SECRET;
    this.expireToken = process.env.EXPIRE_TOKEN;
  }
}

export const configEnv = new SetEnv();
