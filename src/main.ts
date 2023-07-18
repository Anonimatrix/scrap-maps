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
import { LoggerFilenamesInterface, LoggerService } from './logger/LoggerService';

const filepathData = join(__dirname, '..', 'data', 'companies.xlsx');
const filepathScrap = join(__dirname, '..', 'data', 'companiesScrap.csv');
const filepathErrorLogs = join(__dirname, '..', 'logs', 'error.log');
const filepathInfoLogs = join(__dirname, '..', 'logs', 'info.log');

(async () => {
  const companiesNames = await getCompaniesNames(filepathData, String(process.env.COUNTRY));
  const loggerFilenames: LoggerFilenamesInterface = {
    info: filepathInfoLogs,
    error: filepathErrorLogs,
  };

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
        logger: {
          useClass: LoggerService,
        },
        loggerFilenames: {
          useValue: loggerFilenames,
        },
      },
    ],
  };

  const scraper = new Scraper(configScraper);

  scraper.init().then(() => {
    console.log('Done');
  });
})();
