import { useMemo } from 'react';
import type { SectionGroup, FlatTOCItem } from './types';

export function useTOCData(
  sectionsData: SectionGroup[],
  collapsedSections: Record<string, boolean>,
  activeSlideNo: number,
  visibleElements: Record<string, boolean>
) {
  // Flattened array of active/inactive items for computing the SVG path and link alignment
  const items = useMemo<FlatTOCItem[]>(() => {
    const list: FlatTOCItem[] = [];

    sectionsData.forEach((section) => {
      // Add section title heading
      list.push({
        url: `#section-${section.slug}`,
        title: section.name,
        depth: 2,
        sectionName: section.name,
        slideNo: section.items[0]?.firstSlideNo || 1,
        slideNumbers: section.items.flatMap((i) => i.slideNumbers),
      });

      // Add sub-slides if section is expanded
      const isCollapsed = !!collapsedSections[section.name];
      if (!isCollapsed) {
        section.items.forEach((item) => {
          list.push({
            url: `#slide-card-${item.firstSlideNo}`,
            title: item.title,
            depth: 3,
            sectionName: section.name,
            slideNo: item.firstSlideNo,
            slideNumbers: item.slideNumbers,
          });
        });
      }
    });

    return list;
  }, [sectionsData, collapsedSections]);

  // Append active and visible status to each item
  const itemsWithActive = useMemo<FlatTOCItem[]>(() => {
    return items.map((item) => {
      let active = false;
      let visible = false;

      if (item.depth === 3) {
        active = item.slideNumbers.includes(activeSlideNo);
        // Visible if any slide card in this group is visible
        visible = item.slideNumbers.some((num) => !!visibleElements[`slide-card-${num}`]);
      } else if (item.depth === 2) {
        const isCollapsed = !!collapsedSections[item.sectionName];
        active = isCollapsed && item.slideNumbers.includes(activeSlideNo);
        
        if (isCollapsed) {
          // If collapsed, visible if any slide in it is visible
          visible = item.slideNumbers.some((num) => !!visibleElements[`slide-card-${num}`]);
        } else {
          // If expanded, visible if the section header element itself is visible in viewport
          const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          visible = !!visibleElements[`section-${slug}`];
        }
      }
      return { ...item, active, visible };
    });
  }, [items, activeSlideNo, visibleElements, collapsedSections]);

  return { itemsWithActive };
}
