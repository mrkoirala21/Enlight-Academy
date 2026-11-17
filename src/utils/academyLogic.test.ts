import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSE_PROGRAMS } from '../data/academyData';
import {
  countProgramsByGroup,
  countTestimonialsByExam,
  filterPrograms,
  filterTestimonialsByExam,
  generateReferenceCode,
  getPathForRoute,
  parseRouteFromLocation,
  StudentTestimonial,
  validateInquiryForm,
} from './academyLogic';

test('parseRouteFromLocation and getPathForRoute resolve all 6 academy pages', () => {
  assert.equal(parseRouteFromLocation('/'), 'home');
  assert.equal(parseRouteFromLocation('/programs'), 'programs');
  assert.equal(parseRouteFromLocation('/licensure/'), 'licensure');
  assert.equal(parseRouteFromLocation('/', '#simulation'), 'simulation');
  assert.equal(parseRouteFromLocation('/faculty'), 'faculty');
  assert.equal(parseRouteFromLocation('/admissions'), 'admissions');
  assert.equal(parseRouteFromLocation('/unknown-page'), 'home');

  assert.equal(getPathForRoute('home'), '/');
  assert.equal(getPathForRoute('programs'), '/programs');
  assert.equal(getPathForRoute('admissions'), '/admissions');
});

test('filterPrograms returns all programmes when group is all and query is empty', () => {
  const results = filterPrograms(COURSE_PROGRAMS, 'all', '');
  assert.equal(results.length, COURSE_PROGRAMS.length);
  assert.equal(results.length, 18);
});

test('filterPrograms filters by group and Our Services keywords accurately', () => {
  const licensure = filterPrograms(COURSE_PROGRAMS, 'licensure', '');
  assert.equal(licensure.length, 2);
  assert.ok(licensure.some((p) => p.title.includes('NCLEX-RN')));

  const caregiver = filterPrograms(COURSE_PROGRAMS, 'all', 'City & Guilds');
  assert.equal(caregiver.length, 1);
  assert.equal(caregiver[0].id, 'city-guilds-caregiver');

  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'Dialysis').length, 1);
  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'BLS').length, 1);
  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'Ventilator').length, 2);
  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'Regional Anesthesia').length, 1);
  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'Fellowship in Laparoscopic').length, 1);
  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'Laparoscopic').length, 2);
  assert.equal(filterPrograms(COURSE_PROGRAMS, 'all', 'Operation Theater').length, 1);

  const empty = filterPrograms(COURSE_PROGRAMS, 'doctors', 'nonexistent-keyword-xyz');
  assert.equal(empty.length, 0);
});

test('countProgramsByGroup totals match COURSE_PROGRAMS length', () => {
  const counts = countProgramsByGroup(COURSE_PROGRAMS);
  assert.equal(counts.all, COURSE_PROGRAMS.length);
  const sum =
    counts.nursing + counts.licensure + counts.doctors + counts.emergency + counts.accredited;
  assert.equal(sum, counts.all);
});

test('validateInquiryForm rejects empty or invalid fields and accepts valid input', () => {
  const invalidResult = validateInquiryForm({
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
    qualification: '',
    programId: '',
    preferredMode: 'Live Classes',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.qualification);
  assert.ok(invalidResult.errors.programId);

  const validResult = validateInquiryForm({
    fullName: 'Sita Gurung',
    email: 'sita.gurung@example.com',
    phone: '+977 9841234567',
    qualification: 'B.Sc. Nursing',
    programId: 'critical-care-nurse-training',
    preferredMode: 'Live Classes',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('generateReferenceCode formats deterministic application receipt codes', () => {
  assert.equal(generateReferenceCode('EA-NUR-101', 1), 'EA-2026-EANUR1-0001');
  assert.equal(generateReferenceCode('EA-CG-301', 42), 'EA-2026-EACG30-0042');
});

test('filterTestimonialsByExam and countTestimonialsByExam group student pass stories accurately', () => {
  const sampleTestimonials: StudentTestimonial[] = [
    {
      id: 't1',
      studentName: 'Pratibha Thapa, RN',
      role: 'Registered Nurse',
      organization: 'Texas Placement',
      examId: 'nclex',
      examLabel: 'Next-Gen NCLEX-RN',
      passedYear: '2026 Cohort',
      studyMode: 'Live + CAT Mocks',
      outcome: 'Passed in 85 Questions',
      quote: 'Structured mock analytics built clarity.',
    },
    {
      id: 't2',
      studentName: 'Sanjita Shrestha, B.Sc. Nursing',
      role: 'Registered Adult Nurse',
      organization: 'UK NHS Pathway',
      examId: 'osce',
      examLabel: 'NMC UK OSCE & CBT',
      passedYear: '2026 Cohort',
      studyMode: '10-Station Simulation',
      outcome: 'Cleared All 10 Stations',
      quote: 'Timed APIE drills fixed my confidence.',
    },
    {
      id: 't3',
      studentName: 'Binita Tamang, PCL Nursing',
      role: 'Staff Nurse',
      organization: 'Kathmandu Hospital',
      examId: 'nnc',
      examLabel: 'Nepal Nursing Council (NNC)',
      passedYear: '2026 Cohort',
      studyMode: 'Live Classes',
      outcome: 'Passed First Sitting',
      quote: 'Mock walkthroughs targeted weak domains.',
    },
  ];

  assert.equal(filterTestimonialsByExam(sampleTestimonials, 'all').length, 3);
  assert.equal(filterTestimonialsByExam(sampleTestimonials, 'nclex').length, 1);
  assert.equal(filterTestimonialsByExam(sampleTestimonials, 'osce')[0].id, 't2');
  assert.equal(filterTestimonialsByExam(sampleTestimonials, 'middle-east').length, 0);

  const counts = countTestimonialsByExam(sampleTestimonials);
  assert.equal(counts.all, 3);
  assert.equal(counts.nclex, 1);
  assert.equal(counts.osce, 1);
  assert.equal(counts.nnc, 1);
  assert.equal(counts['middle-east'], 0);
});
