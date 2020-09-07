import { createConnection, Connection, ConnectionOptions, getConnectionOptions } from "typeorm";

class AdminDataBase {
  private initialized = false;
  connection: Connection;
  Initialize = async (): Promise<boolean> => {
    try {
      if (this.initialized) {
        return this.initialized;
      }
      const connectionOptions: ConnectionOptions = await getConnectionOptions();
      this.connection = await createConnection(connectionOptions);
      this.initialized = true;
    } catch (error) {
      console.log("DATABASE ERROR: ", error);
    }
    return this.initialized;
  };
}

const instance = new AdminDataBase();

export default instance;
