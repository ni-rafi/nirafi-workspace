import React, { useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';
import { Quote } from 'lucide-react';

interface SlideQuoteProps {
  quote: React.ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

export const SlideQuote: React.FC<SlideQuoteProps> = ({
  quote,
  author,
  source,
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  if (isBlog) {
    return (
      <blockquote className={`border-l-4 border-primary pl-4 py-2 my-6 italic text-muted-foreground bg-transparent ${className}`}>
        <p className="text-sm leading-relaxed mb-1.5 select-text">"{quote}"</p>
        {(author || source) && (
          <cite className="block text-xs font-semibold not-italic text-foreground/80 mt-1 select-text">
            — {author}
            {source && <span className="text-muted-foreground font-normal">, {source}</span>}
          </cite>
        )}
      </blockquote>
    );
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto my-6 p-6 md:p-8 bg-muted/40 dark:bg-muted/10 border-l-[6px] border-primary rounded-r-2xl shadow-md select-text ${className}`}>
      {/* Watermark quotes icon */}
      <Quote className="absolute right-4 top-4 h-16 w-16 text-primary/10 select-none pointer-events-none transform rotate-180" />
      
      <div className="relative z-10 text-sm md:text-base italic leading-relaxed text-foreground font-medium">
        "{quote}"
      </div>
      
      {(author || source) && (
        <div className="relative z-10 mt-4 flex items-center gap-2 text-xs md:text-sm font-bold text-primary select-none">
          <span className="h-0.5 w-4 bg-primary" />
          <span>{author}</span>
          {source && (
            <span className="text-muted-foreground font-normal text-xs">
              ({source})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SlideQuote;
