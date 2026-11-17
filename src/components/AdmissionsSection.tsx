import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ACADEMY_FACTS, COURSE_PROGRAMS } from '../data/academyData';
import {
  generateReferenceCode,
  InquiryFormInput,
  validateInquiryForm,
} from '../utils/academyLogic';

export interface SubmittedInquiry extends InquiryFormInput {
  referenceCode: string;
  programTitle: string;
  submittedAt: string;
}

interface AdmissionsSectionProps {
  preselectedProgramId: string;
  submittedInquiries: SubmittedInquiry[];
  onSubmitInquiry: (inquiry: SubmittedInquiry) => void;
}

const QUALIFICATIONS = [
  'PCL Nursing / Staff Nurse',
  'B.Sc. Nursing / BNS',
  'MBBS / Foreign Medical Graduate (FMG/IMG)',
  'Paramedic / HA / CMA / ANM',
  'Caregiver / Health & Social Care Candidate',
  'Public Health / Research / Management Graduate',
];

export function AdmissionsSection({
  preselectedProgramId,
  submittedInquiries,
  onSubmitInquiry,
}: AdmissionsSectionProps) {
  const [formState, setFormState] = useState<InquiryFormInput>({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    programId: preselectedProgramId || COURSE_PROGRAMS[0].id,
    preferredMode: 'Live Classes',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormInput, string>>>({});
  const [latestReceipt, setLatestReceipt] = useState<SubmittedInquiry | null>(null);

  useEffect(() => {
    if (preselectedProgramId) {
      setFormState((prev) => ({ ...prev, programId: preselectedProgramId }));
    }
  }, [preselectedProgramId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiryForm(formState);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const selectedProgram =
      COURSE_PROGRAMS.find((p) => p.id === formState.programId) ?? COURSE_PROGRAMS[0];
    const receipt: SubmittedInquiry = {
      ...formState,
      referenceCode: generateReferenceCode(selectedProgram.code, submittedInquiries.length + 1),
      programTitle: selectedProgram.title,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setErrors({});
    setLatestReceipt(receipt);
    onSubmitInquiry(receipt);
    setFormState((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      phone: '',
      notes: '',
    }));
  };

  return (
    <section id="admissions" className="py-12 lg:py-14 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Admissions Details & Saved Applications Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                Admissions &amp; Academic Counselling
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
                Enrol in Upcoming Live, Online or Simulation Cohorts
              </h2>
              <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
                Submit your qualification and preferred programme to receive the upcoming batch timetable, fee structure, and mock test orientation from our academic team.
              </p>
            </div>

            <div className="bg-white border border-[#DCE3DE] rounded-xl p-6 space-y-4">
              <h3 className="font-editorial text-lg font-semibold text-[#102018]">
                Direct Institutional Desk
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#164424] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-[#56695E]">Campus &amp; Simulation Centre</dt>
                    <dd className="font-medium text-[#102018]">{ACADEMY_FACTS.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-[#164424] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-[#56695E]">Admissions Telephone</dt>
                    <dd className="font-medium text-[#102018] tabular-nums">{ACADEMY_FACTS.phone}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-[#164424] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-[#56695E]">Academic Email</dt>
                    <dd className="font-medium text-[#102018]">{ACADEMY_FACTS.email}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-[#164424] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-[#56695E]">Counselling Hours</dt>
                    <dd className="font-medium text-[#102018]">{ACADEMY_FACTS.hours}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {submittedInquiries.length > 0 && (
              <div
                className="bg-white border border-[#DCE3DE] rounded-xl p-5 space-y-3"
                data-testid="submitted-inquiries-list"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#102018]">
                    Your Submitted Applications
                  </h3>
                  <span className="font-mono text-xs text-[#164424] tabular-nums">
                    {submittedInquiries.length} recorded
                  </span>
                </div>
                <ul className="space-y-2.5 divide-y divide-[#EEF2EF]">
                  {submittedInquiries.map((item) => (
                    <li key={item.referenceCode} className="pt-2.5 first:pt-0 text-xs space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[#102018]">{item.programTitle}</span>
                        <span className="font-mono text-[#164424] shrink-0">
                          {item.referenceCode}
                        </span>
                      </div>
                      <p className="text-[#4A5D52]">
                        {item.fullName} · {item.preferredMode} · {item.submittedAt}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Validated Application Form */}
          <div className="lg:col-span-7 bg-white border border-[#DCE3DE] rounded-xl p-6 sm:p-8">
            {latestReceipt && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 bg-[#F1F6F2] border border-[#164424]/30 rounded-lg p-4 flex items-start gap-3"
              >
                <CheckCircle2
                  className="h-5 w-5 text-[#164424] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-[#102018]">
                    Application recorded for {latestReceipt.programTitle}
                  </p>
                  <p className="text-xs text-[#3E4F45]">
                    Reference ID:{' '}
                    <span className="font-mono font-medium text-[#164424]">
                      {latestReceipt.referenceCode}
                    </span>{' '}
                    · Confirmation prepared for {latestReceipt.email} ({latestReceipt.preferredMode}).
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="applicant-name" className="block text-xs font-medium text-[#102018] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="applicant-name"
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, fullName: e.target.value }));
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    placeholder="e.g. Sita Gurung"
                    aria-invalid={Boolean(errors.fullName)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="applicant-email" className="block text-xs font-medium text-[#102018] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="applicant-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="applicant-phone" className="block text-xs font-medium text-[#102018] mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, phone: e.target.value }));
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="+977 98XXXXXXXX"
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="applicant-qualification" className="block text-xs font-medium text-[#102018] mb-1.5">
                    Current Qualification
                  </label>
                  <select
                    id="applicant-qualification"
                    required
                    value={formState.qualification}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, qualification: e.target.value }));
                      if (errors.qualification)
                        setErrors((prev) => ({ ...prev, qualification: undefined }));
                    }}
                    aria-invalid={Boolean(errors.qualification)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                  >
                    <option value="">Select qualification...</option>
                    {QUALIFICATIONS.map((qual) => (
                      <option key={qual} value={qual}>
                        {qual}
                      </option>
                    ))}
                  </select>
                  {errors.qualification && (
                    <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                      {errors.qualification}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="applicant-program" className="block text-xs font-medium text-[#102018] mb-1.5">
                    Programme / Course Track
                  </label>
                  <select
                    id="applicant-program"
                    required
                    value={formState.programId}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, programId: e.target.value }));
                      if (errors.programId)
                        setErrors((prev) => ({ ...prev, programId: undefined }));
                    }}
                    aria-invalid={Boolean(errors.programId)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                  >
                    {COURSE_PROGRAMS.map((prog) => (
                      <option key={prog.id} value={prog.id}>
                        {prog.title}
                      </option>
                    ))}
                  </select>
                  {errors.programId && (
                    <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                      {errors.programId}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="applicant-mode" className="block text-xs font-medium text-[#102018] mb-1.5">
                    Preferred Learning Mode
                  </label>
                  <select
                    id="applicant-mode"
                    value={formState.preferredMode}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        preferredMode: e.target.value as InquiryFormInput['preferredMode'],
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                  >
                    <option value="Live Classes">Live Classes</option>
                    <option value="Online Courses">Online Courses &amp; Mock Tests</option>
                    <option value="In-Person Simulation">In-Person Clinical Simulation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="applicant-notes" className="block text-xs font-medium text-[#102018] mb-1.5">
                  Target Exam Date or Questions (Optional)
                </label>
                <textarea
                  id="applicant-notes"
                  rows={3}
                  value={formState.notes}
                  onChange={(e) => setFormState((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Share your target licensure board, preferred batch timing, or observership dates..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] focus:bg-white focus:border-[#164424] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#56695E]">
                  Academic counsellors respond within one working day.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
                >
                  Submit Application Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
