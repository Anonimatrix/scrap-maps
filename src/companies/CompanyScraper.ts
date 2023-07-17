import { Inject, Injectable } from '@xkairo/scrapy';
import { PageScraperInterface } from '@xkairo/scrapy-interfaces';
import { CompanyInterface } from './CompanyInterface';
import { FindPlaceService } from '../places/FindPlaceService';

@Injectable()
export class CompanyScraper implements PageScraperInterface<CompanyInterface> {
  constructor(@Inject('searchs') private searchs: string[]) {}

  async scrap(): Promise<CompanyInterface[]> {
    const companies: CompanyInterface[] = [];

    for (const name of this.searchs) {
      const res = await this.scrapOne(name);

      if (res) {
        companies.push(res);
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
