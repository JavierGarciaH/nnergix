import { Either } from './either';

export abstract class Query<QueryError = unknown, QueryReturnType = unknown> {
  protected abstract handle(query: any): Promise<Either<QueryError, QueryReturnType>>;

  execute(query: any): Promise<Either<QueryError, QueryReturnType>> {
    return this.handle(query);
  }
}