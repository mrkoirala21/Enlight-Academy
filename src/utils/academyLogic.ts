import type { CourseProgram, ProgramGroup } from '../data/academyData';

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
