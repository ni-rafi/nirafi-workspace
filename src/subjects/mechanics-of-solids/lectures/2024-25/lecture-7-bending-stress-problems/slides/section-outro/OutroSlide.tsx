import React from 'react';
import { ThankYouLayout } from '@/shared/layouts/ThankYouLayout';

export const OutroSlide: React.FC = () => {
  return (
    <ThankYouLayout
      title="Thank You"
      subtitle="Do you have any questions on this session's problems?"
    />
  );
};

export default OutroSlide;
