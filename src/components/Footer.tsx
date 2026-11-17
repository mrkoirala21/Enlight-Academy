import { ACADEMY_FACTS } from '../data/academyData';
import { getPathForRoute, PageRoute } from '../utils/academyLogic';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="bg-white border-t border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#EEF2EF]">
          <div className="md:col-span-5 space-y-3">
            <a
              href="/"
              onClick={(e) => handleLink(e, 'home')}
              className="inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#164424] rounded"
            >
              <img
                src={ACADEMY_FACTS.logoPath}
                alt="Enlight Academy Pvt. Ltd. logo"
                referrerPolicy="no-referrer"
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="font-editorial text-base font-semibold text-[#102018]">
                  {ACADEMY_FACTS.legalName}
                </p>
                <p className="text-xs text-[#56695E]">{ACADEMY_FACTS.location}</p>
              </div>
            </a>
            <p className="text-sm text-[#3E4F45] leading-relaxed max-w-sm">
              {ACADEMY_FACTS.tagline} Approved City &amp; Guilds (UK) Health and Social Care training centre and CTEVT-affiliated academic institute.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-semibold text-[#102018]">Academy Pages</p>
            <ul className="space-y-1.5 text-xs text-[#4A5D52]">
              <li>
                <a
                  href={getPathForRoute('programs')}
                  onClick={(e) => handleLink(e, 'programs')}
                  className="hover:text-[#164424]"
                >
                  Programs &amp; Course Catalogue
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('licensure')}
                  onClick={(e) => handleLink(e, 'licensure')}
                  className="hover:text-[#164424]"
                >
                  Licensure (NNC, NCLEX-RN, OSCE)
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('simulation')}
                  onClick={(e) => handleLink(e, 'simulation')}
                  className="hover:text-[#164424]"
                >
                  Simulation Labs &amp; Observerships
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('faculty')}
                  onClick={(e) => handleLink(e, 'faculty')}
                  className="hover:text-[#164424]"
                >
                  Faculty &amp; Standards
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('admissions')}
                  onClick={(e) => handleLink(e, 'admissions')}
                  className="hover:text-[#164424]"
                >
                  Admissions &amp; Counselling
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold text-[#102018]">Admissions &amp; Accreditations</p>
            <ul className="space-y-1.5 text-xs text-[#4A5D52]">
              <li>City &amp; Guilds (UK) Approved Training Centre</li>
              <li>CTEVT Affiliated Healthcare Programmes</li>
              <li>{ACADEMY_FACTS.email}</li>
              <li className="tabular-nums">{ACADEMY_FACTS.phone}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#56695E]">
          <p>© {new Date().getFullYear()} {ACADEMY_FACTS.legalName} All rights reserved.</p>
          <p>Live Classes · Online Courses · Mock Tests · Clinical Simulation</p>
        </div>
      </div>
    </footer>
  );
}
