import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, Table, RefreshCw, Layers, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ConcreteVolumeCalculator,
  ConcreteMixCalculator,
  BrickworkCalculator,
  SteelWeightCalculator
} from '@/subjects/quantity-surveying/features';

interface CalculatorItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export const QSCalculatorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCalId, setActiveCalId] = useState<string>('concrete-vol');

  const calculators: CalculatorItem[] = [
    {
      id: 'concrete-vol',
      title: 'Concrete Volume',
      description: 'Calculates concrete casting volumes for slabs, footings, and columns with custom wastage allowance.',
      badge: 'Concrete',
      badgeColor: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5',
      icon: <Box className="w-4 h-4 shrink-0 text-emerald-500" />,
      component: <ConcreteVolumeCalculator layout="split" inputMode="both" />
    },
    {
      id: 'concrete-mix',
      title: 'Concrete Mix Ingredients',
      description: 'Calculates raw dry ingredients proportions (cement bags, sand, stone) from target design wet volumes.',
      badge: 'Mix Ratio',
      badgeColor: 'border-primary/30 text-primary bg-primary/5',
      icon: <Layers className="w-4 h-4 shrink-0 text-primary" />,
      component: <ConcreteMixCalculator layout="horizontal" inputMode="both" />
    },
    {
      id: 'brickwork',
      title: 'Brickwork & Mortar',
      description: 'Calculates masonry block count and wet mortar paste volumes based on target wall surface area and thickness.',
      badge: 'Masonry',
      badgeColor: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
      icon: <Table className="w-4 h-4 shrink-0 text-amber-500" />,
      component: <BrickworkCalculator layout="split" inputMode="both" />
    },
    {
      id: 'steel-weight',
      title: 'Steel Bar Weight',
      description: 'Calculates reinforcing steel bar weights in kilograms or lbs from specific rebar diameter specifications.',
      badge: 'Rebar',
      badgeColor: 'border-red-500/30 text-red-500 bg-red-500/5',
      icon: <Clipboard className="w-4 h-4 shrink-0 text-red-500" />,
      component: <SteelWeightCalculator layout="split" inputMode="both" />
    }
  ];

  const activeCal = calculators.find((c) => c.id === activeCalId) || calculators[0]!;


  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
            className="cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Quantity Surveying Calculators
            </h1>
            <p className="text-xs text-muted-foreground">
              Run real-time estimates for structural concrete pouring, ingredient proportions, brick masonry, and reinforcement bar take-offs.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="cursor-pointer gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Calculator</span>
        </Button>
      </div>

      {/* Main Side-by-Side Content */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        {/* Left Column: Calculator Listing selection */}
        <div className="flex flex-col gap-3 w-full lg:w-[350px] shrink-0 select-none">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-1">
            Available Calculators
          </span>
          <div className="flex flex-col gap-2.5">
            {calculators.map((cal) => {
              const isActive = cal.id === activeCalId;
              return (
                <Button
                  key={cal.id}
                  variant={isActive ? "secondary" : "outline"}
                  onClick={() => setActiveCalId(cal.id)}
                  className={`w-full h-auto text-left p-3.5 flex flex-col items-start gap-2 whitespace-normal select-text justify-start cursor-pointer transition-all duration-350 ${
                    isActive ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {cal.icon}
                      <span className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-foreground/80'}`}>
                        {cal.title}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${cal.badgeColor}`}>
                      {cal.badge}
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground font-normal">
                    {cal.description}
                  </p>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Working Calculator Widget */}
        <div className="flex-1 w-full bg-card border border-border/65 rounded-2xl p-5 md:p-6 shadow-xs min-h-[400px] flex items-center justify-center">
          <div className="w-full h-full animate-in fade-in slide-in-from-right duration-350">
            {activeCal.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QSCalculatorsPage;
