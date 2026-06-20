import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { IPDFExportService, IPDFExportOptions } from './IPDFExportService';

export class PDFExportService implements IPDFExportService {
  async generateReport(options: IPDFExportOptions, onProgress?: (status: string) => void): Promise<void> {
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark');

    // Helper to convert oklch(...) to rgb(...) or rgba(...)
    const parseOklch = (colorStr: string): string => {
      const regex = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.%]+))?\s*\)/gi;
      return colorStr.replace(regex, (_match, lStr, cStr, hStr, aStr) => {
        const L = parseFloat(lStr);
        const C = parseFloat(cStr);
        const H = parseFloat(hStr);

        const hRad = (H * Math.PI) / 180;
        const a = C * Math.cos(hRad);
        const b = C * Math.sin(hRad);

        const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;

        const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
        const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
        const bVal = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

        const toSRGB = (c: number) => {
          const clamped = Math.max(0, Math.min(1, c));
          const res = clamped <= 0.0031308
            ? 12.92 * clamped
            : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
          return Math.round(res * 255);
        };

        const rInt = toSRGB(r);
        const gInt = toSRGB(g);
        const bInt = toSRGB(bVal);

        if (aStr) {
          let alpha = 1;
          if (aStr.endsWith('%')) {
            alpha = parseFloat(aStr) / 100;
          } else {
            alpha = parseFloat(aStr);
          }
          return `rgba(${rInt}, ${gInt}, ${bInt}, ${alpha})`;
        }
        return `rgb(${rInt}, ${gInt}, ${bInt})`;
      });
    };

    // Helper to convert oklab(...) to rgb(...) or rgba(...)
    const parseOklab = (colorStr: string): string => {
      const regex = /oklab\(\s*([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)(?:\s*\/\s*([\d.%+-]+))?\s*\)/gi;
      return colorStr.replace(regex, (_match, lStr, aStr, bStr, aStr2) => {
        const L = parseFloat(lStr);
        const a = parseFloat(aStr);
        const b = parseFloat(bStr);

        const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;

        const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
        const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
        const bVal = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

        const toSRGB = (c: number) => {
          const clamped = Math.max(0, Math.min(1, c));
          const res = clamped <= 0.0031308
            ? 12.92 * clamped
            : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
          return Math.round(res * 255);
        };

        const rInt = toSRGB(r);
        const gInt = toSRGB(g);
        const bInt = toSRGB(bVal);

        if (aStr2) {
          let alpha = 1;
          if (aStr2.endsWith('%')) {
            alpha = parseFloat(aStr2) / 100;
          } else {
            alpha = parseFloat(aStr2);
          }
          return `rgba(${rInt}, ${gInt}, ${bInt}, ${alpha})`;
        }
        return `rgb(${rInt}, ${gInt}, ${bInt})`;
      });
    };

    const cleanColors = (text: string): string => {
      return parseOklab(parseOklch(text));
    };

    interface IPatchedWindow {
      __getComputedStylePatched?: boolean;
      getComputedStyle: (elt: Element, pseudoElt?: string | null) => CSSStyleDeclaration;
    }

    // Helper to override getComputedStyle on a window context
    const patchWindow = (win: Window) => {
      const patchedWin = win as unknown as IPatchedWindow;
      if (patchedWin && !patchedWin.__getComputedStylePatched) {
        patchedWin.__getComputedStylePatched = true;
        const originalGetComputedStyle = win.getComputedStyle;
        patchedWin.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
          const style = originalGetComputedStyle.call(win, elt, pseudoElt || null);
          return new Proxy(style, {
            get(target, prop) {
              if (prop === 'getPropertyValue') {
                return (vName: string) => {
                  const val = target.getPropertyValue(vName);
                  if (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                    return cleanColors(val);
                  }
                  return val;
                };
              }
              const val = Reflect.get(target, prop);
              if (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                return cleanColors(val);
              }
              if (typeof val === 'function') {
                return (val as Function).bind(target);
              }
              return val;
            }
          }) as unknown as CSSStyleDeclaration;
        };
      }
    };

    // 1. Temporarily switch to light mode for crisp canvas capture
    if (isDark) {
      onProgress?.('Adjusting document styles for printing...');
      root.classList.remove('dark');
      root.classList.add('light');
      // Wait for theme transitions and browser repaint
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // 2. Intercept defaultView and contentWindow dynamically to proxy newly created iframes
    const originalGetComputedStyle = window.getComputedStyle;
    const docDefaultViewDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'defaultView');
    const iframeContentWinDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');

    patchWindow(window);

    if (docDefaultViewDesc && docDefaultViewDesc.get) {
      const origGet = docDefaultViewDesc.get;
      Object.defineProperty(Document.prototype, 'defaultView', {
        configurable: true,
        get() {
          const win = origGet.call(this);
          if (win) patchWindow(win as unknown as Window);
          return win;
        }
      });
    }

    if (iframeContentWinDesc && iframeContentWinDesc.get) {
      const origGet = iframeContentWinDesc.get;
      Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
        configurable: true,
        get() {
          const win = origGet.call(this);
          if (win) patchWindow(win as unknown as Window);
          return win;
        }
      });
    }

    try {
      // Create jsPDF instance in A4 portrait format (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      let currentY = 20;

      // 3. Draw Report Cover Header on the first page
      onProgress?.('Generating report header...');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(79, 70, 229); // indigo-600
      pdf.text(options.title, 15, currentY);
      currentY += 10;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(107, 114, 128); // gray-500
      let metadataStr = `Author: ${options.author}`;
      if (options.institution) {
        metadataStr += `   |   Institution: ${options.institution}`;
      }
      metadataStr += `   |   Generated: ${options.timestamp}`;
      pdf.text(metadataStr, 15, currentY);
      currentY += 6;

      // Decorative division line
      pdf.setDrawColor(229, 231, 235); // gray-200
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY, 195, currentY);
      currentY += 12;

      // 4. Sequentially capture and add elements
      for (const item of options.elements) {
        const el = window.document.getElementById(item.id);
        if (!el) {
          console.warn(`Element with ID "${item.id}" not found in DOM.`);
          continue;
        }

        onProgress?.(`Capturing ${item.title}...`);

        // Capture element via html2canvas
        const canvas = await html2canvas(el, {
          scale: 2, // Retinal high resolution
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: el.scrollWidth || undefined,
          onclone: (clonedDoc) => {
            const clonedWindow = clonedDoc.defaultView;
            if (clonedWindow) patchWindow(clonedWindow as unknown as Window);
            
            // Add printing-pdf class to cloned document root to apply academic styling
            clonedDoc.documentElement.classList.add('printing-pdf');

            // 1. Process all inline style tags
            const styleElements = clonedDoc.querySelectorAll('style');
            styleElements.forEach((styleEl) => {
              if (styleEl.textContent) {
                styleEl.textContent = cleanColors(styleEl.textContent);
              }
            });

            // 2. Process all elements with inline style attribute
            const allStyledElements = clonedDoc.querySelectorAll('[style]');
            allStyledElements.forEach((el) => {
              const styleAttr = el.getAttribute('style');
              if (styleAttr && (styleAttr.includes('oklch') || styleAttr.includes('oklab'))) {
                el.setAttribute('style', cleanColors(styleAttr));
              }
            });

            // 3. Override common theme variables explicitly on cloned documentElement root
            const rootEl = clonedDoc.documentElement;
            const currentStyles = window.getComputedStyle(window.document.documentElement);
            const varList = [
              '--background', '--foreground', '--card', '--card-foreground',
              '--popover', '--popover-foreground', '--primary', '--primary-foreground',
              '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
              '--accent', '--accent-foreground', '--destructive', '--border',
              '--input', '--ring'
            ];
            varList.forEach(vName => {
              const computedVal = currentStyles.getPropertyValue(vName);
              if (computedVal && (computedVal.includes('oklch') || computedVal.includes('oklab'))) {
                rootEl.style.setProperty(vName, cleanColors(computedVal));
              }
            });
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Render dimension fitting
        const widthInPdf = 180;
        const heightInPdf = (imgHeight * widthInPdf) / imgWidth;

        // Intelligent Page Breaking
        const totalHeightNeeded = 8 + heightInPdf; // 8mm for Title + Spacing + Image
        if (currentY + totalHeightNeeded > 272) {
          pdf.addPage();
          currentY = 25; // Reset current Y for the new page (leaves room for header line)
        }

        // Draw Section Title
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(31, 41, 55); // slate-800
        pdf.text(item.title, 15, currentY);
        currentY += 5;

        // Add captured canvas image
        pdf.addImage(imgData, 'JPEG', 15, currentY, widthInPdf, heightInPdf);
        currentY += heightInPdf + 12; // Update page pointer plus spacing
      }

      // 5. Post-processing loop: stamp footers, headers and page numbers on all pages
      onProgress?.('Finishing document layout...');
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);

        // Header (only on pages 2+)
        if (i > 1) {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);
          pdf.setTextColor(156, 163, 175); // gray-400
          pdf.text(options.title, 15, 12);

          pdf.setDrawColor(243, 244, 246); // gray-100
          pdf.setLineWidth(0.5);
          pdf.line(15, 14, 195, 14);
        }

        // Footer (on all pages)
        pdf.setDrawColor(243, 244, 246); // gray-100
        pdf.setLineWidth(0.5);
        pdf.line(15, 280, 195, 280);

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(156, 163, 175); // gray-400
        pdf.text(options.brandingText, 15, 285);

        const pageStr = `Page ${i} of ${totalPages}`;
        pdf.text(pageStr, 195 - pdf.getTextWidth(pageStr), 285);
      }

      // 6. Download the final PDF
      onProgress?.('Downloading PDF file...');
      const filename = `${options.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_report.pdf`;
      pdf.save(filename);

    } finally {
      // 7. Restore original active theme and global window/prototype overrides
      if (isDark) {
        root.classList.remove('light');
        root.classList.add('dark');
      }
      window.getComputedStyle = originalGetComputedStyle;
      if (docDefaultViewDesc) {
        Object.defineProperty(Document.prototype, 'defaultView', docDefaultViewDesc);
      }
      if (iframeContentWinDesc) {
        Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', iframeContentWinDesc);
      }
    }
  }
}

export const pdfExportService = new PDFExportService();
export default pdfExportService;
