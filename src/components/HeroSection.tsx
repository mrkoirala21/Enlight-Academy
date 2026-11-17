import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Compass,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMY_FACTS, COURSE_PROGRAMS, CourseProgram } from '../data/academyData';

interface HeroSectionProps {
  onBrowsePrograms: () => void;
  onOpenApply: () => void;
  onSelectProgram: (program: CourseProgram) => void;
  onApplyProgramId: (programId: string) => void;
}

type SpotlightKey = 'acls' | 'bls' | 'caregiver';

interface SpotlightTrack {
  key: SpotlightKey;
  tabLabel: string;
  code: string;
  title: string;
  subtitle: string;
  duration: string;
  pathway: string;
  highlights: string[];
  programId: string;
}

const SPOTLIGHT_TRACKS: SpotlightTrack[] = [
  {
    key: 'acls',
    tabLabel: 'ACLS',
    code: 'EA-EMG-102 · Advanced Resuscitation',
    title: 'Advanced Cardiovascular Life Support (ACLS)',
    subtitle:
      'Megacode team resuscitation, 12-lead arrhythmia recognition, airway management, and post-cardiac arrest care.',
    duration: '3 – 5 Days Simulation',
    pathway: 'AHA & Non-AHA Provider Tracks',
    highlights: [
      'Bradycardia, Tachycardia & Cardiac Arrest Algorithms',
      'Synchronized Cardioversion & Defibrillation Drills',
      'Closed-Loop Resuscitation Team Debriefing',
    ],
    programId: 'aha-non-aha-bls-acls',
  },
  {
    key: 'bls',
    tabLabel: 'BLS',
    code: 'EA-EMG-102 · Core Resuscitation',
    title: 'Basic Life Support (BLS) & AED Training',
    subtitle:
      'High-quality adult, child, and infant chest compressions, bag-mask ventilation, AED deployment, and choking rescue.',
    duration: '1 – 2 Days Hands-On',
    pathway: 'Healthcare Providers & Responders',
    highlights: [
      'Compression Depth, Recoil & Ratio Feedback Manikins',
      'Single-Rescuer & Two-Rescuer Team CPR Flows',
      'Rapid AED Rhythm Analysis & Safe Shock Delivery',
    ],
    programId: 'aha-non-aha-bls-acls',
  },
  {
    key: 'caregiver',
    tabLabel: 'Caregiver',
    code: 'EA-CG-301 · City & Guilds (UK) & CTEVT',
    title: 'Caregiver Training & Level 2 Age Care Diploma',
    subtitle:
      'Internationally recognised UK Health & Social Care qualification alongside practical CTEVT-aligned caregiver competencies.',
    duration: '16 Weeks + Portfolio',
    pathway: 'City & Guilds (UK) Level 2 Approved',
    highlights: [
      'Safe Manual Handling, Mobility & Fall Prevention',
      'Dementia Support, Nutrition & Safeguarding Standards',
      'Global Readiness for UK, Europe & Japan Care Roles',
    ],
    programId: 'city-guilds-caregiver',
  },
];

