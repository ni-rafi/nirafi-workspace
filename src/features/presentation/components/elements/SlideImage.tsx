import React, { useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';

interface SlideImageProps {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  zoomable?: boolean;
  className?: string;
  imageClassName?: string;
}

export const SlideImage: React.FC<SlideImageProps> = ({
  src,
  alt,
  caption,
  maxWidth,
  maxHeight,
  className = '',
  imageClassName = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const widthStyle = maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : '100%';
  const heightStyle = maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : 'auto';

  return (
    <figure
      className={`mx-auto flex flex-col items-center justify-center my-4 ${className}`}
      style={{ maxWidth: widthStyle }}
    >
      <div
        className={`overflow-hidden rounded-xl border border-border/80 transition-all duration-300 ${isBlog
            ? 'bg-transparent border-border/40 shadow-none'
            : 'bg-card border-border/60 shadow-md'
          }`}
      >
        <img
          src={src}
          alt={alt}
          style={{ maxHeight: heightStyle }}
          className={`h-auto w-full object-cover select-none pointer-events-none ${imageClassName}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[10px] md:text-xs text-muted-foreground italic select-text px-4 font-medium leading-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default SlideImage;
