// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Request, Response } from 'express';
import { GetUrlDto, GetUrlSchema } from './getUrl.dto';
import { Validator } from 'jsonschema';
import { GetUrlQuery } from './getUrl.query';
import { BaseError } from '../../../../shared/core/baseError';
import { HistoryUrlListDto } from '../../repositories/listUrl.mongoose.schema';
export class GetUrlController {
  async execute(req: Request, res: Response) {
    const { query } = req;

    const v = new Validator();
    const isQueryValid = v.validate(query, GetUrlSchema);
    if (!isQueryValid.valid) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const dto: GetUrlDto = {
      url: query.url as string,
      depth: Number(query.depth) || 0,
    };

    const getUrlQuery = new GetUrlQuery();
    const result = await getUrlQuery.execute(dto);

    result.fold(
      (error: BaseError) => res.status(error.statusCode).json({ message: error.message }),
      (values: HistoryUrlListDto[]) => res.send(values),
    );
  }
}
