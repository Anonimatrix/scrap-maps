import { Inject, Injectable } from '@xkairo/scrapy';
import { PageScraperInterface } from '@xkairo/scrapy-interfaces';
import { CompanyInterface } from './CompanyInterface';
import { FindPlaceService } from '../places/FindPlaceService';
import { LoggerInterface } from '../logger/LoggerInterface';

@Injectable()
export class CompanyScraper implements PageScraperInterface<CompanyInterface> {
  constructor(
    @Inject('searchs') private searchs: string[],
    @Inject('logger') private logger: LoggerInterface,
  ) {}

  async scrap(): Promise<CompanyInterface[]> {
    const companies: CompanyInterface[] = [];

    for (const name of this.searchs) {
      try {
        const res = await this.scrapOne(name);

        if (res) {
          companies.push(res);
          this.logger.info({ message: `Scraped ${name}` });
        }
      } catch (e) {
        const message = `Error to scrap ${name}`;
        const details: string = e instanceof Error ? e.message : String(e);

        this.logger.error({ message, details });
      }
    }

    return companies;
  }

  async scrapOne(companyName: string): Promise<CompanyInterface | null> {
    const details = await new FindPlaceService({
      fields: ['name', 'website', 'formatted_phone_number', 'international_phone_number'],
    }).findPlaceDetails(companyName);

    if (!details) {
      return null;
    }

    return {
      name: details?.name || '',
      site: details?.website || '',
      email: '',
      phone: details?.formatted_phone_number || details?.international_phone_number || '',
    };
  }
}
