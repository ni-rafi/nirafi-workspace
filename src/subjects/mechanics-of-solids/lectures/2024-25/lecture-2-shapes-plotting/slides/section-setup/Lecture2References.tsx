import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const Lecture2References: React.FC = () => {
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
      sections: ['13.1-13.14']
    }
  ];

  return (
    <ReferencesLayout
      title="References"
      references={references}
      instruction="Go through these sections for a better understanding."
    />
  );
};

export default Lecture2References;
