import { Activity, ArrowRight, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';
import { COURSE_PROGRAMS, CourseProgram } from '../data/academyData';
import { PageHeader } from './PageHeader';
import { PageRoute } from '../utils/academyLogic';

interface SimulationPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProgram: (program: CourseProgram) => void;
  onApplyProgram: (programId: string) => void;
}

const SIMULATION_LABS = [
  {
    code: 'SIM-01',
    title: 'AHA / Non-AHA BLS, ACLS & Emergency Trauma Bay',
    cadre: 'Doctors · Nurses · Paramedics',
    summary:
      'Team-based high-quality CPR, AED usage, ACLS megacode algorithms, primary trauma survey drills, and structured crisis resource management debriefings.',
    stations: [
      'Adult, Child & Infant High-Quality CPR & AED Stations',
      'ACLS Megacode Arrhythmia & Airway Rescue Simulation',
      'ABCDE Trauma Triage, Bleeding Control & First Aid',
    ],
    programId: 'aha-non-aha-bls-acls',
  },
  {
    code: 'SIM-02',
    title: 'Ventilator Workshop & Critical Care ICU Lab',
    cadre: 'ICU Nurses · Medical Officers · Residents',
    summary:
      'High-acuity bedside ICU scenarios covering mechanical ventilation modes, waveform troubleshooting, ABG acid-base matching, and hemodynamic monitoring.',
    stations: [
      'VCV, PCV, SIMV & NIV Modes + Waveform Dyssynchrony',
      '12-Parameter Hemodynamic & Central Line Care',
      'ABG Interpretation & Acute Deterioration SBAR Drills',
    ],
    programId: 'ventilator-workshop',
  },
  {
    code: 'SIM-03',
    title: 'Dialysis & Operation Theater Assistance Suite',
    cadre: 'Nurses · Allied Health & Surgical Support',
    summary:
      'Practical procedural stations in hemodialysis circuit priming and AV fistula care alongside sterile OT scrubbing, gowning, instrument trays, and IPC bundles.',
    stations: [
      'Hemodialysis Machine Setup, Priming & Intradialytic Drills',
      'OT Sterile Scrubbing, Gowning & Surgical Instrument Sets',
      'WHO Surgical Safety Checklist & Infection Control Audits',
    ],
    programId: 'operation-theater-assistance',
  },
  {
    code: 'SIM-04',
    title: 'Laparoscopic & Regional Anesthesia Fellowship Lab',
    cadre: 'Surgeons · Anesthesiologists · Residents',
    summary:
      'Postgraduate hands-on simulation utilizing laparoscopic box trainers for intracorporeal suturing and ultrasound phantoms for regional nerve block precision.',
    stations: [
      'Endotrainer Peg Transfer, Cutting & Intracorporeal Knotting',
      'Ultrasound-Guided Upper, Lower & Fascial Plane Nerve Blocks',
      'Multimodal Pain Medicine & LAST Crisis Protocols',
    ],
    programId: 'fellowship-laparoscopic-training',
  },
];

export function SimulationPage({
  onNavigate,
  onSelectProgram,
  onApplyProgram,
}: SimulationPageProps) {
  const findProgram = (id: string) => COURSE_PROGRAMS.find((p) => p.id === id);

  return (
    <div>
      <PageHeader
        kicker="Clinical Simulation Labs & Supervised Observerships"
        title="Simulation & Hands-On Clinical Practice"
        description="Structured scenario-based simulation inspired by international medical simulation centers, paired with supervised hospital observerships for Foreign Medical Graduates (FMGs / IMGs)."
        currentLabel="Simulation"
        onNavigate={onNavigate}
      />

      {/* Simulation Pedagogy & 4 Dedicated Labs */}
      <section className="py-16 bg-white border-b border-[#DCE3DE]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-[#DCE3DE]">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-medium text-[#0E5A5A]">
                Briefing · Scenario Execution · Faculty Debriefing
              </p>
              <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[#102018]">
                Deliberate Clinical Practice Before High-Stakes Care
              </h2>
              <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
                Every simulation module follows a three-step clinical cycle: pre-briefing on evidence-based protocols, timed hands-on station performance, and structured faculty debriefing to strengthen diagnostic clarity and team communication.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-lg p-4 space-y-1">
                <Activity className="h-4 w-4 text-[#164424]" aria-hidden="true" />
                <p className="font-semibold text-[#102018] pt-1">OSCE Timing</p>
                <p className="text-[#4A5D52]">Timed APIE &amp; acute response stations</p>
              </div>
              <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-lg p-4 space-y-1">
                <HeartPulse className="h-4 w-4 text-[#164424]" aria-hidden="true" />
                <p className="font-semibold text-[#102018] pt-1">Cardiology ECG</p>
                <p className="text-[#4A5D52]">12-lead strip &amp; rhythm recognition</p>
              </div>
              <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-lg p-4 space-y-1">
                <ShieldCheck className="h-4 w-4 text-[#164424]" aria-hidden="true" />
                <p className="font-semibold text-[#102018] pt-1">UK &amp; CTEVT</p>
                <p className="text-[#4A5D52]">Verified vocational competency skills</p>
              </div>
              <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-lg p-4 space-y-1">
                <Stethoscope className="h-4 w-4 text-[#164424]" aria-hidden="true" />
                <p className="font-semibold text-[#102018] pt-1">Ward Rotations</p>
                <p className="text-[#4A5D52]">FMG / IMG clinical observerships</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SIMULATION_LABS.map((lab) => {
              const linkedProgram = findProgram(lab.programId);
              return (
                <article
                  key={lab.code}
                  className="bg-white border border-[#DCE3DE] rounded-xl p-6 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#4A5D52]">
                      <span className="font-mono font-medium text-[#164424]">{lab.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{lab.cadre}</span>
                    </div>
                    <h3 className="font-editorial text-2xl font-semibold text-[#102018]">
                      {lab.title}
                    </h3>
                    <p className="text-sm text-[#3E4F45] leading-relaxed">{lab.summary}</p>

                    <ul className="pt-3 border-t border-[#EEF2EF] space-y-2">
                      {lab.stations.map((station) => (
                        <li key={station} className="text-xs sm:text-sm text-[#102018]">
                          · {station}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#EEF2EF] flex flex-wrap items-center justify-between gap-3">
                    {linkedProgram && (
                      <button
                        type="button"
                        onClick={() => onSelectProgram(linkedProgram)}
                        className="text-sm font-semibold text-[#164424] hover:underline cursor-pointer"
                      >
                        Inspect Full Syllabus
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onApplyProgram(lab.programId)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer"
                    >
                      Book Lab Cohort
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FMG / IMG International Clinical Observership Block */}
      <section className="py-16 bg-[#F7F9F7]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#DCE3DE] rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-medium text-[#0E5A5A]">
                Doctors &amp; Foreign Medical Graduates (FMGs / IMGs)
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#102018]">
                International Clinical Observerships &amp; Hospital Rotations
              </h2>
              <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
                Structured 4-to-8-week supervised hospital observerships designed for foreign-trained doctors and international medical graduates. Participants join inpatient ward rounds, practice standardized SOAP documentation, present clinical cases, and receive mentorship for licensing and residency portfolios.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <button
                type="button"
                onClick={() => onApplyProgram('international-observership-fmg')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Observership Placement</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const prog = findProgram('international-observership-fmg');
                  if (prog) onSelectProgram(prog);
                }}
                className="text-sm font-semibold text-[#164424] hover:underline cursor-pointer"
              >
                View Observership Syllabus
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
