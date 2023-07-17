import { XlsxReader } from '../xlsxReader/XslxReader';

export const getCompaniesNames = async (filename: string, extra: string = '') => {
  const companiesNames = (await new XlsxReader(filename).read()).map((company: unknown) => {
    if (company === null || typeof company !== 'object') {
      return '';
    }

    const companyObj = company as { [key: string]: string };

    if (!companyObj.Empresa || !companyObj.Provincia || !companyObj.Ciudad) return '';

    return `${companyObj.Empresa || ''}, ${companyObj.Ciudad || ''}, ${
      companyObj.Provincia || ''
    }, ${extra}`;
  });

  return companiesNames;
};
