import express from 'express';
import { initAsync as validatorInit } from 'openapi-validator-middleware';
import { MCLogger } from '@map-colonies/mc-logger';
import { injectable } from 'tsyringe';
import { helloWorldController } from './controllers/helloWorld';
import { SwaggerController } from './controllers/swagger';
import { RequestLogger } from './middleware/RequestLogger';
import { ErrorHandler } from './middleware/ErrorHandler';

@injectable()
export class ServerBuilder {
  private readonly serverInstance = express();

  public constructor(
    private readonly logger: MCLogger,
    private readonly swaggerController: SwaggerController,
    private readonly requestLogger: RequestLogger,
    private readonly errorHandler: ErrorHandler
  ) {
    this.serverInstance = express();
  }

  public async build(): Promise<express.Application> {
    //initiate swagger validator
    await validatorInit('./api/swagger.yaml');

    this.registerMiddleware();
    this.registerControllers();

    return this.serverInstance;
  }

  private registerControllers(): void {
    this.serverInstance.use(this.swaggerController.getRouter());
    this.serverInstance.use('/helloworld', helloWorldController);
  }

  private registerMiddleware(): void {
    this.serverInstance.use(this.requestLogger.getLoggerMiddleware());
    this.serverInstance.use(this.errorHandler.getErrorHandlerMiddleware());
  }
}
