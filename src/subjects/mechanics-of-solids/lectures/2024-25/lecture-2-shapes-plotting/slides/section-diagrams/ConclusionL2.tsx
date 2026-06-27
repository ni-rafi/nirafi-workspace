import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { LectureThankYou } from '@/shared/layouts/LectureThankYou';

export const ConclusionL2: React.FC<SlideProps> = (props) => (
  <LectureThankYou
    {...props}
    subtitle="Next Time: Direct Relations for SFD/BMD Drawing"
  />
);

export default ConclusionL2;
