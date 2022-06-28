/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Express {
  interface Request {
    log?: any;
    id?: any;
    user?: any;
    authorization: {
      realmId: string | undefined;
      ticketId: string | undefined;
      intuitId: string | undefined;
    };
  }
}

declare namespace NodeJS {
  interface Global {
    factory: any;
    sequelize: any;
    REDIS_CONNECTED: boolean;
  }
}
