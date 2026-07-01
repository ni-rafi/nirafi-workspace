import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';

export const BeamTransitionDivider: React.FC = () => (
  <TopicDividerLayout
    topicNumber="06"
    title="Shear Stress on Beam Section"
    description="Transitioning from a general 2D stress element block to standard structural beam flexural derivation models."
  />
);

export default BeamTransitionDivider;
