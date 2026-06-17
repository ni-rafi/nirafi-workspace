import React, { useEffect } from 'react';

interface PageMetadataProps {
  title: string;
  subjectCode: string;
  slideNo: number;
}

/**
 * PageMetadata dynamically updates browser tab titles based on the active presentation
 * subject code, title, and current slide index.
 */
export const PageMetadata: React.FC<PageMetadataProps> = ({
  title,
  subjectCode,
  slideNo,
}) => {
  useEffect(() => {
    const originalTitle = document.title;
    
    // Construct tab header: "CE-QS - Concrete Volume | Slide 3"
    document.title = `${subjectCode.toUpperCase()} - ${title} | Slide ${slideNo}`;

    // Restore original tab title on unmount
    return () => {
      document.title = originalTitle;
    };
  }, [title, subjectCode, slideNo]);

  // This is a pure utility head controller, so it doesn't render visual nodes
  return null;
};

export default PageMetadata;
