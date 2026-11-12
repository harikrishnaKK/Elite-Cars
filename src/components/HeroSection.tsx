import React from 'react';
import { HERO_CAR } from '../data/mockData';
import { ShieldCheck, Truck, Headphones, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreInventory: () => void;
  onBookTestDrive: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreInventory,
  onBookTestDrive,
}) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-[#0c0e12] overflow-hidden flex flex-col justify-between">
      
      {/* Background Hero Image with Dramatic Vignette and Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_CAR.image}
          alt="Audi RS Q8 Luxury Flagship"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 animate-fade-in"
        />
        {/* Cinematic gradient overlays to match image.png */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12]/95 via-[#0c0e12]/75 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-[#0c0e12]/50" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge: THE PINNACLE OF AUTOMOTIVE EXCELLENCE */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/15 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#E5B869] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-slate-200 uppercase">
                {HERO_CAR.badgeText}
              </span>
            </div>
          </div>

          {/* Headline: DRIVE YOUR AMBITION */}
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-white uppercase leading-[0.95] drop-shadow-md">
            {HERO_CAR.headline}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            {HERO_CAR.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreInventory}
              className="px-7 py-3.5 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-[0.12em] uppercase rounded-sm transition-all duration-200 shadow-lg shadow-black/40"
            >
              EXPLORE INVENTORY
            </button>
            <button
              onClick={onBookTestDrive}
              className="px-7 py-3.5 bg-black/40 hover:bg-black/60 border border-white/25 active:scale-98 text-white text-xs font-bold tracking-[0.12em] uppercase rounded-sm backdrop-blur-sm transition-all duration-200"
            >
              BOOK A TEST DRIVE
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Value Props / Trust Markers strip matching image.png */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 pb-10">
        <div className="inline-flex flex-wrap items-center gap-6 sm:gap-12 p-3 sm:px-6 sm:py-3.5 bg-black/50 border border-white/10 rounded-md backdrop-blur-md">
          
          {/* Item 1: 100% CERTIFIED INSPECTION */}
          <div className="flex items-center gap-3">
            <div className="text-[#E5B869]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block tracking-wider font-mono-tabular">
                100%
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                CERTIFIED INSPECTION
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-white/10" />

          {/* Item 2: 48-Hr WHITE-GLOVE DISPATCH */}
          <div className="flex items-center gap-3">
            <div className="text-[#E5B869]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block tracking-wider font-mono-tabular">
                48-Hr
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                WHITE-GLOVE DISPATCH
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-white/10" />

          {/* Item 3: 24/7 DEDICATED CONCIERGE */}
          <div className="flex items-center gap-3">
            <div className="text-[#E5B869]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block tracking-wider font-mono-tabular">
                24/7
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                DEDICATED CONCIERGE
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
