import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const ReferencesSlide: React.FC = () => {
  const references: ReferenceBook[] = [
    {
      title: 'Strength of Materials',
      edition: '4th edition',
      authors: 'Andrew Pytel and Ferdinand Leon Singer',
      sections: ['Section 5.2: Bending Stresses in Beams']
    },
    {
      title: 'Strength of Materials',
      edition: 'Multicolour Edition (2008)',
      authors: 'R.S. Khurmi',
      sections: ['Section 14.1 - 14.8: Bending Stresses in Simple Beams']
    }
  ];

  return (
    <ReferencesLayout
      title="References & Readings"
      references={references}
      instruction="Refer to these textbooks and sections for comprehensive reading and exam prep."
    />
  );
};

export default ReferencesSlide;
