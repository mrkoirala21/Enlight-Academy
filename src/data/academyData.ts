export type ProgramGroup =
  | 'all'
  | 'nursing'
  | 'licensure'
  | 'doctors'
  | 'emergency'
  | 'accredited';

export interface CourseProgram {
  id: string;
  code: string;
  category: string;
  group: Exclude<ProgramGroup, 'all'>;
  title: string;
  subtitle: string;
  targetAudience: string;
  deliveryModes: (
    | 'Live Classes'
    | 'Online Courses'
    | 'Mock Tests'
    | 'Clinical Simulation'
    | 'Hospital Rotation'
  )[];
  duration: string;
  affiliation: string;
  summary: string;
  syllabusModules: string[];
  outcomes: string[];
  featured?: boolean;
}

export interface AcademyServiceItem {
  number: string;
  title: string;
  categoryLabel: string;
  summary: string;
  programId: string;
  subTracks?: { title: string; programId: string }[];
}

export interface LicensureTrack {
  id: 'nnc' | 'nclex' | 'osce' | 'middle-east';
  code: string;
  name: string;
  region: string;
  examBody: string;
  deliveryCadence: string;
  mockSchedule: string;
  passFocus: string;
  corePillars: string[];
}

export interface FacultyHighlight {
  id: string;
  name: string;
  credentials: string;
  department: string;
  focus: string;
  experience: string;
}

export const ACADEMY_FACTS = {
  legalName: 'Enlight Academy Pvt. Ltd.',
  tagline: 'Complete medical training and test preparation from highly qualified teachers.',
  communityCount: '9,800+',
  logoPath: '/assets/aistudio/image_8c60d93f.png',
  location: 'Kathmandu, Nepal',
  email: 'admissions@enlightacademy.com.np',
  phone: '+977-01-4529100',
  whatsappNumber: '9809494619',
  whatsappIntl: '+977 9809494619',
  hours: 'Sunday – Friday, 07:00 – 19:00 NPT',
};

export const PROGRAM_GROUPS: { id: ProgramGroup; label: string }[] = [
  { id: 'all', label: 'All Programmes' },
  { id: 'nursing', label: 'Nursing & Clinical Care' },
  { id: 'licensure', label: 'Global Licensure' },
  { id: 'doctors', label: 'Doctors & Fellowships' },
  { id: 'emergency', label: 'Emergency, BLS & ICU' },
  { id: 'accredited', label: 'CTEVT, Caregiver & IPC' },
];

