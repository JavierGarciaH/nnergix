import * as dotenv from 'dotenv';
dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './src/config/express';
import MongooseRepository from './src/config/mongoose';


const { NODE_PORT, NODE_ENV } = process.env;

export default (async function () {
  let mongoUri;
  if (NODE_ENV === 'test') {
    const mongoMemory = await MongoMemoryServer.create();
    mongoUri = mongoMemory.getUri('test');
  }
  const mongooseClient = MongooseRepository.getSingleton(mongoUri);
  await mongooseClient.connect();

  const server = app.listen(NODE_PORT, () => {
    console.log(`App listening on port ${NODE_PORT}`);
  });

  async function closeServer() {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    try {
      await mongooseClient.close();
      console.info('Shuted down');
      process.exit(0);
    } catch (err) {
      console.error(`Error shutting down: ${err}`);
      process.exit(1);
    }
  }
  process.on('SIGINT', () => {
    console.log('Closing http server.');
    closeServer();
  });

  process.on('SIGTERM', () => {
    closeServer();
  });
  return server;
}());
