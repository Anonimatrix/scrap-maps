import { config } from 'dotenv';
config();

import Scraper from '@xkairo/scrapy';
import { ScraperConfigInterface } from '@xkairo/scrapy-interfaces';
import { CompanyInterface } from './companies/CompanyInterface';
import { LocalUploader } from '@xkairo/scrapy/dist/services/Uploaders/LocalUploader';
import { CsvProcessor } from '@xkairo/scrapy/dist/services/Processors/CsvProcessor';
import { join } from 'path';
import { CompanyScraper } from './companies/CompanyScraper';
import { getCompaniesNames } from './utils/getCompaniesNames';

const filepathData = join(__dirname, '..', 'data', 'companies.xlsx');
const filepathScrap = join(__dirname, '..', 'data', 'companiesScrap.csv');

(async () => {
  const companiesNames = await getCompaniesNames(filepathData, String(process.env.COUNTRY));

  const configScraper: ScraperConfigInterface<CompanyInterface> = {
    uploaders: [LocalUploader],
    processors: [CsvProcessor],
    scrapers: [CompanyScraper],
    providers: [
      {
        filepath: {
          useValue: filepathScrap,
        },
        searchs: {
          useValue: companiesNames,
        },
      },
    ],
  };

  const scraper = new Scraper(configScraper);

  scraper.init().then(() => {
    console.log('Done');
  });
})();
