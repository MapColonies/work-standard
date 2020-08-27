import { MCLogger } from '@map-colonies/mc-logger';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { injectable } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class ErrorHandler {
  public constructor(private readonly logger: MCLogger) {}

  public getErrorHandlerMiddleware(): ErrorRequestHandler {
    return (
      err: Error,
      req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ): void => {
      this.logger.error(
        '%s request to %s  has failed with error: %s',
        req.method,
        req.originalUrl,
        err.message
      );
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    };
  }
}
