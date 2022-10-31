import EventEmitter from 'events';
import mongoose from 'mongoose';

export default class MongooseRepository extends EventEmitter {

  private static instance: MongooseRepository;

  private _client?: mongoose.Connection;
  private _dbOptions?: mongoose.ConnectOptions;
  private _models: { [key: string]: mongoose.Model<any> } = {};

  mongoUri: string;

  private constructor(mongoUri: string, options?: mongoose.ConnectOptions) {
    super();
    this.mongoUri = mongoUri;
    this._dbOptions = options;
  }

  public async connect(): Promise<boolean> {
    try {
      this._client = mongoose.createConnection(this.mongoUri, this._dbOptions);
      return true;
    } catch (err: any) {
      console.error(err.message, err);
      return false;
    }
  }

  get client(): mongoose.Connection | undefined {
    return this._client;
  }

  public async close() {
    await this._client?.close();
  }

  addModel<T>(modelName: string, schema: mongoose.Schema): mongoose.Model<T> | undefined {
    if (!this._client) {
      return;
    }

    const modelCreated: mongoose.Model<T> = this._client.model<T>(modelName, schema);
    this._models[modelName] = modelCreated;
    return modelCreated;
  }

  public static getSingleton(mongoUri?: string): MongooseRepository {
    const { DB_HOST = 'mongodb://127.0.0.1:27017', DB_NAME } = process.env;
    const dbOptions: mongoose.ConnectOptions = {
      dbName: DB_NAME,
    };
    if (!MongooseRepository.instance) {
      MongooseRepository.instance = new MongooseRepository(mongoUri || DB_HOST, dbOptions);
    }
    return MongooseRepository.instance;
  }

}