import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const Lecture4References: React.FC = () => {
  const references: ReferenceBook[] = [
    {
      title: 'Strength of Materials',
      edition: '4th edition',
      authors: 'Andrew Pytel and Ferdinand Leon Singer',
      sections: ['4-1', '4-2', '4-3', '4-4']
    },
    {
      title: 'Strength of Materials',
      edition: 'Multicolour Edition (2008)',
      authors: 'R.S. Khurmi',
      sections: ['13.15 – 13.19']
    }
  ];

  return (
    <ReferencesLayout
      title="References"
      references={references}
      instruction="Refer to these textbooks and sections to study external moments, inclined forces, and internal hinges."
    />
  );
};

export default Lecture4References;
