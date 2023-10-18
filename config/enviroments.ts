import * as dotenv from 'dotenv'

class SetEnv {
  userDb: string
  passDb: string
  portDb: number
  portApp: number

  constructor() {
    dotenv.config()
    this.setVariable()
  }

  setVariable(): void {
    //DB
    this.userDb = process.env.USER_DB
    this.passDb = process.env.PASSWORD_DB
    this.portDb = parseInt(process.env.PORT_DB)

    //APP
    this.portApp = parseInt(process.env.PORT_APP)
  }
}

export const configEnv = new SetEnv()