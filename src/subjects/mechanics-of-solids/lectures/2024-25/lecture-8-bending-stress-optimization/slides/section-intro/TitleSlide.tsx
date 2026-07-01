import React from 'react';
import { TitleV2Layout } from '@/shared/layouts/TitleV2Layout';

export const TitleSlide: React.FC = () => {
  return (
    <TitleV2Layout
      courseCode="CEE 0732 2131"
      courseTitle="Mechanics of Solids-I"
      subtitle="Lecture 3: Section Modulus (Z) & Shape Optimizations"
      yearSemester="2nd Year / 1st Semester"
      creditHours="02"
      usnCode="2026-1"
      session="2024-25"
      lectureNumber={8}
    />
  );
};

export default TitleSlide;
