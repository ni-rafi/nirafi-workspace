import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

interface SearchableFontSelectProps {
  label: string;
  value: string;
  onChange: (font: string) => void;
  disabled?: boolean;
}

const GOOGLE_FONTS_COLLECTION = [
  // Sans-Serif Fonts
  'Geist Variable',
  'Inter',
  'Outfit',
  'Outfit Variable',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Poppins',
  'Lato',
  'Raleway',
  'Nunito',
  'Rubik',
  'Ubuntu',
  'Work Sans',
  'DM Sans',
  'Plus Jakarta Sans',
  'Cabin',
  'Quicksand',
  'Kanit',
  'Heebo',
  'Karla',
  'Barlow',
  'Fira Sans',
  'PT Sans',
  'Albert Sans',
  'Manrope',
  'Syne',

  // Serif Fonts
  'Playfair Display',
  'Merriweather',
  'Lora',
  'PT Serif',
  'Georgia',
  'Cinzel',
  'Libre Baskerville',
  'EB Garamond',
  'Cormorant Garamond',
  'DM Serif Display',
  'Arvo',
  'Prata',
  'Cardo',
  'Noto Serif',
  'Domine',
  'Bitter',

  // Monospace Fonts
  'Fira Code',
  'JetBrains Mono',
  'Source Code Pro',
  'Inconsolata',
  'Roboto Mono',
  'IBM Plex Mono',
  'Space Mono',
  'Share Tech Mono',
  'Courier Prime',
  'Anonymous Pro',
  
  // System Defaults
  'system-ui',
  'sans-serif',
  'serif',
  'monospace',
];

export const SearchableFontSelect: React.FC<SearchableFontSelectProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dynamically load Google Font previews when dropdown is opened or selected value changes
  useEffect(() => {
    // Collect fonts to load: the active value, and all google fonts if open
    const systemFonts = ['system-ui', 'sans-serif', 'serif', 'monospace', 'Geist Variable', 'Outfit Variable'];
    const fontsToLoad = new Set<string>();

    if (value && !systemFonts.includes(value)) {
      fontsToLoad.add(value);
    }

    if (isOpen) {
      GOOGLE_FONTS_COLLECTION.forEach((f) => {
        if (!systemFonts.includes(f)) {
          fontsToLoad.add(f);
        }
      });
    }

    if (fontsToLoad.size === 0) return;

    // Load in chunks of 20 to avoid URL length rejections
    const fontList = Array.from(fontsToLoad);
    const chunkSize = 20;
    const links: HTMLLinkElement[] = [];

    for (let i = 0; i < fontList.length; i += chunkSize) {
      const chunk = fontList.slice(i, i + chunkSize);
      const familiesParam = chunk.map((font) => `family=${font.replace(/ /g, '+')}`).join('&');

      // Use text parameter to download only the characters of the font name, making it fast and lightweight
      const uniqueChars = Array.from(new Set(chunk.join(''))).join('');
      const encodedText = encodeURIComponent(uniqueChars);

      const url = `https://fonts.googleapis.com/css2?${familiesParam}&text=${encodedText}&display=swap`;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    }

    return () => {
      // Clean up injected links
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [isOpen, value]);

  // Filter fonts
  const filteredFonts = GOOGLE_FONTS_COLLECTION.filter((font) =>
    font.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 relative w-full">
      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>

      {/* Select Trigger Display */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed text-left font-medium transition-colors hover:bg-accent/30"
        style={{ fontFamily: value }}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      </button>

      {/* Searchable Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 flex flex-col rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in slide-in-from-top-1 duration-150 max-h-[260px] overflow-hidden">
          {/* Search Field */}
          <div className="flex items-center gap-1.5 border-b px-2.5 py-1.5 bg-muted/20">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs outline-none border-none p-0 focus:ring-0 placeholder:text-muted-foreground/80"
              autoFocus
            />
          </div>

          {/* List options */}
          <div className="flex-1 overflow-y-auto py-1 max-h-[200px]">
            {filteredFonts.length === 0 ? (
              <div className="px-3 py-2 text-[10px] text-muted-foreground text-center">
                No matching fonts found.
              </div>
            ) : (
              filteredFonts.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => {
                    onChange(font);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`flex items-center justify-between w-full px-3 py-1.5 text-left text-xs hover:bg-accent transition-colors ${
                    value === font ? 'bg-primary/5 text-primary font-semibold' : ''
                  }`}
                  style={{ fontFamily: font }}
                >
                  <span className="truncate">{font}</span>
                  {value === font && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableFontSelect;
