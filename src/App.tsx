import { useEffect, useState } from 'react';
import { COURSE_PROGRAMS, CourseProgram } from './data/academyData';
import { AdmissionsSection, SubmittedInquiry } from './components/AdmissionsSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HomeOverviewSections } from './components/HomeOverviewSections';
import { InstitutionalStandards } from './components/InstitutionalStandards';
import { LicensurePage } from './components/LicensureAndSimulation';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { ProgramCatalog } from './components/ProgramCatalog';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { SimulationPage } from './components/SimulationPage';
import { getPathForRoute, PageRoute, parseRouteFromLocation } from './utils/academyLogic';

const STORAGE_KEY = 'enlight_academy_inquiries_v1';

const ROUTE_TITLES: Record<PageRoute, string> = {
  home: 'Enlight Academy Pvt. Ltd. — Medical Training & Global Licensure Preparation',
  programs: 'Programs — Enlight Academy Pvt. Ltd.',
  licensure: 'Licensure — Enlight Academy Pvt. Ltd.',
  simulation: 'Simulation — Enlight Academy Pvt. Ltd.',
  faculty: 'Faculty — Enlight Academy Pvt. Ltd.',
  admissions: 'Admissions — Enlight Academy Pvt. Ltd.',
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    parseRouteFromLocation(window.location.pathname, window.location.hash)
  );
  const [selectedProgram, setSelectedProgram] = useState<CourseProgram | null>(null);
  const [preselectedProgramId, setPreselectedProgramId] = useState<string>(COURSE_PROGRAMS[0].id);
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submittedInquiries));
    } catch {
      // Ignore storage access errors
    }
  }, [submittedInquiries]);

  useEffect(() => {
    document.title = ROUTE_TITLES[currentRoute];
  }, [currentRoute]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseRouteFromLocation(window.location.pathname, window.location.hash));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: PageRoute) => {
    const nextPath = getPathForRoute(route);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ route }, '', nextPath);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleApplyForProgram = (programId: string) => {
    setPreselectedProgramId(programId);
    setSelectedProgram(null);
    navigateTo('admissions');
  };

  const handleAddInquiry = (inquiry: SubmittedInquiry) => {
    setSubmittedInquiries((prev) => [inquiry, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#102018]">
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <HeroSection
              onBrowsePrograms={() => navigateTo('programs')}
              onOpenApply={() => navigateTo('admissions')}
            />
            <HomeOverviewSections
              onNavigate={navigateTo}
              onSelectProgram={(program) => setSelectedProgram(program)}
              onApplyProgram={(program) => handleApplyForProgram(program.id)}
              onApplyProgramId={(programId) => handleApplyForProgram(programId)}
            />
          </>
        )}

        {currentRoute === 'programs' && (
          <>
            <PageHeader
              kicker={`Academic Catalogue · ${COURSE_PROGRAMS.length} Programmes, Workshops & Fellowships`}
              title="Programs & Course Directory"
              description="Complete medical training, AHA/Non-AHA BLS & ACLS, Dialysis & OT Assistance, Ventilator Workshop, CTEVT short courses, Caregiver, and clinical fellowships."
              currentLabel="Programs"
              onNavigate={navigateTo}
            />
            <ProgramCatalog
              onSelectProgram={(program) => setSelectedProgram(program)}
              onApplyProgram={(program) => handleApplyForProgram(program.id)}
            />
          </>
        )}

        {currentRoute === 'licensure' && (
          <LicensurePage
            onNavigate={navigateTo}
            onApplyLicensure={() => handleApplyForProgram('global-nursing-licensure')}
            onApplyDoctorsLicensure={() => handleApplyForProgram('doctors-foreign-trained')}
          />
        )}

        {currentRoute === 'simulation' && (
          <SimulationPage
            onNavigate={navigateTo}
            onSelectProgram={(program) => setSelectedProgram(program)}
            onApplyProgram={(programId) => handleApplyForProgram(programId)}
          />
        )}

        {currentRoute === 'faculty' && (
          <>
            <PageHeader
              kicker="Academic Leadership & Institutional Standards"
              title="Faculty & Teaching Methodology"
              description="Led by qualified physicians, ICU nurse educators, certified City & Guilds (UK) assessors, and clinical biostatisticians."
              currentLabel="Faculty"
              onNavigate={navigateTo}
            />
            <InstitutionalStandards />
          </>
        )}

        {currentRoute === 'admissions' && (
          <>
            <PageHeader
              kicker="Admissions & Academic Counselling"
              title="Admissions & Cohort Enrolment"
              description="Apply for upcoming live classes, online courses, mock test series, clinical simulation cohorts, or hospital observership placements."
              currentLabel="Admissions"
              onNavigate={navigateTo}
            />
            <AdmissionsSection
              preselectedProgramId={preselectedProgramId}
              submittedInquiries={submittedInquiries}
              onSubmitInquiry={handleAddInquiry}
            />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onApply={(program) => handleApplyForProgram(program.id)}
      />
    </div>
  );
}
