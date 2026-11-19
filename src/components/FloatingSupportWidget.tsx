import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, MessageSquare, Send, X } from 'lucide-react';
import {
  ACADEMY_FACTS,
  COURSE_PROGRAMS,
  CourseProgram,
  LICENSURE_TRACKS,
} from '../data/academyData';
import {
  BotReply,
  buildWhatsAppUrl,
  generateBotReply,
  PageRoute,
} from '../utils/academyLogic';

interface FloatingSupportWidgetProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProgram: (program: CourseProgram) => void;
  onApplyProgramId: (programId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  replyMeta?: BotReply;
}

const QUICK_PROMPTS = [
  'ACLS & BLS batch details',
  'Caregiver (City & Guilds)',
  'NCLEX-RN / NNC / OSCE',
  'Critical Care & Ventilator',
  'Fees & counselling hours',
];

function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function FloatingSupportWidget({
  onNavigate,
  onSelectProgram,
  onApplyProgramId,
}: FloatingSupportWidgetProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Namaste! I am the Enlight Academy Admissions Assistant. Ask about AHA/Non-AHA ACLS & BLS, City & Guilds Caregiver, Critical Care, CTEVT short courses, Fellowships, or Licensure exams—or message our counsellors on WhatsApp (${ACADEMY_FACTS.whatsappNumber}).`,
      replyMeta: {
        text: '',
        suggestedRoute: 'admissions',
        whatsappPrefill:
          'Hello Enlight Academy, I would like information about your courses and upcoming batches.',
      },
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isChatOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (!isChatOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);

  const sendQuery = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    const licensureNames = LICENSURE_TRACKS.map((t) => t.name);
    const botReply = generateBotReply(
      trimmed,
      COURSE_PROGRAMS,
      licensureNames,
      ACADEMY_FACTS.whatsappNumber,
      ACADEMY_FACTS.hours
    );

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${messages.length}`,
      sender: 'user',
      text: trimmed,
    };

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}-${messages.length + 1}`,
      sender: 'bot',
      text: botReply.text,
      replyMeta: botReply,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuery(inputValue);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => inputRef.current?.focus(), 60);
      }
      return next;
    });
  };

  const defaultWhatsAppHref = buildWhatsAppUrl(
    ACADEMY_FACTS.whatsappNumber,
    'Hello Enlight Academy, I would like information about upcoming training cohorts and admissions.'
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Interactive Chatbot Panel */}
      {isChatOpen && (
        <section
          role="dialog"
          aria-label="Enlight Academy Admissions Chatbot"
          className="w-[calc(100vw-2rem)] max-w-[380px] bg-white border border-[#DCE3DE] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[min(560px,calc(100vh-6.75rem))]"
        >
          {/* Header */}
          <div className="bg-[#164424] text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-md bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src={ACADEMY_FACTS.logoPath}
                  alt="Enlight Academy emblem"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-editorial text-sm font-semibold leading-tight truncate">
                  Enlight Academy Assistant
                </h2>
                <p className="text-[11px] text-white/80 font-mono tabular-nums truncate">
                  WhatsApp Desk · {ACADEMY_FACTS.whatsappIntl}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chatbot"
              className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages Feed */}
          <div
            ref={scrollContainerRef}
            role="log"
            aria-live="polite"
            className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F7F9F7]"
          >
            {messages.map((msg) => {
              const matchedProgram = msg.replyMeta?.matchedProgramId
                ? COURSE_PROGRAMS.find((p) => p.id === msg.replyMeta?.matchedProgramId)
                : undefined;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[92%] rounded-lg px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#164424] text-white'
                        : 'bg-white border border-[#DCE3DE] text-[#102018]'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.sender === 'bot' && msg.replyMeta && (
                      <div className="mt-2 pt-2 border-t border-[#EEF2EF] flex flex-wrap items-center gap-1.5">
                        {matchedProgram && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectProgram(matchedProgram);
                              setIsChatOpen(false);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#164424] bg-[#F1F5F2] hover:bg-[#E4ECE6] rounded transition-colors cursor-pointer"
                          >
                            <span>View Syllabus</span>
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </button>
                        )}

                        {matchedProgram ? (
                          <button
                            type="button"
                            onClick={() => {
                              onApplyProgramId(matchedProgram.id);
                              setIsChatOpen(false);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded transition-colors cursor-pointer"
                          >
                            <span>Apply Now</span>
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </button>
                        ) : (
                          msg.replyMeta.suggestedRoute && (
                            <button
                              type="button"
                              onClick={() => {
                                onNavigate(msg.replyMeta!.suggestedRoute!);
                                setIsChatOpen(false);
                              }}
                              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#164424] bg-[#F1F5F2] hover:bg-[#E4ECE6] rounded transition-colors cursor-pointer"
                            >
                              <span>
                                Open{' '}
                                {msg.replyMeta.suggestedRoute === 'admissions'
                                  ? 'Admissions'
                                  : 'Directory'}
                              </span>
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </button>
                          )
                        )}

                        <a
                          href={buildWhatsAppUrl(
                            ACADEMY_FACTS.whatsappNumber,
                            msg.replyMeta.whatsappPrefill
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#115C38] bg-[#EBF7F0] hover:bg-[#D9EFE2] rounded transition-colors"
                        >
                          <WhatsAppIcon className="h-3 w-3" />
                          <span>WhatsApp {ACADEMY_FACTS.whatsappNumber}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Topic Chips + Composer + Direct WhatsApp Bar */}
          <div className="bg-white border-t border-[#DCE3DE] p-3 space-y-2.5 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendQuery(prompt)}
                  className="px-2.5 py-1 text-[11px] font-medium text-[#164424] bg-[#F7F9F7] hover:bg-[#EDF2EE] border border-[#DCE3DE] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <label htmlFor="academy-chatbot-input" className="sr-only">
                Ask Enlight Academy chatbot a question
              </label>
              <input
                ref={inputRef}
                id="academy-chatbot-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about ACLS, Caregiver, NCLEX, fees..."
                className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="p-2.5 text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="flex items-center justify-between gap-2 text-[11px] text-[#4A5D52]">
              <span>Prefer live counselling?</span>
              <a
                href={defaultWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#157347] hover:underline tabular-nums"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span>WhatsApp {ACADEMY_FACTS.whatsappIntl}</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Floating Action Buttons: Chatbot + WhatsApp */}
      <div className="flex items-center gap-2.5">
        <a
          href={defaultWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp ${ACADEMY_FACTS.whatsappNumber}`}
          title={`WhatsApp: ${ACADEMY_FACTS.whatsappIntl}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#157347] hover:bg-[#115C38] border border-white/20 rounded-lg shadow-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157347]"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          <span>WhatsApp</span>
          <span className="hidden sm:inline font-mono text-[11px] text-white/90 tabular-nums">
            · {ACADEMY_FACTS.whatsappNumber}
          </span>
        </a>

        <button
          type="button"
          onClick={handleToggleChat}
          aria-expanded={isChatOpen}
          aria-label={isChatOpen ? 'Close Enlight Academy Chatbot' : 'Open Enlight Academy Chatbot'}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] border border-white/20 rounded-lg shadow-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
        >
          {isChatOpen ? (
            <>
              <X className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Close Chat</span>
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Chat Bot</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