export const COURSE_PROGRAMS: CourseProgram[] = [
  {
    id: 'dialysis-assistance',
    code: 'EA-SRV-101',
    category: 'Clinical Support Training',
    group: 'nursing',
    title: 'Dialysis Assistance',
    subtitle: 'Hemodialysis machine setup, vascular access care, and intradialytic patient monitoring',
    targetAudience: 'Staff Nurses, Allied Health Assistants & Technicians',
    deliveryModes: ['Clinical Simulation', 'Live Classes', 'Hospital Rotation'],
    duration: '6 Weeks',
    affiliation: 'Enlight Renal & Clinical Skills Division',
    summary:
      'Hands-on training in hemodialysis circuit priming, AV fistula/graft cannulation care, water treatment quality checks, and acute intradialytic complication management.',
    syllabusModules: [
      '01. Renal Physiology, Dialyzer Selection & Circuit Priming',
      '02. Vascular Access Assessment: AV Fistula, Graft & Catheter Care',
      '03. Intradialytic Monitoring, Hypotension & Disequilibrium Response',
      '04. Machine Disinfection, Water RO Safety & Infection Control',
    ],
    outcomes: [
      'Safe pre-dialysis setup, priming, and post-dialysis termination',
      'Early recognition and escalation of intradialytic emergencies',
    ],
  },
  {
    id: 'aha-non-aha-bls-acls',
    code: 'EA-EMG-102',
    category: 'Resuscitation & Life Support',
    group: 'emergency',
    title: 'AHA / Non-AHA BLS & ACLS',
    subtitle: 'High-quality CPR, AED usage, megacode resuscitation, and airway-arrhythmia algorithms',
    targetAudience: 'Doctors, Nurses, Paramedics & Healthcare Providers',
    deliveryModes: ['Clinical Simulation', 'Live Classes', 'Mock Tests'],
    duration: '2 – 5 Days (Certification Tracks)',
    affiliation: 'AHA & Institutional Resuscitation Standards',
    summary:
      'Simulation-driven Basic Life Support (BLS) and Advanced Cardiovascular Life Support (ACLS) training using high-feedback manikins, defibrillators, and team megacode scenarios.',
    syllabusModules: [
      '01. Single-Rescuer & Team High-Quality Adult, Child & Infant CPR',
      '02. AED Operation, Choking Relief & Bag-Mask Ventilation',
      '03. ACLS Bradycardia, Tachycardia & Cardiac Arrest Algorithms',
      '04. Megacode Team Dynamics, Post-Cardiac Arrest Care & Debriefing',
    ],
    outcomes: [
      'Verified practical competency in BLS and ACLS megacode stations',
      'Structured closed-loop communication during cardiac emergencies',
    ],
    featured: true,
  },
  {
    id: 'first-aid-emergency-management',
    code: 'EA-EMG-103',
    category: 'Emergency and Trauma Care',
    group: 'emergency',
    title: 'First Aid and Emergency Management',
    subtitle: 'Rapid scene triage, bleeding control, fracture stabilization, and workplace emergency response',
    targetAudience: 'Healthcare Entrants, Community Responders, Corporate & School Staff',
    deliveryModes: ['Clinical Simulation', 'Live Classes'],
    duration: '1 – 2 Weeks (Modular)',
    affiliation: 'Acute Care & Community First Response Curriculum',
    summary:
      'Practical emergency response programme covering primary survey, hemorrhage control, burn and fracture first aid, anaphylaxis, and rapid trauma stabilization.',
    syllabusModules: [
      '01. Scene Safety, Primary Survey (ABCDE) & Emergency Triage',
      '02. Hemorrhage Control, Wound Dressing & Shock Positioning',
      '03. Burns, Poisoning, Environmental & Medical Emergencies',
      '04. Musculoskeletal Splinting, Spinal Precautions & Safe Transport',
    ],
    outcomes: [
      'Immediate readiness to stabilize medical and trauma casualties',
      'Hands-on proficiency with splinting, bandaging, and CPR adjuncts',
    ],
  },
  {
    id: 'ventilator-workshop',
    code: 'EA-ICU-104',
    category: 'Critical Care Workshop',
    group: 'emergency',
    title: 'Ventilator Workshop',
    subtitle: 'Invasive & non-invasive modes, waveform graphics, alarm troubleshooting, and ABG matching',
    targetAudience: 'ICU/CCU Nurses, Medical Officers, Residents & Respiratory Staff',
    deliveryModes: ['Clinical Simulation', 'Live Classes'],
    duration: '3 – 5 Days Intensive Workshop',
    affiliation: 'Enlight Critical Care Simulation Lab',
    summary:
      'Focused bedside workshop demystifying mechanical ventilation modes (VCV, PCV, SIMV, PSV, NIV), ventilator waveform interpretation, and safe weaning protocols.',
    syllabusModules: [
      '01. Respiratory Mechanics, Compliance & Resistance Principles',
      '02. Volume vs. Pressure Control, PEEP Titration & NIV Setup',
      '03. Pressure-Flow-Volume Waveform Diagnostics & Dyssynchrony',
      '04. High-Pressure / Low-Volume Alarms & Spontaneous Breathing Trials',
    ],
    outcomes: [
      'Confident bedside troubleshooting of ventilator alarms and dyssynchrony',
      'Integrated ABG adjustment and lung-protective ventilation practice',
    ],
  },
  {
    id: 'research-statistical-analysis',
    code: 'EA-RES-701',
    category: 'Research and Data Analysis',
    group: 'doctors',
    title: 'Research and Data Analysis',
    subtitle: 'Study design, biostatistics, SPSS/R data workflows, and peer-reviewed manuscript writing',
    targetAudience: 'Medical Students, Residents, Nursing Faculty & Public Health Researchers',
    deliveryModes: ['Live Classes', 'Online Courses'],
    duration: '6 Weeks',
    affiliation: 'Academic Research & Data Division',
    summary:
      'Equips clinicians and healthcare scholars with practical mastery of study design, ethical IRB protocols, biostatistical hypothesis testing, and publication-ready data analysis.',
    syllabusModules: [
      '01. Research Question Formulation (PICO) & Study Designs',
      '02. Sample Size Calculation, Bias Control & Ethical IRB Proposals',
      '03. Applied Biostatistics & Regression Modeling in Clinical Datasets',
      '04. Manuscript Structure, Peer-Review Response & Journal Submission',
    ],
    outcomes: [
      'Completed study protocol or analyzable clinical dataset project',
      'Independent ability to run and interpret clinical statistical tests',
    ],
  },
  {
    id: 'infection-prevention-control',
    code: 'EA-IPC-106',
    category: 'Hospital Quality & Safety',
    group: 'accredited',
    title: 'Infection Prevention and Control',
    subtitle: 'Standard precautions, CSSD sterilization audits, biomedical waste, and HAI surveillance',
    targetAudience: 'Infection Control Nurses, OT/ICU Staff, Hospital Quality Coordinators',
    deliveryModes: ['Live Classes', 'Clinical Simulation', 'Online Courses'],
    duration: '4 Weeks',
    affiliation: 'WHO / National IPC Standards',
    summary:
      'Evidence-based hospital infection prevention programme covering hand hygiene compliance, bundle care for CLABSI/CAUTI/VAP, CSSD sterilization validation, and outbreak containment.',
    syllabusModules: [
      '01. Transmission-Based Precautions, PPE Donning/Doffing & Hand Hygiene',
      '02. Care Bundles: VAP, CLABSI, CAUTI & Surgical Site Prevention',
      '03. Disinfection, Sterilization Monitoring & Biomedical Waste Segregation',
      '04. Healthcare-Associated Infection (HAI) Surveillance & Audit Reporting',
    ],
    outcomes: [
      'Ability to conduct ward IPC audits and lead staff compliance training',
      'Practical mastery of sterile barrier and CSSD quality workflows',
    ],
  },
  {
    id: 'critical-care-nurse-training',
    code: 'EA-NUR-101',
    category: 'Critical Care Nursing',
    group: 'nursing',
    title: 'Critical Care Nursing',
    subtitle: 'Intensive care clinical competencies, ventilator management, and hemodynamic monitoring',
    targetAudience: 'Registered Staff Nurses (PCL / B.Sc. Nursing)',
    deliveryModes: ['Clinical Simulation', 'Live Classes', 'Mock Tests'],
    duration: '8 Weeks Intensive',
    affiliation: 'Enlight Clinical Faculty',
    summary:
      'Hands-on simulation and didactic training designed to prepare nurses for high-acuity ICU, CCU, and step-down critical care units using structured patient assessment drills.',
    syllabusModules: [
      '01. Arterial Blood Gas (ABG) Interpretation & Acid-Base Balance',
      '02. Invasive & Non-Invasive Mechanical Ventilation Management',
      '03. Multi-Parameter Hemodynamic Monitoring & Vasoactive Infusions',
      '04. Sepsis Bundles, Multi-Organ Support & ICU Infection Prevention',
    ],
    outcomes: [
      'Confident bedside troubleshooting of ICU monitors and ventilators',
      'Structured SBAR clinical escalation in acute deterioration',
      'Competency evaluation through OSCE simulation stations',
    ],
    featured: true,
  },
  {
    id: 'operation-theater-assistance',
    code: 'EA-OT-108',
    category: 'Surgical & Perioperative Care',
    group: 'nursing',
    title: 'Operation Theater Assistance',
    subtitle: 'Surgical instrument preparation, sterile scrubbing, OT zoning, and perioperative support',
    targetAudience: 'Nurses, Paramedics & Surgical Support Trainees',
    deliveryModes: ['Clinical Simulation', 'Live Classes', 'Hospital Rotation'],
    duration: '6 – 8 Weeks',
    affiliation: 'Perioperative & Surgical Skills Division',
    summary:
      'Comprehensive perioperative training covering surgical hand scrubbing, sterile gowning and gloving, instrument tray handling, WHO surgical safety checklists, and anesthesia machine preparation.',
    syllabusModules: [
      '01. OT Zoning, Asepsis, Scrubbing, Gowning & Closed Gloving',
      '02. General, Orthopedic, Obstetric & Laparoscopic Instrument Sets',
      '03. WHO Surgical Safety Checklist, Sponge/Sharps Count & Positioning',
      '04. Post-Anesthesia Recovery Monitoring & Instrument Reprocessing',
    ],
    outcomes: [
      'Strict adherence to sterile field integrity and surgical counts',
      'Seamless scrub and circulating assistance across surgical specialties',
    ],
  },
  {
    id: 'ctevt-affiliated-programmes',
    code: 'EA-CTV-501',
    category: 'CTEVT Affiliated Short Course',
    group: 'accredited',
    title: 'CTEVT Affiliated Short Course',
    subtitle: 'Nationally accredited vocational healthcare short courses aligned with CTEVT skill standards',
    targetAudience: 'Allied Health Trainees & Vocational Healthcare Entrants',
    deliveryModes: ['Live Classes', 'Clinical Simulation'],
    duration: '12 – 24 Weeks (Level-Based)',
    affiliation: 'Council for Technical Education & Vocational Training (CTEVT)',
    summary:
      'Competency-based vocational health trainings accredited under CTEVT frameworks, blending classroom instruction with supervised practical lab assessments and National Skill Testing Board readiness.',
    syllabusModules: [
      '01. Core Anatomy, Physiology & Infection Control Standards',
      '02. Vital Signs Monitoring, Basic First Aid & Ward Support',
      '03. Community Health Outreach & Documentation Practices',
      '04. National Skill Testing Board Practical Assessment Prep',
    ],
    outcomes: [
      'Nationally recognized CTEVT skill readiness and certification',
      'Practical readiness for hospitals, clinics, and community health centres',
    ],
  },
  {
    id: 'city-guilds-caregiver',
    code: 'EA-CG-301',
    category: 'Caregiver & Social Care',
    group: 'accredited',
    title: 'Caregiver & City & Guilds Level 2 Diploma (Age Care)',
    subtitle: 'Internationally recognised UK vocational qualification and practical caregiver short course',
    targetAudience: 'Aspiring Caregivers & Health Social Care Practitioners',
    deliveryModes: ['Clinical Simulation', 'Live Classes'],
    duration: '16 Weeks + Practical Portfolio',
    affiliation: 'City & Guilds (UK) Approved Training Centre & CTEVT Short Course',
    summary:
      'Delivered as a City & Guilds (UK) approved training centre for Health and Social Care alongside CTEVT-aligned caregiver training, combining elderly care, mobility assistance, dementia support, and safeguarding.',
    syllabusModules: [
      '01. Person-Centred Care, Safeguarding & Health Care Ethics',
      '02. Safe Manual Handling, Mobility & Fall Prevention',
      '03. Age Care Nutrition, Hydration & Medication Assistance',
      '04. Dementia Care, Palliative Comfort & Reflective Practice Portfolio',
    ],
    outcomes: [
      'City & Guilds (UK) Level 2 Diploma & caregiver certification pathway',
      'Verified practical competency in residential and home age care',
      'International employment readiness across UK, Europe, and Japan care sectors',
    ],
    featured: true,
  },
  {
    id: 'fellowship-regional-anesthesia',
    code: 'EA-FEL-406',
    category: 'Medical Fellowship',
    group: 'doctors',
    title: 'Fellowship Training on Regional Anesthesia & Pain Medicine',
    subtitle: 'Ultrasound-guided nerve blocks, neuraxial techniques, and acute/chronic pain protocols',
    targetAudience: 'Anesthesiologists, MD/MS Residents & Perioperative Physicians',
    deliveryModes: ['Clinical Simulation', 'Hospital Rotation', 'Live Classes'],
    duration: '8 – 12 Weeks Fellowship',
    affiliation: 'Pain & Regional Anesthesia Faculty',
    summary:
      'Focused postgraduate fellowship training in ultrasound-guided upper and lower extremity blocks, fascial plane blocks, multimodal analgesia, and interventional chronic pain management.',
    syllabusModules: [
      '01. Ultrasound Physics, Needle Visualization & Sonoanatomy',
      '02. Upper & Lower Limb Nerve Blocks (Brachial Plexus, Sciatic, Femoral)',
      '03. Truncal & Fascial Plane Blocks (TAP, Erector Spinae, PECS)',
      '04. Acute Postoperative Pain Service & Chronic Pain Interventions',
    ],
    outcomes: [
      'Confident ultrasound probe handling and safe local anesthetic dosing',
      'Structured management of LAST (Local Anesthetic Systemic Toxicity)',
    ],
  },
  {
    id: 'fellowship-laparoscopic-training',
    code: 'EA-FEL-407',
    category: 'Surgical Fellowship',
    group: 'doctors',
    title: 'Fellowship in Laparoscopic Training',
    subtitle: 'Endotrainer psychomotor skills, intracorporeal suturing, and minimally invasive workflows',
    targetAudience: 'General Surgeons, Gynecologists, Surgical Residents & FMGs',
    deliveryModes: ['Clinical Simulation', 'Hospital Rotation', 'Live Classes'],
    duration: '8 – 12 Weeks Fellowship',
    affiliation: 'Minimally Invasive Surgery Simulation Division',
    summary:
      'Hands-on surgical simulation fellowship utilizing laparoscopic box trainers and clinical observation to master depth perception, ergonomic port placement, energy devices, and intracorporeal knotting.',
    syllabusModules: [
      '01. Laparoscopic Ergonomics, Pneumoperitoneum & Safe Trocar Entry',
      '02. Endotrainer Peg Transfer, Precision Cutting & Bimanual Coordination',
      '03. Intracorporeal & Extracorporeal Laparoscopic Suturing & Knotting',
      '04. Energy Device Safety & Core Laparoscopic Procedure Walkthroughs',
    ],
    outcomes: [
      'Verified hand-eye coordination and suturing speed on endotrainers',
      'Readiness for assisted and supervised minimally invasive procedures',
    ],
  },
  {
    id: 'global-nursing-licensure',
    code: 'EA-LIC-201',
    category: 'Global Nursing Licensure Preparation',
    group: 'licensure',
    title: 'NNC, NCLEX-RN, NMC OSCE & Middle East Exams',
    subtitle: 'Comprehensive test preparation with live instruction, online question banks, and timed mock exams',
    targetAudience: 'Nepal Nursing Council & International Licensure Candidates',
    deliveryModes: ['Live Classes', 'Online Courses', 'Mock Tests'],
    duration: '12 – 16 Weeks',
    affiliation: 'NNC / NCSBN / NMC UK / DHA-HAAD Blueprints',
    summary:
      'Structured preparation for national and international nursing licensure, pairing clinical judgment coaching with adaptive Next-Gen NCLEX-RN drills, NMC UK OSCE stations, and Middle East Prometric testing.',
    syllabusModules: [
      '01. Clinical Judgment Model & Prioritization Frameworks',
      '02. Next-Gen NCLEX-RN Case Studies & Adaptive Mock Exams',
      '03. NMC UK OSCE APIE Stations (Assessment, Planning, Implementation, Evaluation)',
      '04. NNC & Gulf Prometric High-Yield Core Nursing Review',
    ],
    outcomes: [
      'Weekly full-length proctored mock examinations with item analytics',
      'One-on-one clinical skills coaching for UK OSCE station timing',
      'Recorded archive access alongside daily live faculty Q&A',
    ],
    featured: true,
  },
  {
    id: 'foreign-nurse-practitioner',
    code: 'EA-LIC-204',
    category: 'Foreign Nurse Practitioner Preparation',
    group: 'licensure',
    title: 'Foreign Nurse Practitioner Preparation',
    subtitle: 'Advanced clinical reasoning, prescribing safety, and international transition readiness',
    targetAudience: 'Internationally Educated Nurses & Advanced Practice Candidates',
    deliveryModes: ['Live Classes', 'Online Courses', 'Mock Tests'],
    duration: '10 Weeks',
    affiliation: 'International Nursing Standards',
    summary:
      'Bridges advanced clinical assessment, diagnostic interpretation, and cross-border regulatory standards for experienced nurses transitioning into foreign practitioner pathways.',
    syllabusModules: [
      '01. Advanced Health Assessment & Differential Diagnosis',
      '02. Clinical Pharmacology & Safe Prescribing Protocols',
      '03. Cross-Cultural Patient Communication & Documentation',
      '04. Simulated Diagnostic Case Conferences & Mock Assessments',
    ],
    outcomes: [
      'Mastery of structured history-taking and diagnostic synthesis',
      'Readiness for international credentialing interviews and exams',
    ],
  },
  {
    id: 'doctors-foreign-trained',
    code: 'EA-DOC-401',
    category: 'Doctors / Foreign Trained Doctors',
    group: 'doctors',
    title: 'Licensure & Clinical Bridging for Foreign Trained Doctors',
    subtitle: 'Medical licensing exam coaching, structured clinical stations, and evidence-based updates',
    targetAudience: 'MBBS Graduates & Foreign Trained Medical Officers',
    deliveryModes: ['Live Classes', 'Online Courses', 'Mock Tests'],
    duration: '14 Weeks',
    affiliation: 'NMCLE & International Medical Exam Frameworks',
    summary:
      'Focused academic and clinical reasoning programme built for foreign-trained medical graduates preparing for national medical council licensing and hospital clinical practice.',
    syllabusModules: [
      '01. Internal Medicine, Surgery & Obstetrics High-Yield Integration',
      '02. Clinical Ethics, Medico-Legal Practice & Prescribing Accuracy',
      '03. System-Wise Timed Question Banks & Error Diagnostics',
      '04. Structured Viva & Clinical Case Presentation Workshops',
    ],
    outcomes: [
      'Systematic gap-closure across pre-clinical and clinical disciplines',
      'Diagnostic mock-test scorecards tracking percentile progression',
    ],
  },
  {
    id: 'international-observership-fmg',
    code: 'EA-DOC-405',
    category: 'International Clinical Observership Programs',
    group: 'doctors',
    title: 'International Clinical Observership for FMGs / IMGs',
    subtitle: 'Supervised hospital ward exposure, case logging, and international residency portfolio readiness',
    targetAudience: 'Foreign Medical Graduates (FMGs) & International Medical Graduates (IMGs)',
    deliveryModes: ['Hospital Rotation', 'Clinical Simulation'],
    duration: '4 – 8 Weeks',
    affiliation: 'Partner Teaching Hospitals & Clinical Mentors',
    summary:
      'Guided clinical observerships giving FMGs and IMGs structured exposure to ward rounds, diagnostic workups, interdisciplinary teamwork, and standardized clinical documentation.',
    syllabusModules: [
      '01. Inpatient Ward Rounds & Bedside Clinical Observation',
      '02. Structured Case Presentations & Mortality/Morbidity Review',
      '03. Electronic Documentation, SOAP Notes & Referral Standards',
      '04. Mentorship Feedback & Clinical Evaluation Dossiers',
    ],
    outcomes: [
      'Verified clinical observership completion documentation',
      'Direct mentorship from senior attending physicians',
    ],
    featured: true,
  },
  {
    id: 'cardiology-clinical-training',
    code: 'EA-CRD-604',
    category: 'Cardiology',
    group: 'emergency',
    title: 'Clinical Cardiology & ECG Interpretation',
    subtitle: '12-lead ECG mastery, acute coronary syndrome pathways, and arrhythmia recognition',
    targetAudience: 'Doctors, ICU/CCU Nurses & Emergency Clinicians',
    deliveryModes: ['Live Classes', 'Mock Tests', 'Clinical Simulation'],
    duration: '6 Weeks',
    affiliation: 'Cardiovascular Training Division',
    summary:
      'Focused cardiovascular diagnostics and acute management course emphasizing rapid 12-lead ECG interpretation, lethal arrhythmia recognition, and guideline-directed ACS care.',
    syllabusModules: [
      '01. Systematic 12-Lead ECG Axis, Intervals & Ischemia Localization',
      '02. Bradyarrhythmias, Tachyarrhythmias & Emergency Cardioversion',
      '03. Acute Coronary Syndrome (STEMI/NSTEMI) Triage Protocols',
      '04. Heart Failure Stabilization & Cardiac Biomarker Correlation',
    ],
    outcomes: [
      'Rapid, accurate bedside ECG strip triage under timed scenarios',
      'Confidence managing acute cardiovascular emergencies in ward and CCU settings',
    ],
  },
  {
    id: 'international-affiliated-it-mgmt',
    code: 'EA-INT-801',
    category: 'International Affiliated Programme',
    group: 'accredited',
    title: 'International Affiliated Programmes (Health, IT & Management)',
    subtitle: 'Cross-disciplinary skill development bridging healthcare leadership, health IT, and management',
    targetAudience: 'Healthcare Coordinators, Graduates & Career Transitioners',
    deliveryModes: ['Live Classes', 'Online Courses'],
    duration: '10 – 12 Weeks',
    affiliation: 'International Vocational & Management Frameworks',
    summary:
      'Building on Enlight Academy’s foundation in healthcare education, our expanded skill-based development tracks combine international clinical administration, healthcare IT fluency, and operational management.',
    syllabusModules: [
      '01. Healthcare Operations, Clinic Workflow & Patient Systems',
      '02. Digital Health Records, Data Fluency & Applied IT Tools',
      '03. Leadership, Team Coordination & Quality Assurance Audits',
      '04. Capstone Applied Project for Healthcare & Service Organizations',
    ],
    outcomes: [
      'Dual competency across healthcare governance and digital management tools',
      'Readiness for supervisory and administrative roles in clinics and NGOs',
    ],
  },
];

