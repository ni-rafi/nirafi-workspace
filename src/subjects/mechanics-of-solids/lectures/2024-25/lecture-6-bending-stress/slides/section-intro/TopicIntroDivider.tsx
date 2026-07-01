import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';

export const TopicIntroDivider: React.FC = () => {
  return (
    <TopicDividerLayout
      topicNumber="02"
      title="Bending Stress"
      description="Understanding pure bending, elastic deformations, flexure formulas, and cross-section stress gradient distributions in structural beams."
    />
  );
};

export default TopicIntroDivider;
