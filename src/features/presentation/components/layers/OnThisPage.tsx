import React, { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import { getSlideMetadata } from '../slides/SlideRenderer';
import type { OnThisPageProps, SectionGroup, SlideGroupItem } from './on-this-page/types';
import { useScrollSpy } from './on-this-page/useScrollSpy';
import { useTOCData } from './on-this-page/useTOCData';
import { useSVGTrack } from './on-this-page/useSVGTrack';

const BASE_OFFSET = 8;

function getItemOffset(depth: number): number {
  if (depth <= 2) return 12 + BASE_OFFSET;
  if (depth === 3) return 24 + BASE_OFFSET;
  return 36 + BASE_OFFSET;
}

export const OnThisPage: React.FC<OnThisPageProps> = ({
  subject,
  lecture,
  totalSlides,
  activeSlide,
  scrollContainerRef,
  collapsedSections,
  setCollapsedSections,
  viewMode,
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 1. Group consecutive matching titles within each section (shared data source)
  const sectionsData = useMemo<SectionGroup[]>(() => {
    const sectionGroups: Record<string, SlideGroupItem[]> = {};
    const sectionList: string[] = [];

    for (let i = 1; i <= totalSlides; i++) {
      const meta = getSlideMetadata(i, subject, lecture);
      const sec = meta.section;

      if (!sectionGroups[sec]) {
        sectionGroups[sec] = [];
        sectionList.push(sec);
      }

      const items = sectionGroups[sec];
      const lastItem = items[items.length - 1];

      if (lastItem && lastItem.title === meta.title) {
        lastItem.slideNumbers.push(i);
      } else {
        items.push({
          title: meta.title,
          firstSlideNo: i,
          slideNumbers: [i],
        });
      }
    }

    return sectionList.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      items: sectionGroups[name] || [],
    }));
  }, [totalSlides, subject, lecture]);

  // Toggle all sections expand/collapse state
  const allSectionNames = useMemo(() => sectionsData.map((s) => s.name), [sectionsData]);
  const hasExpanded = useMemo(() => allSectionNames.some((name) => !collapsedSections[name]), [allSectionNames, collapsedSections]);

  const handleToggleAll = () => {
    const nextCollapsedState: Record<string, boolean> = {};
    allSectionNames.forEach((name) => {
      nextCollapsedState[name] = hasExpanded;
    });
    setCollapsedSections(nextCollapsedState);
  };

  // 2. Scroll and viewport spy
  const { activeSlideNo, visibleElements } = useScrollSpy(
    scrollContainerRef,
    sidebarRef,
    totalSlides,
    sectionsData,
    activeSlide,
    collapsedSections,
    viewMode
  );

  // 3. Compute TOC active and visibility tracking states
  const { itemsWithActive } = useTOCData(
    sectionsData,
    collapsedSections,
    activeSlideNo,
    visibleElements
  );

  // 4. Compute coordinate path and dot slider properties
  const { svgData, trackStyle } = useSVGTrack(sidebarRef, itemsWithActive);

  // 5. Navigation Clicks
  const handleItemClick = (sectionName: string, slideNo: number) => {
    if (collapsedSections[sectionName]) {
      setCollapsedSections((prev) => ({ ...prev, [sectionName]: false }));
    }
    setTimeout(() => {
      const el = scrollContainerRef.current?.querySelector(`#slide-card-${slideNo}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const handleSectionClick = (sectionName: string, firstSlideNo: number) => {
    const nextCollapsed = !collapsedSections[sectionName];
    setCollapsedSections((prev) => ({ ...prev, [sectionName]: nextCollapsed }));

    if (nextCollapsed) return;

    setTimeout(() => {
      const el = scrollContainerRef.current?.querySelector(`#slide-card-${firstSlideNo}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  return (
    <div className="flex flex-col gap-6 text-left select-none font-sans h-full min-h-0">
      <div className="flex flex-col gap-1.5 border-b pb-3 shrink-0">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          On this page
        </span>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-foreground leading-tight">
            Lecture Navigation
          </h3>
          <button
            onClick={handleToggleAll}
            className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded transition-colors cursor-pointer select-none"
            title={hasExpanded ? "Collapse All Sections" : "Expand All Sections"}
          >
            {hasExpanded ? (
              <>
                <ChevronsDownUp className="h-3 w-3" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronsUpDown className="h-3 w-3" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div ref={sidebarRef} className="relative flex flex-col flex-1 overflow-y-auto pr-2 min-h-0">
        {/* Render SVG Track and smooth sliding dot (Fumadocs style) */}
        {svgData && (
          <div
            className="absolute top-0 left-0 origin-center pointer-events-none select-none z-0"
            style={{
              width: svgData.width,
              height: svgData.height,
              ...trackStyle,
            }}
          >
            {/* Background inactive gray track */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${svgData.width} ${svgData.height}`}
              className="absolute opacity-15"
              style={{ width: svgData.width, height: svgData.height }}
            >
              {svgData.content}
            </svg>

            {/* Active primary highlighted track via clipPath */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${svgData.width} ${svgData.height}`}
              className="absolute transition-[clip-path] duration-300"
              style={{
                width: svgData.width,
                height: svgData.height,
                clipPath: `polygon(0 var(--track-top,0), 100% var(--track-top,0), 100% var(--track-bottom,0), 0 var(--track-bottom,0))`,
              }}
            >
              {svgData.content}
            </svg>

            {/* Sliding Thumb dot */}
            <div
              className="absolute left-0 top-0 w-1.5 h-1.5 bg-primary rounded-full [offset-distance:var(--offset-distance,0)] opacity-(--opacity,0) transition-[opacity,offset-distance] duration-300 ease-out"
              style={{
                offsetPath: `path("${svgData.d}")`,
                offsetAnchor: 'center',
              }}
            />
          </div>
        )}

        {/* Generate items */}
        {itemsWithActive.map((item) => {
          const isCollapsed = !!collapsedSections[item.sectionName];
          const isItemActive = !!item.active;
          const isItemSection = item.depth === 2;

          const rangeLabel =
            item.slideNumbers.length > 1
              ? `${item.slideNumbers[0]}–${item.slideNumbers[item.slideNumbers.length - 1]}`
              : `${item.slideNumbers[0]}`;

          return (
            <a
              key={item.url}
              href={item.url}
              data-active={isItemActive}
              onClick={(e) => {
                e.preventDefault();
                if (isItemSection) {
                  handleSectionClick(item.sectionName, item.slideNo);
                } else {
                  handleItemClick(item.sectionName, item.slideNo);
                }
              }}
              className="prose relative py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors wrap-anywhere data-[active=true]:text-primary data-[active=true]:font-bold select-none flex items-center justify-between group cursor-pointer first:pt-0 last:pb-0"
              style={{
                paddingInlineStart: getItemOffset(item.depth),
              }}
            >
              <span className="truncate pr-2">{item.title}</span>

              {/* Display collapsed toggle state for sections, and page chips for sub-slides */}
              {isItemSection ? (
                <span className="text-[9px] font-semibold text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full select-none ml-2 shrink-0 group-hover:bg-accent group-hover:text-foreground transition-colors">
                  {isCollapsed ? 'collapsed' : 'expand'}
                </span>
              ) : (
                <span
                  className={cn(
                    'text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border transition-colors select-none shrink-0',
                    isItemActive
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-muted/50 text-muted-foreground/80 border-border/50 group-hover:bg-accent group-hover:text-foreground'
                  )}
                >
                  {rangeLabel}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default OnThisPage;