export const OUR_SERVICES: AcademyServiceItem[] = [
  {
    number: '01.',
    title: 'Dialysis Assistance',
    categoryLabel: 'Renal & Clinical Skills',
    summary:
      'Hemodialysis machine setup, circuit priming, AV fistula access care, and intradialytic complication monitoring.',
    programId: 'dialysis-assistance',
  },
  {
    number: '02.',
    title: 'AHA / Non-AHA BLS & ACLS',
    categoryLabel: 'Life Support & Resuscitation',
    summary:
      'High-quality CPR, AED deployment, airway adjuncts, and ACLS megacode resuscitation algorithms with simulation manikins.',
    programId: 'aha-non-aha-bls-acls',
  },
  {
    number: '03.',
    title: 'First Aid and Emergency Management',
    categoryLabel: 'Acute & Community Response',
    summary:
      'Primary ABCDE trauma survey, hemorrhage control, splinting, and rapid stabilization for clinical and workplace emergencies.',
    programId: 'first-aid-emergency-management',
  },
  {
    number: '04.',
    title: 'Ventilator Workshop',
    categoryLabel: 'ICU Respiratory Care',
    summary:
      'Hands-on training on invasive and non-invasive ventilation modes, waveform analysis, ABG matching, and alarm troubleshooting.',
    programId: 'ventilator-workshop',
  },
  {
    number: '05.',
    title: 'Research and Data Analysis',
    categoryLabel: 'Biostatistics & Publication',
    summary:
      'Clinical study design, IRB protocol preparation, SPSS/R statistical hypothesis testing, and peer-reviewed manuscript writing.',
    programId: 'research-statistical-analysis',
  },
  {
    number: '06.',
    title: 'Infection Prevention and Control',
    categoryLabel: 'Hospital Quality & Safety',
    summary:
      'Standard precautions, VAP/CLABSI/CAUTI care bundles, CSSD sterilization validation, and biomedical waste compliance.',
    programId: 'infection-prevention-control',
  },
  {
    number: '07.',
    title: 'Critical Care Nursing',
    categoryLabel: 'ICU & CCU Nursing',
    summary:
      'Intensive bedside training covering hemodynamic monitoring, vasoactive infusions, ABG interpretation, and sepsis care.',
    programId: 'critical-care-nurse-training',
  },
  {
    number: '08.',
    title: 'Operation Theater Assistance',
    categoryLabel: 'Surgical & Perioperative Care',
    summary:
      'Sterile scrubbing, gowning and gloving, surgical instrument tray preparation, and WHO surgical safety checklist workflows.',
    programId: 'operation-theater-assistance',
  },
  {
    number: '09.',
    title: 'CTEVT Affiliated Short Course & Fellowships',
    categoryLabel: 'Accredited Short Courses & Medical Fellowships',
    summary:
      'Competency-based CTEVT vocational short courses alongside specialised Caregiver and postgraduate clinical fellowship tracks.',
    programId: 'ctevt-affiliated-programmes',
    subTracks: [
      {
        title: 'Caregiver (City & Guilds / CTEVT)',
        programId: 'city-guilds-caregiver',
      },
      {
        title: 'Fellowship Training on Regional Anesthesia & Pain Medicine',
        programId: 'fellowship-regional-anesthesia',
      },
      {
        title: 'Fellowship in Laparoscopic Training',
        programId: 'fellowship-laparoscopic-training',
      },
    ],
  },
];

