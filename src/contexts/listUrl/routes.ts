import { Router, Request, Response } from 'express';
import { GetUrlController } from './queries/getUrl/getUrl.controller';

const router = Router();

const getUrlController = new GetUrlController();

router.get('/', (req: Request, res: Response) => {
  getUrlController.execute(req, res);
});

export default router;