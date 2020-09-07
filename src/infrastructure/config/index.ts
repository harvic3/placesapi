import * as dotenv from "dotenv";
import * as firebaseCreds from "../../fbCreds.json";
if (!process?.env?.NODE_ENV) {
  dotenv.config();
}

const dev = "development";

export default {
  env: process.env.NODE_ENV || dev,
  server: {
    root: process.env.SERVER_ROOT || "/api",
    host: process.env.SERVER_HOST || "localhost",
    healthPath: process.env.HEALTH_PATH || "/ping",
    port: process.env.SERVER_PORT || 3003,
    origins:
      process.env.ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002",
  },
  firebase: {
    credentials: firebaseCreds,
    db_url: process.env.FIREBASE_DB_URL || null,
    Auth_Url: process.env.FIREBASE_AUTH_URL || null,
    Auth_Key: process.env.FIREBASE_AUTH_KEY || null,
  },
  params: {
    envs: {
      dev,
      pdn: "production",
      test: "testing",
    },
    defaultError: {
      code: 500,
      resourceMessage: "SOMETHING_WENT_WRONG",
    },
    defaultLang: process.env.DEFAULT_LANGUAGE || "en",
    requestRate: process.env.RATE_REQUEST || 120,
    requestDataLimit: process.env.REQUEST_DATA_LIMIT || "10kb",
  },
};
