import type React from 'react';
import type { SlideProps, SlideMetadata } from '../components/slides/SlideRenderer';

export interface SectionModule {
  slides: Record<number, React.ComponentType<SlideProps>>;
  sectionMetadata: Record<number, SlideMetadata>;
}

export interface SerializedDeck {
  slides: Record<number, React.ComponentType<SlideProps>>;
  slideMetadata: Record<number, SlideMetadata>;
}

/**
 * Serializes local 1-based slide indexes from multiple SectionModules into a
 * globally sequential set of records starting at index 1.
 * 
 * @param sections Ordered list of section modules
 * @returns Combined slides and slideMetadata records with sequential global numbering
 */
export function serializeSections(sections: SectionModule[]): SerializedDeck {
  const globalSlides: Record<number, React.ComponentType<SlideProps>> = {};
  const globalMetadata: Record<number, SlideMetadata> = {};
  let currentGlobalIndex = 1;

  for (const section of sections) {
    const slideKeys = Object.keys(section.slides)
      .map(Number)
      .sort((a, b) => a - b);

    if (slideKeys.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('serializeSections: A section has 0 slides.');
      }
      continue;
    }

    for (const localKey of slideKeys) {
      const slideComponent = section.slides[localKey];
      const metadata = section.sectionMetadata[localKey];

      if (!slideComponent) {
        throw new Error(`serializeSections: Slide component missing for local key ${localKey}`);
      }
      if (!metadata) {
        throw new Error(`serializeSections: Slide metadata missing for local key ${localKey}`);
      }

      globalSlides[currentGlobalIndex] = slideComponent;
      globalMetadata[currentGlobalIndex] = metadata;
      currentGlobalIndex++;
    }
  }

  return {
    slides: globalSlides,
    slideMetadata: globalMetadata,
  };
}
