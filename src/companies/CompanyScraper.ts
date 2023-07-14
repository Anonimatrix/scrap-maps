import { Injectable } from '@xkairo/scrapy';
import { PageScraperInterface } from '@xkairo/scrapy-interfaces';
import { CompanyInterface } from './CompanyInterface';

@Injectable()
export class CompanyScraper implements PageScraperInterface<CompanyInterface> {
  async scrap(): Promise<CompanyInterface[]> {
    return [
      {
        name: 'Company Name',
        site: 'https://www.company.com',
        email: 'dsa',
        phone: 'dsa',
      },
    ];
  }
}
