import { MCLogger } from '@map-colonies/mc-logger';
import { Request, Response, NextFunction, Handler } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class RequestLogger {
  public constructor(private readonly logger: MCLogger) {}

  public getLoggerMiddleware(level = 'debug'): Handler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const body: string =
        req.body !== undefined ? JSON.stringify(req.body) : '';
      this.logger.log(
        level,
        'received %s request on %s \nbody: %s',
        req.method,
        req.originalUrl,
        body
      );
      next();
    };
  }
}
