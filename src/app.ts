import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { v2 } from 'cloudinary';
import cookieParser from 'cookie-parser';
import { connect, ConnectOptions, set } from 'mongoose';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {
  CLOUD_API_KEY,
  CLOUD_NAME,
  CLOUD_API_SECRET,
  CREDENTIALS, NODE_ENV, ORIGIN, PORT,
} from './config/env.config';
import { Routes } from './interfaces/routes.interface';
import { logger, stream } from './utils/logger';
import errorMiddleware from './middlewares/error.middleware';

import { dbConnection } from './config/database.config';

class App {
  public app: express.Application;

  public env: string;

  public port: string | number;

  public origin: string[];

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.origin = ORIGIN.split(',').map((origin) => origin.trim());

    this.connectToDatabase();
    this.connectToCloudinary();
    this.initializeSwagger();
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
    if (this.env === 'development') {
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
    this.app.use(morgan('combined', { stream }));
    this.app.use(cors(this.initalizeCorsOptions()));
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initalizeCorsOptions() {
    const whitelist = this.origin;
    return {
      origin(origin, cb) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          cb(new Error('Not Allowed Origin'));
        }
      },
      credentials: CREDENTIALS,
    };
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }
}

export default App;
