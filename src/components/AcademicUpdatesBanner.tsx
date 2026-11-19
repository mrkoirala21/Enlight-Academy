import { useState } from 'react';
import { ArrowUpRight, CalendarClock, Pause, Play } from 'lucide-react';
import { ACADEMIC_UPDATES } from '../data/academyData';

interface AcademicUpdatesBannerProps {
  onApplyProgramId: (programId: string) => void;
}

export function AcademicUpdatesBanner({ onApplyProgramId }: AcademicUpdatesBannerProps) {
  const [isPaused, setIsPaused] = useState(false);

  const renderTrackItems = (isDuplicate: boolean) =>
    ACADEMIC_UPDATES.map((item) => {
      const commonContent = (
        <>
          <span
            className={`font-semibold ${
              item.type === 'deadline' ? 'text-[#FFE3A3]' : 'text-[#A7E3B8]'
            }`}
          >
            {item.tagLabel}
          </span>
          <span className="text-white/45" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-white/85 tabular-nums">
            {item.dateText}
          </span>
          <span className="text-white/45" aria-hidden="true">
            ·
          </span>
          <span className="text-white font-medium group-hover:underline underline-offset-4">
            {item.headline}
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#C9F0D3] ml-1">
            <span>{item.actionLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </>
      );

      if (isDuplicate) {
        return (
          <button
            key={`dup-${item.id}`}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => onApplyProgramId(item.programId)}
            className="group inline-flex items-center gap-2 text-xs whitespace-nowrap shrink-0 pr-8 mr-8 border-r border-white/15 cursor-pointer"
          >
            {commonContent}
          </button>
        );
      }

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onApplyProgramId(item.programId)}
          className="group inline-flex items-center gap-2 text-xs whitespace-nowrap shrink-0 pr-8 mr-8 border-r border-white/15 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
        >
          {commonContent}
        </button>
      );
    });

  return (
    <section
      aria-label="Academic Updates"
      className="bg-[#0F3119] text-white border-b border-[#164424]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-11 flex items-center gap-3 sm:gap-4">
        {/* Label Anchor */}
        <div className="flex items-center gap-2 shrink-0 pr-2.5 sm:pr-4 border-r border-white/20">
          <CalendarClock className="h-4 w-4 text-[#C9F0D3] shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-tight text-white whitespace-nowrap">
            <span className="sm:hidden">Updates</span>
            <span className="hidden sm:inline">Academic Updates</span>
          </span>
        </div>

        {/* Continuous Marquee Viewport (Pauses on Hover, Focus, or Toggle) */}
        <div className="academic-marquee-viewport flex-1 min-w-0 overflow-hidden">
          <div
            data-testid="academic-updates-track"
            data-paused={isPaused ? 'true' : 'false'}
            className="academic-marquee-track items-center py-1"
          >
            <div className="flex items-center shrink-0">{renderTrackItems(false)}</div>
            <div className="flex items-center shrink-0" aria-hidden="true">
              {renderTrackItems(true)}
            </div>
          </div>
        </div>

        {/* Play / Pause Control */}
        <div className="shrink-0 pl-2 sm:pl-3 border-l border-white/20">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-pressed={isPaused}
            aria-label={isPaused ? 'Resume academic updates marquee' : 'Pause academic updates marquee'}
            className="inline-flex items-center justify-center gap-1.5 min-h-[36px] min-w-[36px] sm:min-w-0 px-2.5 py-1.5 text-[11px] font-medium text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPaused ? (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Resume</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Pause</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
