import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { LectureCover } from '@/shared/layouts/LectureCover';

export const CoverSlideL5: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
);

export default CoverSlideL5;
