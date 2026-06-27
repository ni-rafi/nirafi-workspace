import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const Lecture1References: React.FC = () => {
  const references: ReferenceBook[] = [
    {
      title: 'Strength of Materials',
      edition: '4th edition',
      authors: 'Andrew Pytel and Ferdinand Leon Singer',
      sections: ['4-1', '4-2']
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

export default Lecture1References;
