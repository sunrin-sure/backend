import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connect, ConnectOptions, set } from 'mongoose';

import {
  CLOUD_API_KEY,
  CLOUD_NAME,
  CLOUD_API_SECRET,
  CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT,
} from '@config/env.config';
import { Routes } from '@interfaces/routes.interface';
import { logger, stream } from '@utils/logger';
import errorMiddleware from '@middlewares/error.middleware';

import { dbConnection } from '@config/database.config';
import { v2 } from 'cloudinary';

class App {
  public app: express.Application;

  public env: string;

  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.connectToCloudinary();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`ENV : ${this.env}`);
      logger.info(`App listening on the port ${this.port}`);

      if (process.send) process.send('ready');
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env === 'debug') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options as ConnectOptions);
  }

  // eslint-disable-next-line
  private connectToCloudinary() {
    v2.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_API_KEY,
      api_secret: CLOUD_API_SECRET,
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }
}

export default App;
