import React from 'react';
import { ReferencesLayout, type ReferenceBook } from '@/shared/layouts/ReferencesLayout';

export const HomeworkSlide: React.FC = () => {
  const references: ReferenceBook[] = [
    {
      title: 'Strength of Materials (Andrew Pytel & Ferdinand Singer)',
      edition: '4th edition',
      authors: 'Andrew Pytel and Ferdinand Leon Singer',
      sections: [
        'Problems 5.42 to 5.46: Stress profiles in flanged beams',
        'Problems 5.51 to 5.55: Nail and bolt spacing in built-up timber beams'
      ]
    },
    {
      title: 'Strength of Materials (R.S. Khurmi)',
      edition: 'Multicolour Edition (2008)',
      authors: 'R.S. Khurmi',
      sections: [
        'Chapter 16 Exercises: Problems on asymmetric and symmetric flanged sections (I-shapes and T-shapes)',
        'Chapter 16 Exercises: Shear flow spacing in built-up members'
      ]
    }
  ];

  return (
    <ReferencesLayout
      title="Homework & Practice Exercises"
      references={references}
      instruction="Practice these textbook problems to consolidate your understanding of flanged sections and fasteners spacing."
    />
  );
};

export default HomeworkSlide;
