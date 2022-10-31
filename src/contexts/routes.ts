import { Router } from 'express';
import routerListUrl from './listUrl/routes';

const router = Router();

router.use(routerListUrl);

export default router;