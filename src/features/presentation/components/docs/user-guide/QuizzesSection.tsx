import React, { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const QuizzesSection: React.FC = () => {
  const [mockStatus, setMockStatus] = useState<'active' | 'closed'>('active');
  const [mockAnswer, setMockAnswer] = useState('');
  const [mockFeedback, setMockFeedback] = useState<string | null>(null);

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockAnswer.trim()) return;
    if (mockStatus === 'closed') {
      setMockFeedback('error: Time limit exceeded! Quiz has been closed.');
      return;
    }
    const isCorrect = mockAnswer.trim().toLowerCase() === '12.5' || mockAnswer.trim().toLowerCase() === '12.500';
    if (isCorrect) {
      setMockFeedback('success: Correct! Stored response on cloud database.');
    } else {
      setMockFeedback('incorrect: Incorrect! Try entering "12.5" to see successful submission.');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">Live Classroom Quizzes</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          How to answer synchronized interactive quiz questions and track correctness indicators during live presentations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
        <div className="lg:col-span-7 flex flex-col gap-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            When a presenter triggers a synchronized live question, the deck view prompts the student input card to open in real-time.
          </p>
          <ul className="list-disc pl-4 flex flex-col gap-2">
            <li><strong>Instant Cloud Sync</strong>: Your answers are transmitted directly to the Firestore collection and compiled on the admin dashboard charts.</li>
            <li><strong>Timer Threshold</strong>: Submit answers before the progress countdown bar hits zero.</li>
            <li><strong>Post-Close Validation</strong>: After the quiz expires or is closed, you can inspect correct answers highlighted directly in place.</li>
          </ul>
        </div>

        {/* Student Quiz Simulation Card */}
        <div className="lg:col-span-5 border border-border bg-card p-5 rounded-2xl flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2.5">
            <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-wider">Live Simulator</span>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setMockStatus(prev => prev === 'active' ? 'closed' : 'active');
                setMockFeedback(null);
              }}
              className="text-[10px] h-6 cursor-pointer font-bold px-2 py-0"
            >
              Toggle: {mockStatus === 'active' ? 'Active' : 'Closed'}
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Mock Quiz Question</span>
            <p className="text-xs font-bold text-foreground">Estimate total concrete volume (m³) for a beam (L=5m, W=0.5m, H=0.5m) with 0% wastage.</p>
          </div>

          <form onSubmit={handleMockSubmit} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Volume in m³ (e.g. 12.5)"
                value={mockAnswer}
                onChange={(e) => setMockAnswer(e.target.value)}
                className="text-xs h-8 bg-muted/30 focus-visible:ring-primary border-border/80"
              />
              <Button type="submit" size="sm" className="h-8 shrink-0 cursor-pointer text-xs font-bold">
                Submit <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            {mockFeedback && (
              <div className={`p-2.5 rounded-xl border text-[11px] font-medium leading-relaxed ${
                mockFeedback.startsWith('success')
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : mockFeedback.startsWith('incorrect')
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  : 'bg-destructive/10 text-destructive border-destructive/20'
              }`}>
                {mockFeedback.substring(mockFeedback.indexOf(':') + 2)}
              </div>
            )}

            {mockStatus === 'closed' && !mockFeedback && (
              <div className="flex items-center gap-1.5 p-2 bg-destructive/5 border border-destructive/15 text-destructive rounded-xl text-[10px] font-semibold justify-center">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Countdown expired. Quiz closed!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizzesSection;
