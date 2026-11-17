import { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { CourseProgram } from '../data/academyData';

interface ProgramDetailModalProps {
  program: CourseProgram | null;
  onClose: () => void;
  onApply: (program: CourseProgram) => void;
}

export function ProgramDetailModal({ program, onClose, onApply }: ProgramDetailModalProps) {
  useEffect(() => {
    if (!program) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [program, onClose]);

  if (!program) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-program-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white border border-[#DCE3DE] rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-xl space-y-6 my-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EEF2EF]">
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#0E5A5A]">
              {program.code} · {program.category} · {program.duration}
            </p>
            <h2 id="modal-program-title" className="font-editorial text-2xl font-semibold text-[#102018]">
              {program.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close syllabus details"
            className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-[#DCE3DE] text-[#3E4F45] hover:bg-[#F7F9F7] hover:text-[#102018] shrink-0 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-[#3E4F45] leading-relaxed">{program.summary}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-[#DCE3DE] text-xs">
            <div>
              <dt className="text-[#56695E]">Target Cadre / Eligibility</dt>
              <dd className="font-medium text-[#102018] mt-0.5">{program.targetAudience}</dd>
            </div>
            <div>
              <dt className="text-[#56695E]">Accreditation &amp; Alignment</dt>
              <dd className="font-medium text-[#102018] mt-0.5">{program.affiliation}</dd>
            </div>
            <div>
              <dt className="text-[#56695E]">Delivery Modes</dt>
              <dd className="font-medium text-[#102018] mt-0.5">{program.deliveryModes.join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-[#56695E]">Cohort Duration</dt>
              <dd className="font-medium text-[#102018] mt-0.5 tabular-nums">{program.duration}</dd>
            </div>
          </dl>

          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold text-[#102018]">Core Syllabus Modules</h3>
            <ul className="divide-y divide-[#EEF2EF] border-t border-b border-[#EEF2EF]">
              {program.syllabusModules.map((moduleName) => (
                <li key={moduleName} className="py-2.5 text-sm text-[#3E4F45]">
                  {moduleName}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#102018]">Competency Outcomes</h3>
            <ul className="space-y-1.5">
              {program.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-[#3E4F45]">
                  <Check className="h-4 w-4 text-[#164424] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EEF2EF] flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-[#3E4F45] bg-[#F7F9F7] hover:bg-[#EDF2EE] border border-[#DCE3DE] rounded-md cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApply(program)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            Apply for This Programme
          </button>
        </div>
      </div>
    </div>
  );
}
