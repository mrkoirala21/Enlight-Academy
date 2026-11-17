import { ArrowRight, ArrowUpRight, HeartHandshake, HeartPulse, Stethoscope } from 'lucide-react';
import { COURSE_PROGRAMS, CourseProgram } from '../data/academyData';
import { PageRoute } from '../utils/academyLogic';
import { ServicesSection } from './ServicesSection';

interface HomeOverviewSectionsProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProgram: (program: CourseProgram) => void;
  onApplyProgram: (program: CourseProgram) => void;
  onApplyProgramId: (programId: string) => void;
}

const DIVISION_GATEWAYS: {
  route: PageRoute;
  index: string;
  title: string;
  summary: string;
  actionLabel: string;
}[] = [
  {
    route: 'programs',
    index: '01.',
    title: 'Programs',
    summary:
      'Browse all academic, clinical skill, and vocational training categories—including Nursing, Caregiver, CTEVT Short Courses, Fellowships, and Research.',
    actionLabel: `Browse All ${COURSE_PROGRAMS.length} Programmes`,
  },
  {
    route: 'licensure',
    index: '02.',
    title: 'Licensure',
    summary:
      'Targeted live classes, online question banks, and proctored mock tests for NNC, Next-Gen NCLEX-RN, NMC UK OSCE, and Middle East Prometric exams.',
    actionLabel: 'Explore Exam Blueprints',
  },
  {
    route: 'simulation',
    index: '03.',
    title: 'Simulation',
    summary:
      'Hands-on acute care labs in AHA/Non-AHA BLS & ACLS, Ventilator Workshop, Dialysis, OT Assistance, and FMG/IMG clinical observerships.',
    actionLabel: 'View Simulation & Labs',
  },
  {
    route: 'faculty',
    index: '04.',
    title: 'Faculty',
    summary:
      'Meet our physicians, ICU nurse educators, City & Guilds (UK) assessors, and biostatistics researchers guiding clinical competence.',
    actionLabel: 'Meet Our Faculty',
  },
  {
    route: 'admissions',
    index: '05.',
    title: 'Admissions',
    summary:
      'Enrol in upcoming live, online, or in-person simulation cohorts, review counselling hours, and submit your academic application.',
    actionLabel: 'Apply for Admission',
  },
];

