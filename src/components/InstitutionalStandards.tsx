import { FACULTY_HIGHLIGHTS, INSTITUTIONAL_PILLARS } from '../data/academyData';

export function InstitutionalStandards() {
  return (
    <section id="faculty" className="py-16 lg:py-20 bg-white border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
        {/* Institutional Approach (Editorial Numbered Pillars) */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Institutional Framework · Quality &amp; Capacity Building
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
              Built for Clinical Competence, Not Passive Memorisation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-2 border-t border-[#DCE3DE]">
            {INSTITUTIONAL_PILLARS.map((pillar) => (
              <div key={pillar.number} className="pt-4 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-medium text-[#164424] tabular-nums">
                    {pillar.number}.
                  </span>
                  <h3 className="font-editorial text-xl font-semibold text-[#102018]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-[#3E4F45] leading-relaxed pl-8">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Faculty & Instruction Leaders */}
        <div className="space-y-8 pt-10 border-t border-[#DCE3DE]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
                Faculty &amp; Clinical Mentors
              </p>
              <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[#102018]">
                Guided by Qualified Physicians, Nurse Educators &amp; Assessors
              </h2>
            </div>
            <p className="text-xs text-[#4A5D52] max-w-sm">
              Instruction across nursing, emergency simulation, UK vocational care, and clinical biostatistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACULTY_HIGHLIGHTS.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#0E5A5A]">{faculty.department}</p>
                  <h3 className="font-editorial text-lg font-semibold text-[#102018] leading-snug">
                    {faculty.name}
                  </h3>
                  <p className="text-xs font-medium text-[#3E4F45]">{faculty.credentials}</p>
                  <p className="text-xs text-[#4A5D52] leading-relaxed pt-1">{faculty.focus}</p>
                </div>

                <p className="text-xs font-mono text-[#164424] pt-3 border-t border-[#DCE3DE]">
                  {faculty.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
