import XLSX from 'xlsx';

export class XlsxReader {
  workbook: XLSX.WorkBook;

  constructor(private filename: string) {
    this.workbook = XLSX.readFile(filename);
  }

  async read() {
    const sheet = this.workbook.Sheets[this.workbook.SheetNames[0]];

    const data = XLSX.utils.sheet_to_json(sheet);

    return data;
  }
}
