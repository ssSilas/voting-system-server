import * as dotenv from 'dotenv'

export class ConfigEnv {
  userDb: string
  passDb: string
  portDb: number

  constructor() {
    dotenv.config()
    this.setVariable()
  }

  setVariable(): void {
    this.userDb = process.env.USER_DB
    this.passDb = process.env.PASSWORD_DB
    this.portDb = parseInt(process.env.PORT_DB)
  }
}

export const configEnv = new ConfigEnv()