export const LICENSURE_TRACKS: LicensureTrack[] = [
  {
    id: 'nnc',
    code: 'NNC-NP',
    name: 'Nepal Nursing Council (NNC)',
    region: 'Nepal',
    examBody: 'Nepal Nursing Council Licensing Board',
    deliveryCadence: 'Daily Live Concept Classes + Weekend Mock Drills',
    mockSchedule: '12 Full-Length Proctored CBT Mock Tests',
    passFocus: 'Core medical-surgical, midwifery, community health, and pediatric nursing rationales.',
    corePillars: [
      'Syllabus-mapped topic tests across all PCL and B.Sc. nursing domains',
      'Detailed faculty rationale walkthroughs after every weekend mock exam',
      'Targeted remediation sessions for weak clinical subject areas',
    ],
  },
  {
    id: 'nclex',
    code: 'NCLEX-RN',
    name: 'Next-Gen NCLEX-RN',
    region: 'United States · Canada · Australia',
    examBody: 'NCSBN Computerized Adaptive Testing',
    deliveryCadence: 'Live Clinical Judgment Seminars + Adaptive Q-Bank',
    mockSchedule: '10 CAT Readiness Assessments (85–150 Questions)',
    passFocus: 'NCSBN Clinical Judgment Measurement Model (CJMM), bowtie, matrix, and unfolding case studies.',
    corePillars: [
      'Unfolding Next-Generation case studies led by US-licensed nurse educators',
      'Prioritization, delegation, and high-alert pharmacology mastery',
      'Individual CAT readiness analytics before booking your Pearson VUE date',
    ],
  },
  {
    id: 'osce',
    code: 'NMC-OSCE',
    name: 'NMC UK OSCE & CBT',
    region: 'United Kingdom',
    examBody: 'Nursing and Midwifery Council (UK)',
    deliveryCadence: 'In-Person Simulation Stations + Online CBT Prep',
    mockSchedule: 'Timed 10-Station Simulated OSCE Circuit Evaluations',
    passFocus: 'APIE care planning, aseptic non-touch technique (ANTT), medication administration, and patient dignity.',
    corePillars: [
      'Full simulation of Assessment, Planning, Implementation, and Evaluation stations',
      'Strict timer discipline and UK NHS communication standards',
      'Individualized examiner rubric feedback on silent and verbalized actions',
    ],
  },
  {
    id: 'middle-east',
    code: 'DHA / MOH / HAAD',
    name: 'Middle East Licensure Exams',
    region: 'UAE · Saudi Arabia · Qatar · Oman',
    examBody: 'DHA / DOH (HAAD) / MOH / SCFHS / QCHP',
    deliveryCadence: 'Live High-Yield Review + Prometric Exam Simulator',
    mockSchedule: '8 Timed Prometric Simulation Exams',
    passFocus: 'Acute care protocols, maternal-child safety, infection control, and Gulf clinical guidelines.',
    corePillars: [
      'Exam-specific question blueprints tailored to DHA, DOH, MOH, and Saudi Prometric',
      'Credentialing guidance and DataFlow documentation orientation',
      'Flexible online batches for working ward nurses',
    ],
  },
];

