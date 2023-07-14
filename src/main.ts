import Scraper from '@xkairo/scrapy';
import { ScraperConfigInterface } from '@xkairo/scrapy-interfaces';
import { CompanyInterface } from './companies/CompanyInterface';
import { LocalUploader } from '@xkairo/scrapy/dist/services/Uploaders/LocalUploader';
import { CsvProcessor } from '@xkairo/scrapy/dist/services/Processors/CsvProcessor';
import { join } from 'path';
import { CompanyScraper } from './companies/CompanyScraper';

const filepath = join(__dirname, '..', 'data', 'companies.csv');

const config: ScraperConfigInterface<CompanyInterface> = {
  uploaders: [LocalUploader],
  processors: [CsvProcessor],
  scrapers: [CompanyScraper],
  providers: [
    {
      filepath: {
        useValue: filepath,
      },
    },
  ],
};

const scraper = new Scraper(config);

scraper.scrap().then(() => {
  console.log('Done');
});
