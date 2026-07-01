import React from 'react';
import { ReferencesLayout } from '@/shared/layouts/ReferencesLayout';

export const ReferencesSlide: React.FC = () => {
  const references = [
    {
      title: 'Strength of Materials',
      edition: '4th Edition',
      authors: 'Andrew Pytel & Ferdinand L. Singer',
      sections: ['Chapter 5: Stresses in Beams (Sections 5.3 – 5.6)'],
    },
    {
      title: 'Strength of Materials',
      edition: 'Multicolour Edition, 2008',
      authors: 'R.S. Khurmi',
      sections: ['Chapter 14: Bending Stresses in Simple Beams (Sections 14.9, 15.1 – 15.3)'],
    },
  ];

  return (
    <ReferencesLayout
      title="References"
      references={references}
      footer="Go through these sections for a better understanding."
    />
  );
};

export default ReferencesSlide;
