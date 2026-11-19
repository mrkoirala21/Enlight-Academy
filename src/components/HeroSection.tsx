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
import { AcademyPhoto } from './AcademyPhoto';

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
  imageSrc: string;
  imageAlt: string;
  imageAspect: string;
  imagePosition?: string;
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
    imageSrc: '/assets/aistudio/image_2775743c.png',
    imageAlt:
      'Enlight Academy clinical team performing ACLS chest compressions and bag-mask airway resuscitation on simulation manikin',
    imageAspect: 'aspect-video',
    imagePosition: 'object-[50%_18%]',
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
    imageSrc: '/src/assets/images/acls_bls_simulation_lab_1794907974608.jpg',
    imageAlt:
      'Healthcare trainees performing hands-on Basic Life Support CPR and bag-mask ventilation drills in simulation lab',
    imageAspect: 'aspect-video',
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
    imageSrc: '/src/assets/images/caregiver_age_care_training_1794907975944.jpg',
    imageAlt:
      'City and Guilds UK Caregiver trainees checking vital signs and providing bedside age care under instructor supervision',
    imageAspect: 'aspect-video',
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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Headline & Core Institutional Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                {ACADEMY_FACTS.legalName} · {ACADEMY_FACTS.location} · City &amp; Guilds (UK) Approved Centre
              </p>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.12] text-[#102018] text-balance max-w-2xl">
                Clinical Life Support &amp; Certified Caregiver Training
              </h1>

              <p className="text-base sm:text-lg text-[#3E4F45] leading-relaxed max-w-xl">
                Nepal’s specialised medical simulation and test preparation academy for{' '}
                <strong className="font-semibold text-[#102018]">AHA/Non-AHA ACLS &amp; BLS</strong>,{' '}
                <strong className="font-semibold text-[#102018]">City &amp; Guilds (UK) Caregiver</strong>,
                CTEVT short courses, Critical Care Nursing, and global licensure exams.
              </p>
            </div>

            <div className="space-y-5">
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
            <div className="w-full bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-5 flex flex-col justify-between gap-3">
              {/* Institutional Seal + Track Switcher */}
              <div className="space-y-2.5 pb-2.5 border-b border-[#DCE3DE]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
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
                      <p className="text-xs text-[#4A5D52]">
                        Preview simulation &amp; modules
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
                className="space-y-3 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <AcademyPhoto
                    src={currentTrack.imageSrc}
                    alt={currentTrack.imageAlt}
                    aspectClass="aspect-[16/8.5]"
                    objectPositionClass={currentTrack.imagePosition ?? 'object-[50%_26%]'}
                  />

                  <div className="flex items-center justify-between gap-2 text-xs pt-1">
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

                  <ul className="space-y-1.5 pt-1 text-xs text-[#102018]">
                    {currentTrack.highlights.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#DCE3DE] space-y-2.5">
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
