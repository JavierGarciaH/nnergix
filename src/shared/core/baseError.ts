
interface IBaseError {
  message: string;
  statusCode: number;
}

export abstract class BaseError implements IBaseError {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
