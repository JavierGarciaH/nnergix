import { Server } from 'node:http';
import supertest from 'supertest';
import initApp from '../../../../../app';

let app: Server;
let client: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  app = await initApp;
  client = supertest(app);
});

afterAll(async () => app.close());

describe('attendanceLog', () => {
  test('GET /?url=amazon&searchDepth=1', async () => {
    const res = await client
      .get('/url');
    expect(res.status).toBe(400);
    expect(typeof res.body).toBe('object');
    expect(res.body.message).toBe('Bad request');
  });
});
