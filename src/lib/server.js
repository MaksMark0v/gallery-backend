import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import userController from '../controllers/userController.js';
import { runMigrations  } from './migration.js';

import sequelize, { isDbConnectionInited } from './db.js';

const API_PORT = 5002;

export async function createServer() {
  const app = express();
  app.use(cookieParser());
  
  app.use(userController);
  
  app.disable('x-powered-by');
  app.use(
    helmet({
      xPoweredBy: false
    })
  );

  if (isDbConnectionInited) {
    await runMigrations(sequelize);
  }
  
  app.listen(API_PORT, () => {
    console.log(`Server running at port ${API_PORT}`);
  });
}
