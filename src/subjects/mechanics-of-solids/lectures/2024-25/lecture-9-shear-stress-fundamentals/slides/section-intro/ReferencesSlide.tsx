import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const ReferencesSlide: React.FC = () => {
  const references: ReferenceBook[] = [
    {
      title: 'Strength of Materials',
      edition: '4th edition',
      authors: 'Andrew Pytel and Ferdinand Leon Singer',
      sections: ['Section 5.7: Shearing Stresses in Beams', 'Section 5.8: Shearing Stresses in Rectangular Beams']
    },
    {
      title: 'Strength of Materials',
      edition: 'Multicolour Edition (2008)',
      authors: 'R.S. Khurmi',
      sections: ['Section 16.1 - 16.4: Shearing Stresses in Beams', 'Section 16.6 - 16.9: Shear Stress Distribution in Rectangular Sections']
    }
  ];

  return (
    <ReferencesLayout
      title="References & Readings"
      references={references}
      instruction="Refer to these textbooks and sections for comprehensive reading and sessional preparation."
    />
  );
};

export default ReferencesSlide;
