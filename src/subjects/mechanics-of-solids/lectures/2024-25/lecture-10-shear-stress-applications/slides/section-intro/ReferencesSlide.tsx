import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const ReferencesSlide: React.FC = () => {
  const references: ReferenceBook[] = [
    {
      title: 'Strength of Materials',
      edition: '4th edition',
      authors: 'Andrew Pytel and Ferdinand Leon Singer',
      sections: ['Section 5.9: Shearing Stresses in Flanged Beams', 'Section 5.10: Shear Flow']
    },
    {
      title: 'Strength of Materials',
      edition: 'Multicolour Edition (2008)',
      authors: 'R.S. Khurmi',
      sections: ['Section 16.11 - 16.15: Shear Stress in I-Sections and T-Sections', 'Section 16.17: Shear Flow in Built-up Members']
    }
  ];

  return (
    <ReferencesLayout
      title="References & Readings"
      references={references}
      instruction="Refer to these textbooks and sections for comprehensive reading and sessional prep."
    />
  );
};

export default ReferencesSlide;
