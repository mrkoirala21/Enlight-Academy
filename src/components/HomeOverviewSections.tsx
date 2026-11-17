import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
  const featuredPrograms = COURSE_PROGRAMS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <ServicesSection
        onSelectProgram={onSelectProgram}
        onApplyProgramId={onApplyProgramId}
        onNavigate={onNavigate}
      />

      {/* 5-Page Institutional Gateway Directory */}
      <section className="py-16 bg-white border-b border-[#DCE3DE]">
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
                className="bg-[#F7F9F7] border border-[#DCE3DE] hover:border-[#164424]/60 rounded-xl p-6 flex flex-col justify-between gap-6 transition-colors duration-150"
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
        </div>
      </section>

      {/* Flagship Featured Programmes Preview */}
      <section className="py-16 bg-[#F7F9F7]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                Featured Clinical &amp; Licensure Tracks
              </p>
              <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[#102018]">
                Flagship Training Cohorts
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>View All {COURSE_PROGRAMS.length} Programmes</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPrograms.map((program) => (
              <article
                key={program.id}
                className="bg-white border border-[#DCE3DE] rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#4A5D52]">
                    <span className="font-mono font-medium text-[#164424]">{program.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{program.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{program.duration}</span>
                  </div>
                  <h3 className="font-editorial text-xl font-semibold text-[#102018]">
                    {program.title}
                  </h3>
                  <p className="text-sm text-[#3E4F45] leading-relaxed">{program.subtitle}</p>
                </div>

                <div className="pt-4 border-t border-[#EEF2EF] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProgram(program)}
                    aria-label={`View syllabus for ${program.title}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onApplyProgram(program)}
                    aria-label={`Apply for ${program.title}`}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
