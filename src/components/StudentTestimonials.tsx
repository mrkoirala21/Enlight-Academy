import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Quote, RefreshCw } from 'lucide-react';
import {
  countTestimonialsByExam,
  filterTestimonialsByExam,
  LicensureExamFilter,
  PageRoute,
  StudentTestimonial,
} from '../utils/academyLogic';

interface StudentTestimonialsProps {
  onNavigate: (route: PageRoute) => void;
  onApplyLicensure: () => void;
}

const EXAM_FILTER_TABS: { id: LicensureExamFilter; label: string }[] = [
  { id: 'all', label: 'All Exams' },
  { id: 'nclex', label: 'NCLEX-RN' },
  { id: 'osce', label: 'NMC UK OSCE' },
  { id: 'nnc', label: 'NNC Nepal' },
  { id: 'middle-east', label: 'Middle East' },
];

export function StudentTestimonials({
  onNavigate,
  onApplyLicensure,
}: StudentTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<StudentTestimonial[]>([]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<LicensureExamFilter>('all');
  const [retryToken, setRetryToken] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setErrorMessage('');

    fetch('/data/student-testimonials.json', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unable to load pass stories (${response.status}).`);
        }
        const payload = (await response.json()) as unknown;
        if (!Array.isArray(payload)) {
          throw new Error('Unexpected testimonial data format.');
        }
        setTestimonials(payload as StudentTestimonial[]);
        setStatus('loaded');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setErrorMessage(
          err instanceof Error ? err.message : 'Unable to load student testimonials right now.'
        );
        setStatus('error');
      });

    return () => controller.abort();
  }, [retryToken]);

  const counts = useMemo(() => countTestimonialsByExam(testimonials), [testimonials]);
  const visibleStories = useMemo(
    () => filterTestimonialsByExam(testimonials, selectedExam),
    [testimonials, selectedExam]
  );

  return (
    <section
      id="student-testimonials"
      aria-labelledby="student-testimonials-heading"
      className="py-16 bg-white border-b border-[#DCE3DE]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Student Testimonials · Verified Licensure Pass Stories
            </p>
            <h2
              id="student-testimonials-heading"
              className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance"
            >
              Graduates Passing National &amp; International Licensure Exams
            </h2>
            <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
              Stories from registered nurses and clinicians who completed Enlight Academy’s live classes, adaptive mock test series, and OSCE simulation labs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('licensure')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:underline cursor-pointer whitespace-nowrap"
            >
              <span>View Licensure Prep</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onApplyLicensure}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Join Next Licensure Cohort
            </button>
          </div>
        </div>

        {/* Exam Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EEF2EF]">
          <div
            role="tablist"
            aria-label="Filter student testimonials by licensure exam"
            className="flex flex-wrap items-center gap-1.5"
          >
            {EXAM_FILTER_TABS.map((tab) => {
              const isSelected = selectedExam === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedExam(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md border cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424] ${
                    isSelected
                      ? 'bg-[#164424] text-white border-[#164424]'
                      : 'bg-[#F7F9F7] text-[#3E4F45] border-[#DCE3DE] hover:border-[#164424]/50 hover:text-[#102018]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {status === 'loaded' && (
                    <span
                      className={`ml-1.5 font-mono tabular-nums ${
                        isSelected ? 'text-white/80' : 'text-[#56695E]'
                      }`}
                    >
                      ({counts[tab.id]})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#56695E] tabular-nums">
            {status === 'loaded'
              ? `Showing ${visibleStories.length} of ${testimonials.length} pass stories`
              : status === 'loading'
              ? 'Loading graduate outcomes...'
              : 'Story feed unavailable'}
          </p>
        </div>

        {/* Loading State */}
        {status === 'loading' && (
          <div
            aria-busy="true"
            aria-label="Loading student testimonials"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[0, 1, 2].map((skeletonIdx) => (
              <div
                key={skeletonIdx}
                className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 space-y-4 animate-pulse"
              >
                <div className="h-3 w-36 bg-[#DCE3DE] rounded" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-[#DCE3DE] rounded" />
                  <div className="h-3.5 w-5/6 bg-[#DCE3DE] rounded" />
                  <div className="h-3.5 w-4/6 bg-[#DCE3DE] rounded" />
                </div>
                <div className="pt-4 border-t border-[#DCE3DE] space-y-2">
                  <div className="h-3.5 w-40 bg-[#DCE3DE] rounded" />
                  <div className="h-3 w-48 bg-[#DCE3DE] rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div
            role="alert"
            className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#102018]">
                Could not load student pass stories
              </p>
              <p className="text-xs text-[#4A5D52]">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setRetryToken((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retry Loading</span>
            </button>
          </div>
        )}

        {/* Loaded Empty State */}
        {status === 'loaded' && visibleStories.length === 0 && (
          <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-[#102018]">
              No published pass stories match this exam filter yet.
            </p>
            <button
              type="button"
              onClick={() => setSelectedExam('all')}
              className="px-4 py-2 text-xs font-semibold text-[#164424] bg-white border border-[#DCE3DE] hover:border-[#164424] rounded-md cursor-pointer"
            >
              Show All Exam Stories
            </button>
          </div>
        )}

        {/* Loaded Testimonials Grid */}
        {status === 'loaded' && visibleStories.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="student-testimonials-grid"
          >
            {visibleStories.map((story) => (
              <article
                key={story.id}
                className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-xs font-mono text-[#0E5A5A]">
                      <span>{story.examLabel}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="tabular-nums">{story.passedYear}</span>
                    </div>
                    <Quote className="h-4 w-4 text-[#164424]/60 shrink-0 mt-0.5" aria-hidden="true" />
                  </div>

                  <blockquote className="text-sm text-[#102018] leading-relaxed">
                    “{story.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#DCE3DE] space-y-2.5">
                  <div>
                    <p className="font-editorial text-base font-semibold text-[#102018]">
                      {story.studentName}
                    </p>
                    <p className="text-xs text-[#4A5D52]">
                      {story.role} · {story.organization}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EEF2EF] space-y-0.5 text-xs">
                    <p className="font-semibold text-[#164424]">{story.outcome}</p>
                    <p className="text-[#56695E]">{story.studyMode}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
