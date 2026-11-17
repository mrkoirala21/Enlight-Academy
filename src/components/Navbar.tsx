import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ACADEMY_FACTS } from '../data/academyData';
import { getPathForRoute, PAGE_ROUTES, PageRoute } from '../utils/academyLogic';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    event.preventDefault();
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 md:gap-8">
        {/* Zone 1: Brand wordmark + official emblem */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 whitespace-nowrap shrink-0 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#164424] rounded"
        >
          <img
            src={ACADEMY_FACTS.logoPath}
            alt="Enlight Academy Pvt. Ltd. emblem"
            referrerPolicy="no-referrer"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0"
          />
          <span className="font-editorial text-base sm:text-lg font-semibold tracking-tight text-[#102018] whitespace-nowrap">
            Enlight Academy
          </span>
        </a>

        {/* Zone 2: Single-line institutional navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#3E4F45]"
        >
          <a
            href="/"
            aria-current={currentRoute === 'home' ? 'page' : undefined}
            onClick={(e) => handleNavClick(e, 'home')}
            className={`whitespace-nowrap shrink-0 py-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#164424] rounded-sm ${
              currentRoute === 'home'
                ? 'text-[#164424] border-[#164424] font-semibold'
                : 'border-transparent hover:text-[#164424] hover:border-[#164424]'
            }`}
          >
            Home
          </a>
          {PAGE_ROUTES.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <a
                key={item.id}
                href={getPathForRoute(item.id)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`whitespace-nowrap shrink-0 py-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#164424] rounded-sm ${
                  isActive
                    ? 'text-[#164424] border-[#164424] font-semibold'
                    : 'border-transparent hover:text-[#164424] hover:border-[#164424]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile/tablet menu toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onNavigate('admissions');
              setMobileMenuOpen(false);
            }}
            className="px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-white bg-[#164424] hover:bg-[#0F3119] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164424]"
          >
            Apply Now
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-[#DCE3DE] text-[#102018] hover:bg-[#F7F9F7] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#DCE3DE] bg-white px-4 py-3 flex flex-col gap-1"
        >
          <a
            href="/"
            aria-current={currentRoute === 'home' ? 'page' : undefined}
            onClick={(e) => handleNavClick(e, 'home')}
            className={`py-2.5 px-2 text-sm font-medium rounded-md whitespace-nowrap ${
              currentRoute === 'home'
                ? 'bg-[#F7F9F7] text-[#164424] font-semibold'
                : 'text-[#102018] hover:bg-[#F7F9F7]'
            }`}
          >
            Home
          </a>
          {PAGE_ROUTES.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <a
                key={item.id}
                href={getPathForRoute(item.id)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-2.5 px-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F7F9F7] text-[#164424] font-semibold'
                    : 'text-[#102018] hover:bg-[#F7F9F7]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
