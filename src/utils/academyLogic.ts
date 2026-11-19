import type {
  AcademicUpdateItem,
  AcademicUpdateType,
  AcademyFaqItem,
  CourseProgram,
  FaqCategory,
  ProgramGroup,
} from '../data/academyData';

export type PageRoute =
  | 'home'
  | 'programs'
  | 'licensure'
  | 'simulation'
  | 'faculty'
  | 'admissions';

export const PAGE_ROUTES: { id: PageRoute; path: string; label: string }[] = [
  { id: 'programs', path: '/programs', label: 'Programs' },
  { id: 'licensure', path: '/licensure', label: 'Licensure' },
  { id: 'simulation', path: '/simulation', label: 'Simulation' },
  { id: 'faculty', path: '/faculty', label: 'Faculty' },
  { id: 'admissions', path: '/admissions', label: 'Admissions' },
];

export function parseRouteFromLocation(pathname: string, hash = ''): PageRoute {
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase();
  const segments = cleanPath.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? '';
  const cleanHash = hash.replace(/^#/, '').toLowerCase();

  const candidate = lastSegment || cleanHash;
  if (
    candidate === 'programs' ||
    candidate === 'licensure' ||
    candidate === 'simulation' ||
    candidate === 'faculty' ||
    candidate === 'admissions'
  ) {
    return candidate;
  }
  return 'home';
}

export function getPathForRoute(route: PageRoute): string {
  return route === 'home' ? '/' : `/${route}`;
}

export interface InquiryFormInput {
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  programId: string;
  preferredMode: 'Live Classes' | 'Online Courses' | 'In-Person Simulation';
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export function filterPrograms(
  programs: CourseProgram[],
  group: ProgramGroup,
  searchQuery: string
): CourseProgram[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return programs.filter((program) => {
    const matchesGroup = group === 'all' || program.group === group;
    if (!matchesGroup) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      program.code,
      program.category,
      program.title,
      program.subtitle,
      program.targetAudience,
      program.affiliation,
      program.summary,
      ...program.syllabusModules,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function countProgramsByGroup(programs: CourseProgram[]): Record<ProgramGroup, number> {
  const counts: Record<ProgramGroup, number> = {
    all: programs.length,
    nursing: 0,
    licensure: 0,
    doctors: 0,
    emergency: 0,
    accredited: 0,
  };

  for (const program of programs) {
    counts[program.group] += 1;
  }

  return counts;
}

export function validateInquiryForm(input: InquiryFormInput): ValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (!input.fullName.trim() || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email.trim() || !emailPattern.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const digitsOnly = input.phone.replace(/[^\d]/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid contact number (7–15 digits).';
  }

  if (!input.qualification.trim()) {
    errors.qualification = 'Please select or enter your current qualification.';
  }

  if (!input.programId.trim()) {
    errors.programId = 'Please select a training programme.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateReferenceCode(programCode: string, sequenceNumber: number): string {
  const prefix = programCode ? programCode.replace(/[^A-Z0-9]/gi, '').slice(0, 6).toUpperCase() : 'ENLIGHT';
  const padded = String(Math.max(1, sequenceNumber)).padStart(4, '0');
  return `EA-2026-${prefix}-${padded}`;
}

export type LicensureExamFilter = 'all' | 'nnc' | 'nclex' | 'osce' | 'middle-east';

export interface StudentTestimonial {
  id: string;
  studentName: string;
  role: string;
  organization: string;
  examId: Exclude<LicensureExamFilter, 'all'>;
  examLabel: string;
  passedYear: string;
  studyMode: string;
  outcome: string;
  quote: string;
}

export function filterTestimonialsByExam(
  testimonials: StudentTestimonial[],
  examFilter: LicensureExamFilter
): StudentTestimonial[] {
  if (examFilter === 'all') {
    return testimonials;
  }
  return testimonials.filter((item) => item.examId === examFilter);
}

export function countTestimonialsByExam(
  testimonials: StudentTestimonial[]
): Record<LicensureExamFilter, number> {
  const counts: Record<LicensureExamFilter, number> = {
    all: testimonials.length,
    nnc: 0,
    nclex: 0,
    osce: 0,
    'middle-east': 0,
  };

  for (const item of testimonials) {
    counts[item.examId] += 1;
  }

  return counts;
}

export function buildWhatsAppUrl(phoneDigits: string, prefillMessage?: string): string {
  const digits = phoneDigits.replace(/[^\d]/g, '');
  const normalized = digits.length === 10 && digits.startsWith('9') ? `977${digits}` : digits;
  const baseUrl = `https://wa.me/${normalized}`;
  if (!prefillMessage || !prefillMessage.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(prefillMessage.trim())}`;
}

export interface BotReply {
  text: string;
  matchedProgramId?: string;
  matchedProgramTitle?: string;
  suggestedRoute?: PageRoute;
  whatsappPrefill: string;
}

export function generateBotReply(
  rawQuery: string,
  programs: CourseProgram[],
  licensureNames: string[],
  contactPhone: string,
  hours: string
): BotReply {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      text: `Namaste! Welcome to Enlight Academy Pvt. Ltd. Ask about ACLS & BLS, Caregiver (City & Guilds), Critical Care Nursing, CTEVT short courses, Fellowships, or NCLEX/NNC/OSCE licensure—or message our counsellors directly on WhatsApp (${contactPhone}).`,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I would like information about upcoming training programmes.',
    };
  }

  const pickProgram = (id: string) => programs.find((p) => p.id === id);

  if (/\b(hi|hello|namaste|hey|good morning|good afternoon)\b/.test(query)) {
    return {
      text: `Namaste! I can help you compare Enlight Academy’s 18 courses, upcoming ACLS/BLS & Caregiver batches, CTEVT short courses, Fellowships, and Licensure mock series. For direct fee & seat confirmation, reach us anytime on WhatsApp (${contactPhone}).`,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Namaste Enlight Academy, I would like details on upcoming cohorts and admissions.',
    };
  }

  if (/acls|bls|cpr|aed|resuscitation|life support/.test(query)) {
    const prog = pickProgram('aha-non-aha-bls-acls');
    return {
      text: `${prog?.title ?? 'AHA / Non-AHA BLS & ACLS'} runs ${prog?.duration ?? '2 – 5 Days'} with hands-on CPR, AED, airway rescue, and ACLS megacode simulation stations. Ask on WhatsApp (${contactPhone}) for this week’s certification dates.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'simulation',
      whatsappPrefill: 'Hello Enlight Academy, please share upcoming AHA/Non-AHA BLS & ACLS training dates and fees.',
    };
  }

  if (/caregiver|age care|city & guilds|city and guilds|elderly|social care/.test(query)) {
    const prog = pickProgram('city-guilds-caregiver');
    return {
      text: `${prog?.title ?? 'Caregiver & City & Guilds Level 2 Diploma'} is a ${prog?.duration ?? '16 Weeks'} internationally recognised UK Health & Social Care and CTEVT-aligned pathway covering safe mobility, dementia care, and placement portfolios.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I am interested in the Caregiver & City & Guilds Level 2 Diploma batch.',
    };
  }

  if (/ventilator|mechanical vent/.test(query)) {
    const prog = pickProgram('ventilator-workshop');
    return {
      text: `${prog?.title ?? 'Ventilator Workshop'} (${prog?.duration ?? '3 – 5 Days'}) gives ICU nurses and medical officers bedside practice with invasive/NIV modes, waveform diagnostics, and ABG matching.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'simulation',
      whatsappPrefill: 'Hello Enlight Academy, please send me the next Ventilator Workshop batch dates.',
    };
  }

  if (/dialysis|hemodialysis|renal/.test(query)) {
    const prog = pickProgram('dialysis-assistance');
    return {
      text: `${prog?.title ?? 'Dialysis Assistance'} is a ${prog?.duration ?? '6 Weeks'} training covering circuit priming, AV fistula care, and intradialytic complication response.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I would like details on Dialysis Assistance training.',
    };
  }

  if (/critical care|icu nurse|ccu/.test(query)) {
    const prog = pickProgram('critical-care-nurse-training');
    return {
      text: `${prog?.title ?? 'Critical Care Nursing'} runs ${prog?.duration ?? '8 Weeks Intensive'}, covering ABG analysis, hemodynamic monitoring, sepsis bundles, and ventilator simulation.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, please share schedule and fees for Critical Care Nursing.',
    };
  }

  if (/operation theater|\bot\b|scrubbing|perioperative|surgical/.test(query)) {
    const prog = pickProgram('operation-theater-assistance');
    return {
      text: `${prog?.title ?? 'Operation Theater Assistance'} (${prog?.duration ?? '6 – 8 Weeks'}) trains participants in sterile scrubbing, surgical instrument trays, WHO checklists, and perioperative safety.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I want information on Operation Theater Assistance.',
    };
  }

  if (/first aid|trauma|emergency/.test(query)) {
    const prog = pickProgram('first-aid-emergency-management');
    return {
      text: `${prog?.title ?? 'First Aid and Emergency Management'} (${prog?.duration ?? '1 – 2 Weeks'}) teaches ABCDE primary triage, bleeding control, splinting, and workplace emergency response.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I would like details on First Aid and Emergency Management.',
    };
  }

  if (/research|data analysis|spss|biostat|thesis|manuscript/.test(query)) {
    const prog = pickProgram('research-statistical-analysis');
    return {
      text: `${prog?.title ?? 'Research and Data Analysis'} is a ${prog?.duration ?? '6 Weeks'} programme covering study design, IRB proposals, SPSS/R statistics, and journal publication.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, please share details about Research and Data Analysis.',
    };
  }

  if (/infection|\bipc\b|sterilization|cssd/.test(query)) {
    const prog = pickProgram('infection-prevention-control');
    return {
      text: `${prog?.title ?? 'Infection Prevention and Control'} (${prog?.duration ?? '4 Weeks'}) covers WHO standard precautions, CLABSI/VAP bundles, and CSSD validation audits.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I am inquiring about Infection Prevention and Control.',
    };
  }

  if (/regional anesthesia|pain medicine|nerve block/.test(query)) {
    const prog = pickProgram('fellowship-regional-anesthesia');
    return {
      text: `${prog?.title ?? 'Fellowship Training on Regional Anesthesia & Pain Medicine'} (${prog?.duration ?? '8 – 12 Weeks'}) provides ultrasound-guided nerve block and interventional pain training for physicians.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'simulation',
      whatsappPrefill: 'Hello Enlight Academy, please send details on Regional Anesthesia & Pain Medicine Fellowship.',
    };
  }

  if (/laparoscopic|endotrainer|fellowship/.test(query)) {
    const prog = pickProgram('fellowship-laparoscopic-training');
    return {
      text: `${prog?.title ?? 'Fellowship in Laparoscopic Training'} (${prog?.duration ?? '8 – 12 Weeks'}) covers endotrainer ergonomics, intracorporeal suturing, and minimally invasive surgical workflows.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'simulation',
      whatsappPrefill: 'Hello Enlight Academy, please share details on Fellowship in Laparoscopic Training.',
    };
  }

  if (/ctevt|short course/.test(query)) {
    const prog = pickProgram('ctevt-affiliated-programmes');
    return {
      text: `${prog?.title ?? 'CTEVT Affiliated Short Course'} (${prog?.duration ?? '12 – 24 Weeks'}) aligns vocational healthcare skills with National Skill Testing Board standards.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'programs',
      whatsappPrefill: 'Hello Enlight Academy, I would like information on CTEVT Affiliated Short Courses.',
    };
  }

  if (/nclex|nnc|osce|cbt|dha|haad|moh|prometric|licensure|exam|uk|middle east/.test(query)) {
    const prog = pickProgram('global-nursing-licensure');
    const summaryList = licensureNames.join(', ');
    return {
      text: `We prepare candidates for ${summaryList} through daily live classes, adaptive Q-banks, 10-station NMC UK OSCE labs, and proctored mock exams.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'licensure',
      whatsappPrefill: 'Hello Enlight Academy, I would like information on Nursing Licensure coaching (NNC / NCLEX-RN / OSCE / Middle East).',
    };
  }

  if (/fmg|img|observership|doctor|mbbs|nmcle/.test(query)) {
    const prog = pickProgram('international-observership-fmg');
    return {
      text: `For physicians and FMGs/IMGs, Enlight Academy offers ${prog?.title ?? 'International Clinical Observership'} (4–8 Weeks hospital rotations), Foreign Trained Doctor Licensure prep, plus Regional Anesthesia & Laparoscopic Fellowships.`,
      matchedProgramId: prog?.id,
      matchedProgramTitle: prog?.title,
      suggestedRoute: 'simulation',
      whatsappPrefill: 'Hello Enlight Academy, please share FMG/IMG Observership and Physician Fellowship dates.',
    };
  }

  if (/fee|cost|price|tuition|batch|timing|schedule|hour|location|kathmandu|where|whatsapp|contact|apply|admission|enrol|enroll/.test(query)) {
    return {
      text: `Enlight Academy’s campus & simulation lab operates in Kathmandu, Nepal (${hours}). For exact cohort fees, morning/evening seat availability, and scholarship counselling, submit the Admissions form or message us directly on WhatsApp (${contactPhone}).`,
      suggestedRoute: 'admissions',
      whatsappPrefill: `Hello Enlight Academy, I would like batch timings and fee details for: ${rawQuery.trim()}`,
    };
  }

  return {
    text: `Thanks for asking! We offer 18 programmes across AHA/Non-AHA BLS & ACLS, Caregiver (City & Guilds UK), Critical Care, CTEVT short courses, Fellowships, and Global Licensure. Send your exact question to our WhatsApp counselling desk (${contactPhone}) for an immediate reply.`,
    suggestedRoute: 'admissions',
    whatsappPrefill: `Hello Enlight Academy, I have a question: ${rawQuery.trim()}`,
  };
}

export type FaqTopicFilter = 'all' | FaqCategory;

export function filterFaqsByTopic(
  faqs: AcademyFaqItem[],
  topicFilter: FaqTopicFilter
): AcademyFaqItem[] {
  if (topicFilter === 'all') {
    return faqs;
  }
  return faqs.filter((item) => item.category === topicFilter);
}

export function countFaqsByTopic(faqs: AcademyFaqItem[]): Record<FaqTopicFilter, number> {
  const counts: Record<FaqTopicFilter, number> = {
    all: faqs.length,
    enrollment: 0,
    certification: 0,
    prerequisites: 0,
  };

  for (const item of faqs) {
    counts[item.category] += 1;
  }

  return counts;
}

export type AcademicUpdateFilter = 'all' | AcademicUpdateType;

export function filterAcademicUpdates(
  updates: AcademicUpdateItem[],
  filter: AcademicUpdateFilter
): AcademicUpdateItem[] {
  if (filter === 'all') {
    return updates;
  }
  return updates.filter((item) => item.type === filter);
}

