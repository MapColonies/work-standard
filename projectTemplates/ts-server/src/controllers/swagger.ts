import swaggerUi from 'swagger-ui-express';
import { get } from 'config';
import { MCLogger } from '@map-colonies/mc-logger';
import { Request, Response, Router, IRouter } from 'express';
import { load } from 'yamljs';
import { injectable } from 'tsyringe';

@injectable()
export class SwaggerController {
  private readonly swaggerConfig: {
    jsonPath: string;
    uiPath: string;
  };

  private readonly swaggerDoc: swaggerUi.JsonObject;
  private readonly router = Router();

  public constructor(private readonly logger: MCLogger) {
    this.swaggerConfig = get('swagger');
    // load swagger object from file
    this.swaggerDoc = load('./api/swagger.yaml') as swaggerUi.JsonObject;
    this.init();
  }

  public getRouter(): IRouter {
    return this.router;
  }

  private init(): void {
    // register swagger ui handler
    const swaggerJsonPath = this.swaggerConfig.jsonPath;
    if (swaggerJsonPath && swaggerJsonPath !== '') {
      this.router.get(swaggerJsonPath, (req: Request, res: Response) => {
        res.json(this.swaggerDoc);
      });
    }
    const swaggerPath = this.swaggerConfig.uiPath;
    // register swagger json handler
    this.router.use(
      swaggerPath,
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDoc)
    );
    this.logger.info(`added swagger at ${swaggerPath}`);
  }
}
