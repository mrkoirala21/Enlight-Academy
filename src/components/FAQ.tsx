import { useState } from 'react';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { ACADEMY_FACTS, ACADEMY_FAQS } from '../data/academyData';
import {
  buildWhatsAppUrl,
  countFaqsByTopic,
  FaqTopicFilter,
  filterFaqsByTopic,
} from '../utils/academyLogic';

interface FAQProps {
  onSelectProgramForAdmissions?: (programId: string) => void;
}

const FAQ_TABS: { id: FaqTopicFilter; label: string }[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'enrollment', label: 'Enrollment' },
  { id: 'certification', label: 'Certification Validity' },
  { id: 'prerequisites', label: 'Prerequisites' },
];

export function FAQ({ onSelectProgramForAdmissions }: FAQProps) {
  const [activeTopic, setActiveTopic] = useState<FaqTopicFilter>('all');
  const [openFaqId, setOpenFaqId] = useState<string>(ACADEMY_FAQS[0]?.id ?? '');

  const topicCounts = countFaqsByTopic(ACADEMY_FAQS);
  const filteredFaqs = filterFaqsByTopic(ACADEMY_FAQS, activeTopic);

  const handleSelectTopic = (topic: FaqTopicFilter) => {
    setActiveTopic(topic);
    const nextList = filterFaqsByTopic(ACADEMY_FAQS, topic);
    if (nextList.length > 0 && !nextList.some((item) => item.id === openFaqId)) {
      setOpenFaqId(nextList[0].id);
    }
  };

  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="admissions-faq-heading"
      className="py-14 lg:py-16 bg-[#F7F9F7] border-t border-[#DCE3DE]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Admissions Guidance · Enrollment, Credentials &amp; Entry Criteria
            </p>
            <h2
              id="admissions-faq-heading"
              className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
              Clear answers on batch enrollment, AHA/Non-AHA &amp; City &amp; Guilds (UK) certification validity, and academic prerequisites for clinical and licensure tracks.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(
              ACADEMY_FACTS.whatsappNumber,
              'Hello Enlight Academy Admissions Team, I have a question about eligibility and upcoming batches.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#157347] bg-white hover:bg-[#EDF2EE] border border-[#DCE3DE] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Ask on WhatsApp ({ACADEMY_FACTS.whatsappNumber})</span>
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="Filter frequently asked questions by topic"
            className="flex flex-wrap items-center gap-2"
          >
            {FAQ_TABS.map((tab) => {
              const isSelected = activeTopic === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectTopic(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424] ${
                    isSelected
                      ? 'bg-[#164424] text-white'
                      : 'bg-white text-[#3E4F45] border border-[#DCE3DE] hover:border-[#164424]/50 hover:text-[#102018]'
                  }`}
                >
                  {tab.label}{' '}
                  <span
                    className={`ml-1 font-mono tabular-nums ${
                      isSelected ? 'text-white/80' : 'text-[#56695E]'
                    }`}
                  >
                    ({topicCounts[tab.id]})
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#56695E] tabular-nums">
            Showing {filteredFaqs.length} of {ACADEMY_FAQS.length} questions
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="bg-white border border-[#DCE3DE] rounded-xl divide-y divide-[#EEF2EF]">
          {filteredFaqs.map((item) => {
            const isExpanded = openFaqId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-trigger-${item.id}`;

            return (
              <div key={item.id} className="p-5 sm:px-7 sm:py-5">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => handleToggleFaq(item.id)}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424] rounded"
                  >
                    <div className="space-y-1">
                      <span className="block font-mono text-[11px] font-medium text-[#0E5A5A]">
                        {item.categoryLabel}
                      </span>
                      <span className="block font-editorial text-base sm:text-lg font-semibold text-[#102018] group-hover:text-[#164424] transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-[#4A5D52] shrink-0 mt-1 transition-transform duration-150 ${
                        isExpanded ? 'rotate-180 text-[#164424]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isExpanded && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="mt-3 pt-3 border-t border-[#EEF2EF] space-y-3"
                  >
                    <p className="text-sm text-[#3E4F45] leading-relaxed max-w-4xl">
                      {item.answer}
                    </p>

                    {item.relatedProgramId && onSelectProgramForAdmissions && (
                      <div className="flex flex-wrap items-center gap-4 pt-0.5">
                        <button
                          type="button"
                          onClick={() => onSelectProgramForAdmissions(item.relatedProgramId!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164424] hover:underline cursor-pointer"
                        >
                          <span>
                            Pre-select {item.relatedProgramLabel ?? 'programme'} in Admissions Form
                          </span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
