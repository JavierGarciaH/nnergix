// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Router, Request, Response } from 'express';
import { GetUrlController } from './queries/getUrl/getUrl.controller';

const router = Router();

const getUrlController = new GetUrlController();

router.get('/url', (req: Request, res: Response) => {
  getUrlController.execute(req, res);
});

export default router;