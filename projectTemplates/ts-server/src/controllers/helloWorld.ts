import { Router, Request, Response } from 'express';
import { validate } from 'openapi-validator-middleware';
import httpStatus from 'http-status-codes';

const router = Router();

router.get('/', validate, (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json({ hello: 'world' });
});

export { router as helloWorldController };
