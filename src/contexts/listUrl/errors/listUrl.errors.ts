import { BaseError } from '../../../shared/core/baseError';

export namespace ListUrlErrors {
  export class InvalidURL extends BaseError {
    public constructor(url: string) {
      super(`This url ${url} is not valid`, 400);
    }
  }

  export class MongoClientNotDefined extends BaseError {
    public constructor() {
      super('Mongo Client Not Defined', 500);
    }
  }

  export class UnexpectedError extends BaseError {
    public constructor(error: string) {
      super(`Unexpected Error: ${error}`, 500);
    }
  }
}