export function HomeOverviewSections({
  onNavigate,
  onSelectProgram,
  onApplyProgram,
  onApplyProgramId,
}: HomeOverviewSectionsProps) {
  const blsAclsProgram = COURSE_PROGRAMS.find((p) => p.id === 'aha-non-aha-bls-acls');
  const caregiverProgram = COURSE_PROGRAMS.find((p) => p.id === 'city-guilds-caregiver');
  const criticalCareProgram = COURSE_PROGRAMS.find((p) => p.id === 'critical-care-nurse-training');

  return (
    <>
      {/* Dedicated Flagship Spotlight: ACLS, BLS & Caregiver Training */}
      <section className="py-16 bg-[#F7F9F7] border-b border-[#DCE3DE]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                Core Specialisations · Hands-On Certification Tracks
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
                ACLS, BLS &amp; Caregiver Training Programmes
              </h2>
              <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
                High-demand clinical life support certifications and internationally accredited caregiver pathways designed for hospital readiness and global placement.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('simulation')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Inspect Simulation Labs</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Highlight 1: ACLS & BLS Life Support (Spans 7 cols on desktop for visual anchor) */}
            <article className="lg:col-span-7 bg-[#164424] text-white rounded-xl p-7 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-xs text-white/80">
                  <span className="font-mono">EA-EMG-102 · AHA &amp; Non-AHA Tracks</span>
                  <HeartPulse className="h-5 w-5 text-white/90 shrink-0" aria-hidden="true" />
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold leading-snug text-balance">
                  AHA / Non-AHA BLS &amp; ACLS Resuscitation Training
                </h3>

                <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
                  Master single-rescuer and team Basic Life Support (BLS) alongside Advanced Cardiovascular Life Support (ACLS) megacode algorithms, defibrillation, airway rescue, and acute arrhythmia management using simulation manikins.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/20 text-xs">
                  <div>
                    <p className="text-white/70">BLS Core Skills</p>
                    <p className="font-medium text-white mt-0.5">
                      Adult/Pediatric CPR · AED · Choking Relief · Bag-Mask
                    </p>
                  </div>
                  <div>
                    <p className="text-white/70">ACLS Core Skills</p>
                    <p className="font-medium text-white mt-0.5">
                      Megacodes · Arrhythmia ECG · Code Team Leadership
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
                {blsAclsProgram && (
                  <button
                    type="button"
                    onClick={() => onSelectProgram(blsAclsProgram)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline cursor-pointer"
                  >
                    <span>View BLS &amp; ACLS Syllabus</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onApplyProgramId('aha-non-aha-bls-acls')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#164424] bg-white hover:bg-[#F1F5F2] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Apply for BLS / ACLS
                </button>
              </div>
            </article>

            {/* Highlight 2: Caregiver Training (Spans 5 cols) */}
            <article className="lg:col-span-5 bg-white border border-[#DCE3DE] rounded-xl p-7 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-xs text-[#0E5A5A]">
                  <span className="font-mono">EA-CG-301 · City &amp; Guilds (UK) &amp; CTEVT</span>
                  <HeartHandshake className="h-5 w-5 text-[#164424] shrink-0" aria-hidden="true" />
                </div>

                <h3 className="font-editorial text-2xl font-semibold text-[#102018] leading-snug">
                  Caregiver Training &amp; Age Care Diploma
                </h3>

                <p className="text-sm text-[#3E4F45] leading-relaxed">
                  Delivered as an approved City &amp; Guilds (UK) Health and Social Care training centre and CTEVT short-course provider—preparing caregivers with safe manual handling, dementia care, vital monitoring, and international portfolio readiness.
                </p>

                <ul className="pt-3 border-t border-[#EEF2EF] space-y-2 text-xs text-[#102018]">
                  <li>· Level 2 Diploma in Social &amp; Health Care (Age Care)</li>
                  <li>· Practical Bedside Mobility, Nutrition &amp; Safeguarding</li>
                  <li>· Pathways for UK, Europe, Japan &amp; Domestic Care</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EEF2EF] flex flex-wrap items-center justify-between gap-3">
                {caregiverProgram && (
                  <button
                    type="button"
                    onClick={() => onSelectProgram(caregiverProgram)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer"
                  >
                    <span>View Caregiver Syllabus</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onApplyProgramId('city-guilds-caregiver')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Apply for Caregiver
                </button>
              </div>
            </article>
          </div>

          {/* Supporting Acute & Critical Care Bridge Banner */}
          {criticalCareProgram && (
            <div className="bg-white border border-[#DCE3DE] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <Stethoscope className="h-5 w-5 text-[#164424] shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-xs font-mono text-[#0E5A5A]">
                    {criticalCareProgram.code} · {criticalCareProgram.duration}
                  </p>
                  <h3 className="font-editorial text-lg font-semibold text-[#102018]">
                    Combining BLS &amp; ACLS with Critical Care Nursing &amp; Ventilator Workshop
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3E4F45]">
                    Nurses and medical officers frequently pair BLS/ACLS certification with our 8-week Critical Care Nursing and Mechanical Ventilation workshops.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectProgram(criticalCareProgram)}
                  className="text-xs sm:text-sm font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap"
                >
                  View Syllabus
                </button>
                <button
                  type="button"
                  onClick={() => onApplyProgram(criticalCareProgram)}
                  className="px-4 py-2 text-xs font-semibold text-[#102018] bg-[#F7F9F7] hover:bg-[#164424] hover:text-white border border-[#DCE3DE] hover:border-[#164424] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Complete 9-Item Our Services Showcase */}
      <ServicesSection
        onSelectProgram={onSelectProgram}
        onApplyProgramId={onApplyProgramId}
        onNavigate={onNavigate}
      />

      {/* 5-Page Institutional Gateway Directory */}
      <section className="py-16 bg-[#F7F9F7]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Academic Structure · Explore by Division
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
              Navigate Enlight Academy’s Five Core Divisions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISION_GATEWAYS.map((item) => (
              <div
                key={item.route}
                className="bg-white border border-[#DCE3DE] hover:border-[#164424]/60 rounded-xl p-6 flex flex-col justify-between gap-6 transition-colors duration-150"
              >
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs font-medium text-[#164424] tabular-nums">
                      {item.index}
                    </span>
                    <h3 className="font-editorial text-xl font-semibold text-[#102018]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#3E4F45] leading-relaxed">{item.summary}</p>
                </div>

                <div className="pt-3 border-t border-[#EEF2EF]">
                  <button
                    type="button"
                    onClick={() => onNavigate(item.route)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
