import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  HeartPulse,
  Stethoscope,
} from 'lucide-react';
import {
  ACADEMY_FACTS,
  COURSE_PROGRAMS,
  CourseProgram,
  LICENSURE_TRACKS,
} from '../data/academyData';
import { PageRoute } from '../utils/academyLogic';
import { AcademyPhoto } from './AcademyPhoto';
import { ServicesSection } from './ServicesSection';
import { StudentTestimonials } from './StudentTestimonials';

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
              <div className="space-y-5">
                <AcademyPhoto
                  src="/assets/aistudio/image_2775743c.png"
                  alt="Instructors and clinicians performing AHA ACLS and BLS team resuscitation with bag-mask ventilation and chest compressions"
                  aspectClass="aspect-video"
                  objectPositionClass="object-[50%_18%]"
                />

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
                <AcademyPhoto
                  src="/src/assets/images/caregiver_age_care_training_1794907975944.jpg"
                  alt="City and Guilds UK Caregiver training candidates measuring patient blood pressure under clinical instructor assessment"
                  aspectClass="aspect-[4/3]"
                  objectPositionClass="object-[50%_24%]"
                />

                <div className="flex items-center justify-between gap-3 text-xs text-[#0E5A5A] pt-1">
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
            <div className="bg-white border border-[#DCE3DE] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 min-w-0">
                <AcademyPhoto
                  src="/src/assets/images/icu_ventilator_clinical_lab_1794907975520.jpg"
                  alt="Critical Care Nurse Educator demonstrating mechanical ventilator waveforms alongside intubated ICU simulation manikin"
                  aspectClass="aspect-[4/3]"
                  objectPositionClass="object-[50%_22%]"
                  className="w-full sm:w-44 shrink-0"
                />
                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-mono text-[#0E5A5A] flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5 text-[#164424] shrink-0" aria-hidden="true" />
                    <span>
                      {criticalCareProgram.code} · {criticalCareProgram.duration}
                    </span>
                  </p>
                  <h3 className="font-editorial text-lg font-semibold text-[#102018]">
                    Combining BLS &amp; ACLS with Critical Care Nursing &amp; Ventilator Workshop
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3E4F45] leading-relaxed">
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

      {/* Institutional Overview, Study Modes & Global Licensure Summary */}
      <section className="py-16 bg-[#F7F9F7] border-b border-[#DCE3DE]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                  Institutional Overview · {ACADEMY_FACTS.location}
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
                  Clinical Simulation Meets Global Exam &amp; Vocational Standards
                </h2>
                <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
                  {ACADEMY_FACTS.legalName} unites bedside simulation with rigorous test preparation across healthcare, research, and management. As a City &amp; Guilds (UK) approved training centre and CTEVT-affiliated short-course provider, we prepare nurses, doctors, and caregivers for domestic practice and international placement.
                </p>
              </div>

              <div className="bg-white border border-[#DCE3DE] rounded-xl divide-y divide-[#EEF2EF]">
                <div className="p-4 sm:px-5 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#102018]">
                      Live Classes, Online Courses &amp; Mock Tests
                    </p>
                    <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                      Daily interactive faculty sessions paired with recorded archives and timed mock exams.
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:px-5 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#102018]">
                      Approved City &amp; Guilds (UK) &amp; CTEVT Pathways
                    </p>
                    <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                      Accredited Level 2 Age Care diploma and competency-based CTEVT vocational short courses.
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:px-5 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#102018]">
                      Physician Fellowships &amp; FMG/IMG Observerships
                    </p>
                    <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                      Supervised hospital rotations, Regional Anesthesia, and Laparoscopic Simulation tracks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('faculty')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer"
                >
                  <span>Meet Our Clinical Faculty</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('licensure')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E5A5A] hover:underline cursor-pointer"
                >
                  <span>Compare Licensure Blueprints</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white border border-[#DCE3DE] rounded-xl p-6 sm:p-7 space-y-5">
              <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[#EEF2EF]">
                <div>
                  <p className="text-xs font-mono text-[#0E5A5A]">Exam Blueprints</p>
                  <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#102018] mt-1">
                    Global Nursing &amp; Medical Licensure
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('licensure')}
                  className="text-xs font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  All Tracks
                </button>
              </div>

              <div className="divide-y divide-[#EEF2EF]">
                {LICENSURE_TRACKS.map((track) => (
                  <div key={track.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-[#0E5A5A]">
                        {track.code} · {track.region}
                      </p>
                      <p className="text-sm font-semibold text-[#102018]">{track.name}</p>
                      <p className="text-xs text-[#4A5D52] leading-relaxed">{track.deliveryCadence}</p>
                    </div>
                    <span className="text-xs font-mono text-[#164424] shrink-0 text-right tabular-nums">
                      {track.mockSchedule.split(' ')[0]} Mocks
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Campus & Simulation Visual Strip */}
          <div className="pt-8 border-t border-[#DCE3DE] grid grid-cols-1 md:grid-cols-2 gap-8">
            <AcademyPhoto
              src="/src/assets/images/icu_ventilator_clinical_lab_1794907975520.jpg"
              alt="Critical Care nurse educator explaining mechanical ventilator loops and respiratory waveforms at Enlight Academy simulation bay"
              aspectClass="aspect-[4/3]"
              objectPositionClass="object-[50%_22%]"
              caption="Fig. 1 — Mechanical Ventilation & ICU Simulation Bay, Kathmandu"
            />
            <AcademyPhoto
              src="/src/assets/images/medical_licensure_seminar_1794907976431.jpg"
              alt="Senior clinical physician teaching cardiac ECG ST-elevation and ACLS management to white-coat trainees in Kathmandu lecture hall"
              aspectClass="aspect-[4/3]"
              objectPositionClass="object-[50%_24%]"
              caption="Fig. 2 — Live Faculty ECG & Licensure Exam Seminar"
            />
          </div>
        </div>
      </section>

      {/* Verified Licensure Pass Stories (Fetched Graduate Testimonials) */}
      <StudentTestimonials
        onNavigate={onNavigate}
        onApplyLicensure={() => onApplyProgramId('global-nursing-licensure')}
      />

      {/* 5-Page Institutional Gateway Directory + Direct Admissions Callout */}
      <section className="py-16 bg-[#F7F9F7]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Academic Structure · Explore by Division
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
              Navigate Enlight Academy’s Five Core Divisions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {DIVISION_GATEWAYS.map((item, idx) => (
              <div
                key={item.route}
                className={`bg-white border border-[#DCE3DE] hover:border-[#164424]/60 rounded-xl p-6 flex flex-col justify-between gap-6 transition-colors duration-150 ${
                  idx < 2 ? 'lg:col-span-3' : idx === 4 ? 'md:col-span-2 lg:col-span-2' : 'lg:col-span-2'
                }`}
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

                <div className="pt-3 border-t border-[#DCE3DE]">
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

          <div className="bg-[#164424] text-white rounded-xl p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono text-white/80 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Counselling Hours: {ACADEMY_FACTS.hours}</span>
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold leading-snug text-balance">
                Ready to Enrol in ACLS, BLS, Caregiver or Global Licensure?
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Reserve your seat for upcoming live classes, hands-on simulation lab rotations, or online mock test cohorts in {ACADEMY_FACTS.location}.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('admissions')}
                className="px-6 py-3 text-sm font-semibold text-[#164424] bg-white hover:bg-[#F1F5F2] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Open Admissions Form
              </button>
              <button
                type="button"
                onClick={() => onNavigate('programs')}
                className="px-5 py-3 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Browse All Courses
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
