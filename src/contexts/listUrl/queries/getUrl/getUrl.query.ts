import { GetUrlsFromUrl } from '../../../../applicationServices/getUrlsfromUrl';
import { BaseError } from '../../../../shared/core/baseError';
import { Either } from '../../../../shared/core/either';
import { Query } from '../../../../shared/core/query';
import { GetUrlDto } from './getUrl.dto';
import { nanoid } from 'nanoid';
import { HistoryUrlListMongooseRepository } from '../../../listUrl/repositories/listUrl.mongoose.repository';
import MongooseRepository from '../../../../config/mongoose';
import { ListUrlErrors } from '../../errors/listUrl.errors';
import { HistoryUrlListDto } from '../../repositories/listUrl.mongoose.schema';

export class GetUrlQuery extends Query<BaseError, HistoryUrlListDto[]> {
  async handle(urlDto: GetUrlDto): Promise<Either<BaseError, HistoryUrlListDto[]>> {
    const id = nanoid();
    const arrayHistories: HistoryUrlListDto[] = await this.generateHistories(id, urlDto.url, urlDto.depth, 0);
    try {
      const mongooseRepository = MongooseRepository.getSingleton();
      const historyUrlListMongooseRepository = new HistoryUrlListMongooseRepository({ client: mongooseRepository });
      historyUrlListMongooseRepository.saveAll(arrayHistories);
      return Either.right(arrayHistories);
    } catch (error: any) {
      return Either.left(new ListUrlErrors.UnexpectedError(error as string));
    }
  }

  async generateHistories(
    id: string, searchedUrl: string, depth: number, currentDepth: number, parentUrl?: string,
  ): Promise<HistoryUrlListDto[]> {
    {
      const getUrlsFromUrl: GetUrlsFromUrl = new GetUrlsFromUrl();
      const urlListOrError = await getUrlsFromUrl.getUrlList(parentUrl || searchedUrl);

      if (urlListOrError.isLeft()) {
        return [];
      }

      const listUrl = urlListOrError.getRight();
      const arrayHistories: HistoryUrlListDto[] = [];
      arrayHistories.push({
        id,
        searchedUrl,
        parentUrl,
        depth: currentDepth,
        url: listUrl,
      });
      if (depth > currentDepth) {
        currentDepth += 1;
        for await (const url of listUrl) {
          const result = await this.generateHistories(id, searchedUrl, depth, currentDepth, url);
          arrayHistories.push(result[0]);
        }
      }

      return arrayHistories;
    }
  }
}