export const INSTITUTIONAL_PILLARS = [
  {
    number: '01',
    title: 'Simulation-First Clinical Pedagogy',
    description:
      'Inspired by international medical simulation centers, learners practice BLS/ACLS megacodes, ventilator troubleshooting, laparoscopic suturing, and OSCE stations in structured, debriefed clinical scenarios.',
  },
  {
    number: '02',
    title: 'Global & National Accreditation Alignment',
    description:
      'As a City & Guilds (UK) approved training centre for Health & Social Care and a provider of CTEVT-affiliated short courses, our curricula map cleanly to recognized domestic and international qualifications.',
  },
  {
    number: '03',
    title: 'Hybrid Live Classes, Online Courses & Mock Tests',
    description:
      'Every cohort combines interactive faculty-led classes with recorded module libraries and timed mock assessments so working clinicians and full-time students progress with measurable exam readiness.',
  },
  {
    number: '04',
    title: 'From Nursing & Critical Care to Fellowships & Research',
    description:
      'Extending from Dialysis, OT Assistance, and Caregiver training into Regional Anesthesia & Laparoscopic Fellowships, clinical observerships, and biostatistics research.',
  },
];

export const FACULTY_HIGHLIGHTS: FacultyHighlight[] = [
  {
    id: 'fac-1',
    name: 'Dr. Ramesh Adhikari, MD',
    credentials: 'Emergency, Critical Care & Regional Anesthesia Lead',
    department: 'BLS/ACLS, Ventilator & Pain Medicine Fellowships',
    focus: 'Acute resuscitation simulation, ultrasound-guided nerve blocks, and FMG clinical reasoning.',
    experience: '14+ years clinical & academic teaching',
  },
  {
    id: 'fac-2',
    name: 'Prof. Sunita Maharjan, M.Sc. Nursing',
    credentials: 'Critical Care & Global Licensure Lead',
    department: 'Critical Care Nursing, Dialysis & NCLEX / OSCE',
    focus: 'ICU ventilator nursing, renal dialysis assistance, Next-Gen NCLEX, and UK OSCE coaching.',
    experience: '12+ years ICU & international exam mentorship',
  },
  {
    id: 'fac-3',
    name: 'Anjana Shrestha, B.Sc. Nursing, Cert. Assessor',
    credentials: 'Lead Vocational Care & IPC Assessor',
    department: 'CTEVT Short Courses, Caregiver & Infection Control',
    focus: 'City & Guilds Level 2 Age Care, OT asepsis, and hospital infection prevention audits.',
    experience: '10+ years UK & Nepal social care training',
  },
  {
    id: 'fac-4',
    name: 'Dr. Bikash Koirala, MPH, PhD',
    credentials: 'Biostatistician & Research Methodologist',
    department: 'Research, Data Analysis & Health Management',
    focus: 'Epidemiological study design, SPSS/R clinical data analysis, and publication mentorship.',
    experience: '11+ years health research & CTEVT curriculum',
  },
];

