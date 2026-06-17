import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import type { Subject, Lecture, Session } from '@/config/lectures';
import SlideContainer from './SlideContainer';
import SlideRenderer, { getSlideMetadata } from '../slides/SlideRenderer';
import { ClickStepsProvider, useClickStepsContext } from '../../context/ClickStepsContext';
import MorphingBackground from '../../../../shared/components/MorphingBackground';

interface SimulationModalProps {
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onClose: () => void;
}

const getBgVariant = (type: string): 'default' | 'calculation' | 'gallery' | 'cover' => {
  const t = type.toLowerCase();
  if (t.includes('cover') || t.includes('title')) return 'cover';
  if (t.includes('sandbox') || t.includes('calculation') || t.includes('calculator') || t.includes('formula')) return 'calculation';
  if (t.includes('spreadsheet') || t.includes('table') || t.includes('grid') || t.includes('quiz') || t.includes('gallery')) return 'gallery';
  return 'default';
};

const ClickTrackerInner: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onCountResolved: (count: number) => void;
}> = ({ slideNo, subject, lecture, session, onCountResolved }) => {
  const { totalClicks } = useClickStepsContext();

  useEffect(() => {
    onCountResolved(totalClicks);
  }, [totalClicks, onCountResolved]);

  return (
    <div className="hidden" aria-hidden="true">
      <SlideRenderer slideNo={slideNo} subject={subject} lecture={lecture} session={session} />
    </div>
  );
};

export const ClickTracker: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onCountResolved: (count: number) => void;
}> = ({ slideNo, subject, lecture, session, onCountResolved }) => {
  return (
    <ClickStepsProvider currentClickOverride={0}>
      <ClickTrackerInner
        slideNo={slideNo}
        subject={subject}
        lecture={lecture}
        session={session}
        onCountResolved={onCountResolved}
      />
    </ClickStepsProvider>
  );
};

export const SimulationModal: React.FC<SimulationModalProps> = ({
  slideNo,
  subject,
  lecture,
  session,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [localStep, setLocalStep] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const meta = getSlideMetadata(slideNo, subject, lecture);
  const bgVariant = getBgVariant(meta.type);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setIsPlaying(false);
        if (localStep < totalClicks) setLocalStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        if (localStep > 0) setLocalStep((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, localStep, totalClicks]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setLocalStep((prev) => {
        if (prev < totalClicks) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, totalClicks]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none">
      <ClickTracker
        slideNo={slideNo}
        subject={subject}
        lecture={lecture}
        session={session}
        onCountResolved={setTotalClicks}
      />

      <div className="relative w-full max-w-4xl bg-background border rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="w-full aspect-[16/10] relative flex items-center justify-center bg-muted/10">
          <SlideContainer scaleMode="fit" isThumbnail={false}>
            <MorphingBackground variant={bgVariant} />
            <div className="flex-1 flex flex-col justify-center items-center w-full h-full text-center relative z-10">
              <ClickStepsProvider currentClickOverride={localStep}>
                <SlideRenderer slideNo={slideNo} subject={subject} lecture={lecture} session={session} />
              </ClickStepsProvider>
            </div>
          </SlideContainer>
        </div>

        <div className="w-full border-t bg-muted/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-semibold text-muted-foreground font-mono bg-background px-2.5 py-1 rounded-full border">
            Slide {slideNo} Simulation
          </span>

          <div className="flex items-center gap-4 bg-background px-4 py-1.5 rounded-full border shadow-sm">
            <button
              onClick={() => {
                setIsPlaying(false);
                if (localStep > 0) setLocalStep((prev) => prev - 1);
              }}
              disabled={localStep === 0}
              className="p-1 rounded-full hover:bg-muted text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => {
                if (localStep === totalClicks) {
                  setLocalStep(0);
                  setIsPlaying(true);
                } else {
                  setIsPlaying(!isPlaying);
                }
              }}
              className="p-2 rounded-full bg-primary hover:bg-primary/95 text-white cursor-pointer transition-all hover:scale-105"
              title={isPlaying ? 'Pause' : 'Play Autoplay'}
            >
              {isPlaying ? (
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                if (localStep < totalClicks) setLocalStep((prev) => prev + 1);
              }}
              disabled={localStep === totalClicks}
              className="p-1 rounded-full hover:bg-muted text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              title="Next Step"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-foreground/80">
              Step {localStep} of {totalClicks}
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationModal;
