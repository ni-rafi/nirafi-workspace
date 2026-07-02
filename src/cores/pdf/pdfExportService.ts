import { jsPDF } from 'jspdf';
import { toJpeg } from 'html-to-image';
import { IPDFExportService, IPDFExportOptions } from './IPDFExportService';

export class PDFExportService implements IPDFExportService {
  async generateReport(options: IPDFExportOptions, onProgress?: (status: string) => void): Promise<void> {
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark');

    // 1. Temporarily switch to light mode for crisp capture
    if (isDark) {
      onProgress?.('Adjusting document styles for printing...');
      root.classList.remove('dark');
      root.classList.add('light');
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    try {
      // 2. Create jsPDF instance – A4 portrait (210mm × 297mm)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      let currentY = 20;

      // 3. Draw report cover header on page 1
      onProgress?.('Generating report header...');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(79, 70, 229); // indigo-600
      pdf.text(options.title, 15, currentY);
      currentY += 10;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(107, 114, 128); // gray-500
      let metaStr = `Author: ${options.author}`;
      if (options.institution) metaStr += `   |   Institution: ${options.institution}`;
      metaStr += `   |   Generated: ${options.timestamp}`;
      pdf.text(metaStr, 15, currentY);
      currentY += 6;

      // Decorative divider
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY, 195, currentY);
      currentY += 12;

      // 4. Sequentially capture each registered element
      for (const item of options.elements) {
        const el = window.document.getElementById(item.id);
        if (!el) {
          console.warn(`PDFExportService: element "${item.id}" not found in DOM.`);
          continue;
        }

        onProgress?.(`Capturing ${item.title}...`);

        // html-to-image uses browser's native rendering — supports oklch, oklch, gradients etc.
        const dataUrl = await toJpeg(el, {
          quality: 0.95,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
          // Force the element to its full scroll-width so nothing is cropped
          width: el.scrollWidth,
          height: el.scrollHeight,
        });

        // Calculate dimensions to fit within 180mm wide content area
        const img = new Image();
        img.src = dataUrl;
        await new Promise<void>((resolve) => { img.onload = () => resolve(); });

        const widthInPdf = 180;
        const heightInPdf = (img.naturalHeight * widthInPdf) / img.naturalWidth;

        // Intelligent page breaking
        if (currentY + 8 + heightInPdf > 272) {
          pdf.addPage();
          currentY = 25;
        }

        // Section title
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(31, 41, 55); // slate-800
        pdf.text(item.title, 15, currentY);
        currentY += 5;

        pdf.addImage(dataUrl, 'JPEG', 15, currentY, widthInPdf, heightInPdf);
        currentY += heightInPdf + 12;
      }

      // 5. Stamp headers, footers, and page numbers on every page
      onProgress?.('Finishing document layout...');
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);

        if (i > 1) {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);
          pdf.setTextColor(156, 163, 175);
          pdf.text(options.title, 15, 12);
          pdf.setDrawColor(243, 244, 246);
          pdf.setLineWidth(0.5);
          pdf.line(15, 14, 195, 14);
        }

        pdf.setDrawColor(243, 244, 246);
        pdf.setLineWidth(0.5);
        pdf.line(15, 280, 195, 280);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(156, 163, 175);
        pdf.text(options.brandingText, 15, 285);
        const pageStr = `Page ${i} of ${totalPages}`;
        pdf.text(pageStr, 195 - pdf.getTextWidth(pageStr), 285);
      }

      // 6. Download
      onProgress?.('Downloading PDF file...');
      const filename = `${options.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_report.pdf`;
      pdf.save(filename);

    } finally {
      // 7. Always restore the original theme
      if (isDark) {
        root.classList.remove('light');
        root.classList.add('dark');
      }
    }
  }
}

export const pdfExportService = new PDFExportService();
export default pdfExportService;
