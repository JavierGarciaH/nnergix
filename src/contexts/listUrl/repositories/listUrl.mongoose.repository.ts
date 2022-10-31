
import { Model } from 'mongoose';
import MongooseRepository from '../../../config/mongoose';
import { HistoryUrlListDto, HistoryUrlListSchema } from './listUrl.mongoose.schema';
import { HistoryListUrlRepository } from './listUrl.repository';


export class HistoryUrlListMongooseRepository extends HistoryListUrlRepository {
  private _model: Model<HistoryUrlListDto> | undefined;

  constructor(protected props: { client: MongooseRepository }) {
    super();
    this._model = props.client.addModel<HistoryUrlListDto>('historyUrlListModel', HistoryUrlListSchema);
  }

  public async save(historyUrlList: HistoryUrlListDto): Promise<void> {
    await this._model?.create(historyUrlList);
  }
  public async saveAll(historyUrlList: HistoryUrlListDto[]): Promise<void> {
    await this._model?.insertMany(historyUrlList);
  }
}
