import { ArrowRight, BookOpenCheck, Compass, GraduationCap, ShieldCheck } from 'lucide-react';
import { ACADEMY_FACTS } from '../data/academyData';

interface HeroSectionProps {
  onBrowsePrograms: () => void;
  onOpenApply: () => void;
}

export function HeroSection({ onBrowsePrograms, onOpenApply }: HeroSectionProps) {
  return (
    <section id="top" className="bg-white border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Core Institutional Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                {ACADEMY_FACTS.legalName} · {ACADEMY_FACTS.location} · Health, Nursing &amp; Medical Simulation
              </p>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-[#102018] text-balance max-w-2xl">
                Complete Medical Training and Global Licensure Preparation
              </h1>

              <p className="text-base sm:text-lg text-[#3E4F45] leading-relaxed max-w-xl">
                An approved City &amp; Guilds (UK) health and social care centre and CTEVT-aligned institution in Nepal, preparing nurses, doctors, caregivers, and allied health clinicians through simulation labs, live classes, online courses, and proctored mock tests.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onBrowsePrograms}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
                >
                  <span>Explore Programmes &amp; Services</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenApply}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#164424] bg-[#F7F9F7] hover:bg-[#EDF2EE] border border-[#DCE3DE] rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
                >
                  Request Academic Consultation
                </button>
              </div>

              <div className="pt-4 border-t border-[#DCE3DE] grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-x-3 gap-y-1.5 text-xs text-[#4A5D52]">
                <span>City &amp; Guilds (UK) Level 2 Age Care</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>NNC, NCLEX-RN &amp; NMC OSCE</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>FMG/IMG Clinical Observerships</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>Emergency, Trauma &amp; Cardiology</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Institutional Crest & Simulation Overview Panel */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#DCE3DE]">
                <div className="flex items-center gap-3.5">
                  <div className="h-14 w-14 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={ACADEMY_FACTS.logoPath}
                      alt="Official seal of Enlight Academy Pvt. Ltd."
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-editorial text-base font-semibold text-[#102018]">
                      Enlight Academy Pvt. Ltd.
                    </p>
                    <p className="text-xs text-[#4A5D52] mt-0.5">
                      Skill-Based Healthcare, IT &amp; Management
                    </p>
                  </div>
                </div>
              </div>

              {/* Clean Clinical Telemetry / ECG Waveform & Simulation Cadence Section */}
              <div className="py-1 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#4A5D52]">
                  <span className="font-medium text-[#102018]">Clinical Simulation &amp; Exam Lab</span>
                  <span className="font-mono tabular-nums">2026 Cohorts Open</span>
                </div>

                <svg
                  viewBox="0 0 360 64"
                  className="w-full h-14 text-[#164424]"
                  role="img"
                  aria-label="Clinical ECG waveform illustration representing cardiology and critical care simulation"
                >
                  <line x1="0" y1="36" x2="360" y2="36" stroke="#DCE3DE" strokeWidth="1" />
                  <path
                    d="M0 36 L42 36 L50 32 L58 36 L68 36 L74 42 L82 10 L90 52 L98 36 L112 36 L122 28 L134 36 L190 36 L198 32 L206 36 L216 36 L222 42 L230 10 L238 52 L246 36 L260 36 L270 28 L282 36 L360 36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#DCE3DE] text-xs">
                  <div>
                    <p className="text-[#56695E]">Acute Care Tracks</p>
                    <p className="font-medium text-[#102018] mt-0.5">Critical Care · Trauma · ECG</p>
                  </div>
                  <div>
                    <p className="text-[#56695E]">Assessment Format</p>
                    <p className="font-medium text-[#102018] mt-0.5">OSCE Stations &amp; CAT Mocks</p>
                  </div>
                </div>
              </div>

              {/* Structured Quick Directory inside Right Panel */}
              <div className="space-y-2.5 text-sm border-t border-[#DCE3DE] pt-4">
                <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-[#DCE3DE]/70">
                  <span className="text-[#3E4F45]">UK Vocational Pathway</span>
                  <span className="font-medium text-[#102018] text-right">City &amp; Guilds Level 2</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-[#DCE3DE]/70">
                  <span className="text-[#3E4F45]">National Accreditation</span>
                  <span className="font-medium text-[#102018] text-right">CTEVT &amp; NNC Aligned</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-1.5">
                  <span className="text-[#3E4F45]">Medical Graduate Track</span>
                  <span className="font-medium text-[#102018] text-right">FMG / IMG Observerships</span>
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
            <ShieldCheck className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018]">City &amp; Guilds (UK) Approved</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Approved training centre for Level 2 Diploma in Social &amp; Health Care (Age Care).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018]">CTEVT &amp; Licensure Aligned</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Dedicated tracks for CTEVT programmes, NNC, NCLEX-RN, NMC OSCE, and Middle East exams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BookOpenCheck className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018]">Live, Online &amp; Mock Tests</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Interactive live classes paired with recorded online modules and timed mock exams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Compass className="h-5 w-5 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#102018] tabular-nums">9,800+ Learner Community</p>
              <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                Expanding from core healthcare education into research, IT, and management skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
