import express, { Express } from 'express';
import router from '../contexts/routes';

const app: Express = express();
app.use(router);

export default app;