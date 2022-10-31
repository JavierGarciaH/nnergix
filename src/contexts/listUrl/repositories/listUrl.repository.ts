import { HistoryUrlListDto } from './listUrl.mongoose.schema';

export abstract class HistoryListUrlRepository {
  abstract save(historyUrlList: HistoryUrlListDto): Promise<void>;
}