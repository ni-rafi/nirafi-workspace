import type { Subject, Lecture, Session } from '@/config/lectures';
import type { ViewMode } from '@/features/presentation/context/PresentationContext';

export interface SlideGroupItem {
  title: string;
  firstSlideNo: number;
  slideNumbers: number[];
}

export interface SectionGroup {
  name: string;
  slug: string;
  items: SlideGroupItem[];
}

export interface FlatTOCItem {
  url: string;
  title: string;
  depth: number;
  sectionName: string;
  slideNo: number;
  slideNumbers: number[];
  active?: boolean;
  visible?: boolean;
}

export interface ComputedSVG {
  width: number;
  height: number;
  content: React.ReactNode;
  d: string;
  positions: [top: number, bottom: number, x: number][];
  itemLineLengths: [top: number, bottom: number][];
}

export interface OnThisPageProps {
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  totalSlides: number;
  activeSlide: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  collapsedSections: Record<string, boolean>;
  setCollapsedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  viewMode: ViewMode;
}
