import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { LectureCover } from '@/shared/layouts/LectureCover';

export const CoverSlideL2: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
);

export default CoverSlideL2;
