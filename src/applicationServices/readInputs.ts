import * as readline from 'readline-sync';
import { GetUrlDto } from '../contexts/listUrl/queries/getUrl/getUrl.dto';
import { GetUrlQuery } from '../contexts/listUrl/queries/getUrl/getUrl.query';
import { GetUrlsFromUrl } from './getUrlsfromUrl';

export class ReadInputs {

  isFinish: boolean = false;
  getUrlsFromUrl = new GetUrlsFromUrl();

  private async read() {
    const url = readline.question('Insert the url');
    if (url) {
      if (url === 'q') return this.finish();
      const depth = readline.question('Insert the depth of search');
      const dto: GetUrlDto = {
        url,
        depth: depth as unknown as number || 0,
      };

      const getUrlQuery = new GetUrlQuery();
      const urlList = await getUrlQuery.execute(dto);
      console.log('This is the list of urls: ', urlList.getRight());
    } else {
      const urlList = await this.getUrlsFromUrl.getUrlList('https://www.marca.es');
      console.log('This is the list of urls: ', urlList);
    }
  }
  public async init() {
    while (!this.isFinish) {
      await this.read();
    }
  }
  public finish() {
    this.isFinish = true;
  }

}