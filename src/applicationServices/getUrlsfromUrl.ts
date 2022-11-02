import fetch from 'node-fetch';
import { ListUrlErrors } from '../contexts/listUrl/errors/listUrl.errors';
import { BaseError } from '../shared/core/baseError';
import { Either } from '../shared/core/either';

export class GetUrlsFromUrl {

  public getHtmlText = async (url: string): Promise<string | undefined> => {
    try {
      const page = await fetch(url, { method: 'GET' });
      if (page.ok) {
        return  await page.text();
      }
    } catch { }
  };

  private findHiperlinkTag = (text: string): { hyperlink: string, hyperlinkEnd: number } | undefined => {
    const hyperlinkStart = text.indexOf('<a');
    const hyperlinkEnd = text.indexOf('>', hyperlinkStart);
    if (hyperlinkStart === -1) return;
    return {
      hyperlink: text.substring(hyperlinkStart, hyperlinkEnd),
      hyperlinkEnd,
    };
  };

  private findUrl = (text: string): string[] => {
    const hiperlinkOrError = this.findHiperlinkTag(text);

    if (!hiperlinkOrError) return [];

    const { hyperlink, hyperlinkEnd } = hiperlinkOrError;
    let hrefStart = hyperlink.indexOf('href="https://');
    if (hrefStart === -1) return [];

    hrefStart += 6;
    const result = hyperlink.substring(hrefStart, hyperlink.indexOf('"', hrefStart));
    return [result].concat(this.findUrl(text.substring(hyperlinkEnd)));
  };


  public getUrlList = async (url: string): Promise<Either<BaseError, string[]>> => {
    let text = await this.getHtmlText(url);
    if (!text) {
      return Either.left(new ListUrlErrors.InvalidURL(url));
    }
    const result = this.findUrl(text);
    return Either.right(result);
  };
}