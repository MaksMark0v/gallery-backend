import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import userController from '../src/controllers/userController.js';

const API_PORT = 5002;
const app = express();

app.use(cookieParser());

app.use(userController);

app.disable("x-powered-by");
app.use(helmet({
    xPoweredBy: false,
  }));

app.listen(API_PORT, () => {
  console.log(`Server running at http://localhost:${API_PORT}/`);
});
