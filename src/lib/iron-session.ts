import { IronSessionOptions } from "iron-session";
import { Config } from "./config";

export const IronSessionConfig: IronSessionOptions = {
  cookieName: 'session',
  password: Config.ironSessionSecret,
  cookieOptions: {
    secure: Config.env === 'production',
  }
};