export type FaqCategory = 'enrollment' | 'certification' | 'prerequisites';

export interface AcademyFaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  question: string;
  answer: string;
  relatedProgramId?: string;
  relatedProgramLabel?: string;
}

export const ACADEMY_FAQS: AcademyFaqItem[] = [
  {
    id: 'faq-enroll-process',
    category: 'enrollment',
    categoryLabel: 'Enrollment',
    question: 'How do I enrol in an upcoming cohort and confirm my seat?',
    answer:
      'Submit the Admissions inquiry form above with your current qualification, preferred programme, and study mode (Live Classes, Online Courses & Mock Tests, or In-Person Clinical Simulation). Our academic desk verifies eligibility within one working day, shares batch timings and fee schedules, and issues a cohort seat confirmation—or message us directly on WhatsApp (+977 9809494619) during counselling hours (Sunday – Friday, 07:00 – 19:00 NPT).',
  },
  {
    id: 'faq-enroll-modes',
    category: 'enrollment',
    categoryLabel: 'Enrollment',
    question: 'Can working nurses and doctors join evening or online cohorts?',
    answer:
      'Yes. For NNC, Next-Gen NCLEX-RN, Middle East Prometric, and Research & Data Analysis programmes, Enlight Academy provides flexible morning and evening live faculty sessions paired with full recorded lecture archives and timed online mock exams. Hands-on skills stations—such as BLS/ACLS megacodes, Ventilator workshops, Dialysis, and UK OSCE simulation—schedule small-group practical slots around hospital shift rosters.',
    relatedProgramId: 'global-nursing-licensure',
    relatedProgramLabel: 'Global Nursing Licensure',
  },
  {
    id: 'faq-enroll-documents',
    category: 'enrollment',
    categoryLabel: 'Enrollment',
    question: 'What documents are required at the time of admission?',
    answer:
      'Applicants provide a valid citizenship or passport ID, academic transcript or council registration certificate (PCL/B.Sc. Nursing, MBBS/FMG, or +2/SEE certificate depending on track), and two passport photographs for practical lab badges. Caregiver diploma candidates also receive orientation on portfolio evidence logging.',
  },
  {
    id: 'faq-cert-bls-acls',
    category: 'certification',
    categoryLabel: 'Certification Validity',
    question: 'Are AHA and Non-AHA BLS & ACLS certificates valid for hospitals and overseas employers?',
    answer:
      'Yes. Our AHA-aligned BLS and ACLS certifications carry an official 2-year international validity cycle recognised by tertiary hospitals, critical care units, and overseas nurse/physician employers. Institutional Non-AHA resuscitation certificates verify hands-on CPR, AED, and megacode station mastery for domestic clinical privileging and academic onboarding.',
    relatedProgramId: 'aha-non-aha-bls-acls',
    relatedProgramLabel: 'AHA / Non-AHA BLS & ACLS',
  },
  {
    id: 'faq-cert-caregiver-ctevt',
    category: 'certification',
    categoryLabel: 'Certification Validity',
    question: 'How is the Caregiver certification accredited for international and Nepal employment?',
    answer:
      'Enlight Academy Pvt. Ltd. is an approved City & Guilds (UK) training centre for Health & Social Care (Level 2 Diploma in Age Care) as well as a CTEVT-affiliated short-course provider. City & Guilds (UK) qualifications carry international vocational recognition across the United Kingdom, Europe, Japan care pathways, and domestic health facilities, while CTEVT short courses align with Nepal National Skill Testing Board standards.',
    relatedProgramId: 'city-guilds-caregiver',
    relatedProgramLabel: 'Caregiver & City & Guilds Diploma',
  },
  {
    id: 'faq-cert-fellowships-ipc',
    category: 'certification',
    categoryLabel: 'Certification Validity',
    question: 'Do Fellows and FMG/IMG Observership candidates receive verified competency dossiers?',
    answer:
      'Yes. Graduates completing Critical Care Nursing, Dialysis Assistance, OT Assistance, Regional Anesthesia & Pain Medicine, Laparoscopic Training, or FMG/IMG Clinical Observerships receive formal institutional certificates detailing clinical contact hours, procedure logs, OSCE pass assessments, and attending faculty verification.',
    relatedProgramId: 'international-observership-fmg',
    relatedProgramLabel: 'FMG / IMG Clinical Observership',
  },
  {
    id: 'faq-prereq-nursing-icu',
    category: 'prerequisites',
    categoryLabel: 'Prerequisites',
    question: 'What are the prerequisites for Critical Care Nursing, Ventilator Workshop, and Dialysis Assistance?',
    answer:
      'Critical Care Nursing and Dialysis Assistance are open to PCL Nursing, B.Sc. Nursing, BNS, and registered allied health graduates (with council license or final-year academic clearance). The Mechanical Ventilator Workshop welcomes ICU/CCU nurses, medical officers, and postgraduate residents seeking practical waveform and ABG fluency.',
    relatedProgramId: 'critical-care-nurse-training',
    relatedProgramLabel: 'Critical Care Nursing',
  },
  {
    id: 'faq-prereq-caregiver',
    category: 'prerequisites',
    categoryLabel: 'Prerequisites',
    question: 'Do I need a prior nursing degree to enrol in Caregiver or First Aid courses?',
    answer:
      'No prior nursing degree is required for the City & Guilds (UK) Level 2 Caregiver Diploma, CTEVT vocational short courses, or First Aid & Emergency Management. Candidates with +2/high-school completion (or relevant healthcare entrant background) and strong motivation for safe patient and elder care are eligible after counselling screening.',
    relatedProgramId: 'city-guilds-caregiver',
    relatedProgramLabel: 'Caregiver & City & Guilds Diploma',
  },
  {
    id: 'faq-prereq-doctors-fellowship',
    category: 'prerequisites',
    categoryLabel: 'Prerequisites',
    question: 'Who is eligible for Regional Anesthesia, Laparoscopic Training, and FMG/IMG Licensure?',
    answer:
      'Fellowship Training on Regional Anesthesia & Pain Medicine requires an MD/MS Anesthesia qualification or active postgraduate residency. Fellowship in Laparoscopic Training is open to General Surgeons, Gynecologists, surgical residents, and qualified medical graduates. Foreign Trained Doctor Licensure (NMCLE) and FMG/IMG Clinical Observership tracks accept MBBS graduates holding verified medical university transcripts.',
    relatedProgramId: 'fellowship-regional-anesthesia',
    relatedProgramLabel: 'Regional Anesthesia Fellowship',
  },
];

