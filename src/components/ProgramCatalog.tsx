import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  COURSE_PROGRAMS,
  CourseProgram,
  PROGRAM_GROUPS,
  ProgramGroup,
} from '../data/academyData';
import { countProgramsByGroup, filterPrograms } from '../utils/academyLogic';

interface ProgramCatalogProps {
  onSelectProgram: (program: CourseProgram) => void;
  onApplyProgram: (program: CourseProgram) => void;
}

export function ProgramCatalog({ onSelectProgram, onApplyProgram }: ProgramCatalogProps) {
  const [selectedGroup, setSelectedGroup] = useState<ProgramGroup>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const groupCounts = useMemo(() => countProgramsByGroup(COURSE_PROGRAMS), []);

  const filteredPrograms = useMemo(
    () => filterPrograms(COURSE_PROGRAMS, selectedGroup, searchQuery),
    [selectedGroup, searchQuery]
  );

  const handleResetFilters = () => {
    setSelectedGroup('all');
    setSearchQuery('');
  };

  return (
    <section id="programs" className="py-12 lg:py-14 bg-white border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Heading & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">
              Academic Catalogue · {COURSE_PROGRAMS.length} Programmes, Services &amp; Fellowships
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#102018] text-balance">
              Clinical, Licensure &amp; Vocational Programmes
            </h2>
            <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed">
              Filter by clinical discipline or search by workshop, certification, fellowship, or exam to inspect full module syllabi.
            </p>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <label htmlFor="program-search" className="block text-xs font-medium text-[#3E4F45] mb-1.5">
              Search programmes, services, or fellowships
            </label>
            <div className="relative">
              <Search
                className="h-4 w-4 text-[#56695E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="program-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Dialysis, BLS, Ventilator, Laparoscopic..."
                className="w-full pl-9 pr-9 py-2.5 text-sm bg-[#F7F9F7] border border-[#DCE3DE] rounded-md text-[#102018] placeholder:text-[#6B7D72] focus:bg-white focus:border-[#164424] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear programme search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#56695E] hover:text-[#102018] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Filter Tabs (Segmented Button Bar) */}
        <div
          role="tablist"
          aria-label="Filter training programmes by category"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F7F9F7] border border-[#DCE3DE] rounded-lg"
        >
          {PROGRAM_GROUPS.map((group) => {
            const isActive = selectedGroup === group.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedGroup(group.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424] ${
                  isActive
                    ? 'bg-[#164424] text-white'
                    : 'text-[#3E4F45] hover:text-[#102018] hover:bg-white'
                }`}
              >
                <span>{group.label}</span>
                <span
                  className={`ml-1.5 font-mono text-xs tabular-nums ${
                    isActive ? 'text-white/80' : 'text-[#56695E]'
                  }`}
                >
                  ({groupCounts[group.id]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Result Summary */}
        <div className="flex items-center justify-between text-xs text-[#4A5D52] border-b border-[#EEF2EF] pb-3">
          <p className="tabular-nums">
            Showing <span className="font-semibold text-[#102018]">{filteredPrograms.length}</span> of{' '}
            {COURSE_PROGRAMS.length} programmes
            {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
          </p>
          {(selectedGroup !== 'all' || searchQuery.trim()) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="font-medium text-[#164424] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Programme Grid or Empty State */}
        {filteredPrograms.length === 0 ? (
          <div className="bg-[#F7F9F7] border border-[#DCE3DE] rounded-xl p-10 text-center space-y-4">
            <h3 className="font-editorial text-xl font-semibold text-[#102018]">
              No matching programmes found
            </h3>
            <p className="text-sm text-[#3E4F45] max-w-md mx-auto">
              No training track matched your current filter or search keyword. Reset filters to view all Enlight Academy programmes and services.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors cursor-pointer"
            >
              Show All Programmes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="program-grid">
            {filteredPrograms.map((program) => (
              <article
                key={program.id}
                className="flex flex-col justify-between bg-white border border-[#DCE3DE] hover:border-[#164424]/60 rounded-xl p-6 transition-colors duration-150"
              >
                <div className="space-y-3">
                  {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-[#4A5D52]">
                    <span className="font-mono tabular-nums font-medium text-[#164424]">
                      {program.code}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{program.category}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-semibold text-[#102018] leading-snug">
                    {program.title}
                  </h3>

                  <p className="text-sm text-[#3E4F45] leading-relaxed">
                    {program.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EEF2EF] space-y-4">
                  <dl className="space-y-2 text-xs">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[#56695E] shrink-0">Duration</dt>
                      <dd className="font-medium text-[#102018] text-right tabular-nums min-w-0">
                        {program.duration}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[#56695E] shrink-0">Format</dt>
                      <dd className="text-[#3E4F45] text-right truncate min-w-0">
                        {program.deliveryModes.join(' · ')}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[#56695E] shrink-0">Alignment</dt>
                      <dd className="text-[#3E4F45] text-right truncate min-w-0">
                        {program.affiliation}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectProgram(program)}
                      aria-label={`View syllabus for ${program.title}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164424] hover:text-[#0F3119] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      <span>View Syllabus</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onApplyProgram(program)}
                      aria-label={`Apply for ${program.title}`}
                      className="px-3.5 py-2 text-xs font-semibold text-[#102018] bg-[#F7F9F7] hover:bg-[#164424] hover:text-white border border-[#DCE3DE] hover:border-[#164424] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
