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

describe('GET url Controller test', () => {
  test('GET url without required url param', async () => {
    const res = await client
      .get('/url');
    expect(res.status).toBe(400);
    expect(typeof res.body).toBe('object');
    expect(res.body.message).toBe('Bad request');
  });

  test('GET url without results', async () => {
    const res = await client
      .get('/url?url=marca&depth=1');
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toStrictEqual([]);
  });

  test('GET url with results', async () => {
    const res = await client
      .get('/url?url=https://marca.com&depth=0');
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.length).toBeGreaterThan(0);
  });
});