export type AcademicUpdateType = 'deadline' | 'cohort';

export interface AcademicUpdateItem {
  id: string;
  type: AcademicUpdateType;
  tagLabel: string;
  dateText: string;
  headline: string;
  programId: string;
  actionLabel: string;
}

export const ACADEMIC_UPDATES: AcademicUpdateItem[] = [
  {
    id: 'upd-acls-bls-nov',
    type: 'deadline',
    tagLabel: 'Registration Deadline',
    dateText: 'Nov 22, 2026',
    headline: 'AHA / Non-AHA BLS & ACLS Megacode Batch (Starts Nov 25) — 4 Seats Remaining',
    programId: 'aha-non-aha-bls-acls',
    actionLabel: 'Reserve Seat',
  },
  {
    id: 'upd-caregiver-dec',
    type: 'cohort',
    tagLabel: 'Cohort Start',
    dateText: 'Dec 01, 2026',
    headline: 'City & Guilds (UK) Level 2 Caregiver & CTEVT Morning Intake Opens Admissions',
    programId: 'city-guilds-caregiver',
    actionLabel: 'Apply Now',
  },
  {
    id: 'upd-nclex-osce-nov',
    type: 'deadline',
    tagLabel: 'Urgent Deadline',
    dateText: 'Nov 24, 2026',
    headline: 'Next-Gen NCLEX-RN & NMC UK 10-Station OSCE Mock Series Registration Closes',
    programId: 'global-nursing-licensure',
    actionLabel: 'Enrol Track',
  },
  {
    id: 'upd-ventilator-dec',
    type: 'cohort',
    tagLabel: 'Workshop Dates',
    dateText: 'Dec 04 – 07, 2026',
    headline: 'Intensive Mechanical Ventilator Waveform & ABG Troubleshooting Workshop',
    programId: 'ventilator-workshop',
    actionLabel: 'Book Slot',
  },
  {
    id: 'upd-critical-care-dec',
    type: 'cohort',
    tagLabel: 'Cohort Start',
    dateText: 'Dec 08, 2026',
    headline: 'Critical Care Nursing (8-Week ICU Simulation) & Dialysis Assistance Evening Batch',
    programId: 'critical-care-nurse-training',
    actionLabel: 'Apply Batch',
  },
  {
    id: 'upd-fellowship-dec',
    type: 'deadline',
    tagLabel: 'Fellowship Intake',
    dateText: 'Nov 30, 2026',
    headline: 'Regional Anesthesia & Laparoscopic Simulation Fellowships — December Dossier Cutoff',
    programId: 'fellowship-regional-anesthesia',
    actionLabel: 'Submit Inquiry',
  },
];

