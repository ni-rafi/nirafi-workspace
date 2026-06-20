export interface IPDFExportElement {
  id: string;
  title: string;
  type: 'chart' | 'calculations';
}

export interface IPDFExportOptions {
  title: string;
  author: string;
  institution?: string;
  timestamp: string;
  brandingText: string;
  elements: IPDFExportElement[];
}

export interface IPDFExportService {
  generateReport(options: IPDFExportOptions, onProgress?: (status: string) => void): Promise<void>;
}
