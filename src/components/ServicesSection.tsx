import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { COURSE_PROGRAMS, CourseProgram, OUR_SERVICES } from '../data/academyData';
import { PageRoute } from '../utils/academyLogic';

interface ServicesSectionProps {
  onSelectProgram: (program: CourseProgram) => void;
  onApplyProgramId: (programId: string) => void;
  onNavigate?: (route: PageRoute) => void;
}

export function ServicesSection({
  onSelectProgram,
  onApplyProgramId,
  onNavigate,
}: ServicesSectionProps) {
  const findProgram = (programId: string) =>
    COURSE_PROGRAMS.find((p) => p.id === programId);

  return (
    <section id="services" className="py-16 bg-white border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Clinical Workshops, Short Courses &amp; Fellowships
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
              Our Services
            </h2>
            <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
              Practical skill-based healthcare training, resuscitation certifications, CTEVT-affiliated short courses, and postgraduate clinical fellowships.
            </p>
          </div>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Full Course Directory</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="our-services-grid">
          {OUR_SERVICES.map((service) => {
            const linkedProgram = findProgram(service.programId);
            const isExtended = Boolean(service.subTracks && service.subTracks.length > 0);

            return (
              <article
                key={service.number}
                className={`bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 flex flex-col justify-between gap-5 ${
                  isExtended ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#4A5D52]">
                    <span className="font-mono font-medium text-[#164424] tabular-nums">
                      {service.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{service.categoryLabel}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-semibold text-[#102018] leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#3E4F45] leading-relaxed max-w-3xl">
                    {service.summary}
                  </p>

                  {service.subTracks && (
                    <div className="pt-4 border-t border-[#DCE3DE] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-[#DCE3DE]">
                      {service.subTracks.map((sub, idx) => {
                        const subProgram = findProgram(sub.programId);
                        return (
                          <div
                            key={sub.programId}
                            className={`flex flex-col justify-between gap-3 ${
                              idx === 0
                                ? 'md:pr-6'
                                : idx === 1
                                ? 'md:px-6'
                                : 'md:pl-6'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-mono text-[#0E5A5A]">
                                {subProgram?.code}
                              </p>
                              <h4 className="font-semibold text-sm text-[#102018] mt-1 leading-snug">
                                {sub.title}
                              </h4>
                              {subProgram && (
                                <p className="text-xs text-[#4A5D52] mt-1 leading-relaxed">
                                  {subProgram.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-2">
                              {subProgram && (
                                <button
                                  type="button"
                                  onClick={() => onSelectProgram(subProgram)}
                                  aria-label={`View syllabus for ${sub.title}`}
                                  className="text-xs font-semibold text-[#164424] hover:underline cursor-pointer"
                                >
                                  View Syllabus
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => onApplyProgramId(sub.programId)}
                                aria-label={`Apply for ${sub.title}`}
                                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#DCE3DE] flex items-center justify-between gap-3">
                  {linkedProgram && (
                    <button
                      type="button"
                      onClick={() => onSelectProgram(linkedProgram)}
                      aria-label={`View syllabus for ${service.title}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      <span>View Syllabus</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onApplyProgramId(service.programId)}
                    aria-label={`Apply for ${service.title}`}
                    className="px-3.5 py-2 text-xs font-semibold text-[#102018] bg-white hover:bg-[#164424] hover:text-white border border-[#DCE3DE] hover:border-[#164424] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
