import { useState } from 'react';
import { Check } from 'lucide-react';
import { LICENSURE_TRACKS } from '../data/academyData';
import { PageHeader } from './PageHeader';
import { PageRoute } from '../utils/academyLogic';

interface LicensurePageProps {
  onNavigate: (route: PageRoute) => void;
  onApplyLicensure: () => void;
  onApplyDoctorsLicensure: () => void;
}

export function LicensurePage({
  onNavigate,
  onApplyLicensure,
  onApplyDoctorsLicensure,
}: LicensurePageProps) {
  const [activeTrackId, setActiveTrackId] = useState<'nnc' | 'nclex' | 'osce' | 'middle-east'>('nclex');
  const activeTrack =
    LICENSURE_TRACKS.find((track) => track.id === activeTrackId) ?? LICENSURE_TRACKS[0];

  return (
    <div>
      <PageHeader
        kicker="Global Nursing Licensure & Medical Board Preparation"
        title="National & International Licensure Pathways"
        description="Structured test preparation combining live faculty instruction, recorded online review modules, and proctored mock examinations for NNC, NCLEX-RN, NMC OSCE, Middle East Prometric, and Foreign Trained Doctors."
        currentLabel="Licensure"
        onNavigate={onNavigate}
      />

      <section className="py-16 bg-white border-b border-[#DCE3DE]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Track Switcher Tabs (Left 4 cols) */}
            <div
              role="tablist"
              aria-label="Global licensure exam tracks"
              className="lg:col-span-4 flex flex-col gap-2"
            >
              {LICENSURE_TRACKS.map((track) => {
                const isSelected = track.id === activeTrackId;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTrackId(track.id)}
                    className={`w-full text-left p-4 rounded-xl border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424] ${
                      isSelected
                        ? 'bg-[#164424] text-white border-[#164424]'
                        : 'bg-[#F7F9F7] text-[#102018] border-[#DCE3DE] hover:border-[#164424]/50'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-sm sm:text-base">{track.name}</span>
                      <span
                        className={`font-mono text-xs shrink-0 ${
                          isSelected ? 'text-white/80' : 'text-[#56695E]'
                        }`}
                      >
                        {track.code}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isSelected ? 'text-white/85' : 'text-[#4A5D52]'
                      }`}
                    >
                      {track.region}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Track Blueprint Panel (Right 8 cols) */}
            <div
              role="tabpanel"
              aria-label={`${activeTrack.name} preparation blueprint`}
              className="lg:col-span-8 bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div className="space-y-5">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#DCE3DE]">
                  <div>
                    <p className="text-xs font-mono text-[#0E5A5A]">
                      {activeTrack.code} · {activeTrack.region}
                    </p>
                    <h2 className="font-editorial text-2xl font-semibold text-[#102018] mt-1">
                      {activeTrack.name}
                    </h2>
                  </div>
                  <p className="text-xs font-medium text-[#4A5D52]">
                    {activeTrack.examBody}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3 border-b border-[#DCE3DE]">
                  <div>
                    <p className="text-xs text-[#56695E]">Instructional Format</p>
                    <p className="text-sm font-semibold text-[#102018] mt-1">
                      {activeTrack.deliveryCadence}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#56695E]">Simulated Testing Cadence</p>
                    <p className="text-sm font-semibold text-[#102018] mt-1">
                      {activeTrack.mockSchedule}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#56695E] mb-1">
                    Examination Blueprint Focus
                  </p>
                  <p className="text-sm text-[#3E4F45] leading-relaxed">{activeTrack.passFocus}</p>
                </div>

                <ul className="space-y-2.5">
                  {activeTrack.corePillars.map((pillar) => (
                    <li key={pillar} className="flex items-start gap-2.5 text-sm text-[#102018]">
                      <Check
                        className="h-4 w-4 text-[#164424] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#DCE3DE] flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#4A5D52]">
                  Includes live faculty Q&amp;A, recorded online lectures, and diagnostic mock analytics.
                </p>
                <button
                  type="button"
                  onClick={onApplyLicensure}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Apply for {activeTrack.code} Batch
                </button>
              </div>
            </div>
          </div>

          {/* Comparative Licensure Board Matrix */}
          <div className="space-y-4 pt-6 border-t border-[#DCE3DE]">
            <h2 className="font-editorial text-2xl font-semibold text-[#102018]">
              Licensure &amp; Mock Test Cadence Comparison
            </h2>
            <div className="overflow-x-auto border border-[#DCE3DE] rounded-xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F7F9F7] border-b border-[#DCE3DE] text-xs font-semibold text-[#3E4F45]">
                    <th className="py-3.5 px-4">Exam Track</th>
                    <th className="py-3.5 px-4">Target Region</th>
                    <th className="py-3.5 px-4">Instructional Format</th>
                    <th className="py-3.5 px-4">Mock Assessment Schedule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF2EF]">
                  {LICENSURE_TRACKS.map((track) => (
                    <tr key={track.id} className="hover:bg-[#F7F9F7]/60">
                      <td className="py-3.5 px-4 font-semibold text-[#102018] whitespace-nowrap">
                        <span className="font-mono text-xs text-[#164424] mr-2">{track.code}</span>
                        {track.name}
                      </td>
                      <td className="py-3.5 px-4 text-[#3E4F45]">{track.region}</td>
                      <td className="py-3.5 px-4 text-[#3E4F45]">{track.deliveryCadence}</td>
                      <td className="py-3.5 px-4 text-[#102018] tabular-nums">{track.mockSchedule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Foreign Trained Doctors & Nurse Practitioner Callout */}
          <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-[#0E5A5A]">
                Medical &amp; Advanced Practice Tracks
              </p>
              <h3 className="font-editorial text-2xl font-semibold text-[#102018]">
                Foreign Trained Doctors (NMCLE) &amp; Nurse Practitioner Preparation
              </h3>
              <p className="text-sm text-[#3E4F45] leading-relaxed">
                Alongside nursing licensure boards, Enlight Academy runs dedicated bridging batches, system-wise question banks, and structured viva coaching for Foreign Trained Doctors and Foreign Nurse Practitioner candidates.
              </p>
            </div>
            <button
              type="button"
              onClick={onApplyDoctorsLicensure}
              className="px-5 py-3 text-sm font-semibold text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Enquire for Medical Licensure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