export function HeroSection({
  onBrowsePrograms,
  onOpenApply,
  onSelectProgram,
  onApplyProgramId,
}: HeroSectionProps) {
  const [activeSpotlight, setActiveSpotlight] = useState<SpotlightKey>('acls');
  const currentTrack =
    SPOTLIGHT_TRACKS.find((item) => item.key === activeSpotlight) ?? SPOTLIGHT_TRACKS[0];
  const linkedProgram = COURSE_PROGRAMS.find((p) => p.id === currentTrack.programId);

  return (
    <section id="top" className="bg-white border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Core Institutional Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                {ACADEMY_FACTS.legalName} · {ACADEMY_FACTS.location} · City &amp; Guilds (UK) Approved Centre
              </p>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-[#102018] text-balance max-w-2xl">
                Clinical Life Support &amp; Certified Caregiver Training
              </h1>

              <p className="text-base sm:text-lg text-[#3E4F45] leading-relaxed max-w-xl">
                Nepal’s specialised medical simulation and test preparation academy for{' '}
                <strong className="font-semibold text-[#102018]">AHA/Non-AHA ACLS &amp; BLS</strong>,{' '}
                <strong className="font-semibold text-[#102018]">City &amp; Guilds (UK) Caregiver</strong>,
                CTEVT short courses, Critical Care Nursing, and global licensure exams.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onApplyProgramId('aha-non-aha-bls-acls')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
                >
                  <span>Enrol in ACLS, BLS or Caregiver</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onBrowsePrograms}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#164424] bg-[#F7F9F7] hover:bg-[#EDF2EE] border border-[#DCE3DE] rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
                >
                  Browse All {COURSE_PROGRAMS.length} Programmes
                </button>
              </div>

              <div className="pt-4 border-t border-[#DCE3DE] grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-x-2.5 gap-y-1.5 text-xs text-[#4A5D52]">
                <span>AHA / Non-AHA ACLS &amp; BLS</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>City &amp; Guilds (UK) Caregiver</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>Ventilator &amp; Dialysis Labs</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>NNC, NCLEX-RN &amp; OSCE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive ACLS / BLS / Caregiver Showcase Card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-5">
              {/* Institutional Seal + Track Switcher */}
              <div className="space-y-4 pb-4 border-b border-[#DCE3DE]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                      <img
                        src={ACADEMY_FACTS.logoPath}
                        alt="Official seal of Enlight Academy Pvt. Ltd."
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-editorial text-sm font-semibold text-[#102018] truncate">
                        Flagship Cohorts 2026
                      </p>
                      <p className="text-xs text-[#4A5D52] truncate">
                        Select a track to preview modules
                      </p>
                    </div>
                  </div>
                </div>

                {/* Segmented Switcher for ACLS / BLS / Caregiver */}
                <div
                  role="tablist"
                  aria-label="Featured ACLS, BLS and Caregiver tracks"
                  className="grid grid-cols-3 gap-1.5 p-1 bg-white border border-[#DCE3DE] rounded-lg"
                >
                  {SPOTLIGHT_TRACKS.map((track) => {
                    const isSelected = track.key === activeSpotlight;
                    return (
                      <button
                        key={track.key}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveSpotlight(track.key)}
                        className={`py-2 px-2 text-xs font-semibold rounded-md cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424] ${
                          isSelected
                            ? 'bg-[#164424] text-white'
                            : 'text-[#3E4F45] hover:text-[#102018] hover:bg-[#F7F9F7]'
                        }`}
                      >
                        {track.tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Track Preview Panel */}
              <div
                role="tabpanel"
                aria-label={`${currentTrack.title} summary`}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[#0E5A5A]">{currentTrack.code}</span>
                    {currentTrack.key === 'acls' && (
                      <Activity className="h-4 w-4 text-[#164424] shrink-0" aria-hidden="true" />
                    )}
                    {currentTrack.key === 'bls' && (
                      <HeartPulse className="h-4 w-4 text-[#164424] shrink-0" aria-hidden="true" />
                    )}
                    {currentTrack.key === 'caregiver' && (
                      <HeartHandshake className="h-4 w-4 text-[#164424] shrink-0" aria-hidden="true" />
                    )}
                  </div>

                  <h2 className="font-editorial text-xl font-semibold text-[#102018] leading-snug">
                    {currentTrack.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#3E4F45] leading-relaxed">
                    {currentTrack.subtitle}
                  </p>

                  {/* Visual Waveform for ACLS/BLS or Caregiver Competency Bar */}
                  {currentTrack.key !== 'caregiver' ? (
                    <svg
                      viewBox="0 0 360 52"
                      className="w-full h-11 text-[#164424]"
                      role="img"
                      aria-label="Resuscitation and cardiac rhythm waveform"
                    >
                      <line x1="0" y1="28" x2="360" y2="28" stroke="#DCE3DE" strokeWidth="1" />
                      <path
                        d={
                          currentTrack.key === 'acls'
                            ? 'M0 28 L34 28 L42 24 L50 28 L60 28 L66 34 L74 6 L82 44 L90 28 L108 28 L118 20 L130 28 L184 28 L192 24 L200 28 L210 28 L216 34 L224 6 L232 44 L240 28 L258 28 L268 20 L280 28 L360 28'
                            : 'M0 28 L30 28 L42 14 L54 28 L92 28 L104 14 L116 28 L154 28 L166 14 L178 28 L216 28 L228 14 L240 28 L278 28 L290 14 L302 28 L360 28'
                        }
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div className="py-2 border-t border-b border-[#DCE3DE] flex items-center justify-between text-xs text-[#3E4F45]">
                      <span>UK Level 2 Health &amp; Social Care</span>
                      <span className="font-mono text-[#164424]">Practical + Portfolio</span>
                    </div>
                  )}

                  <ul className="space-y-1.5 pt-1 text-xs text-[#102018]">
                    {currentTrack.highlights.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#DCE3DE] space-y-3">
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="text-[#56695E]">{currentTrack.pathway}</span>
                    <span className="font-mono font-medium text-[#102018] tabular-nums">
                      {currentTrack.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {linkedProgram && (
                      <button
                        type="button"
                        onClick={() => onSelectProgram(linkedProgram)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#164424] hover:underline cursor-pointer"
                      >
                        <span>View Full Syllabus</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onApplyProgramId(currentTrack.programId)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Apply for {currentTrack.tabLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Institutional Proof & Operational Strip directly below Hero Split */}
      <div className="bg-[#F7F9F7] border-t border-[#DCE3DE]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <HeartPulse className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018]">AHA / Non-AHA BLS &amp; ACLS</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Simulation-led CPR, AED, airway management &amp; cardiac arrest megacode drills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018]">City &amp; Guilds (UK) Caregiver</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Approved training centre for Level 2 Diploma in Social &amp; Health Care (Age Care).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018]">CTEVT &amp; Global Licensure</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                CTEVT short courses, NNC, NCLEX-RN, NMC OSCE, and clinical fellowships.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Compass className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018] tabular-nums">
                9,800+ Learner Community
              </p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Live classes, online courses &amp; mock tests;{' '}
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="font-medium text-[#164424] hover:underline cursor-pointer"
                >
                  book counselling
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
