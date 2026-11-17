import { ChevronRight } from 'lucide-react';
import { PageRoute } from '../utils/academyLogic';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  currentLabel: string;
  onNavigate: (route: PageRoute) => void;
}

export function PageHeader({
  kicker,
  title,
  description,
  currentLabel,
  onNavigate,
}: PageHeaderProps) {
  return (
    <section className="bg-[#F7F9F7] border-b border-[#DCE3DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 lg:py-14 space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4A5D52]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#164424] hover:underline cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-[#6B7D72]" aria-hidden="true" />
          <span className="font-medium text-[#102018]" aria-current="page">
            {currentLabel}
          </span>
        </nav>

        <div className="max-w-3xl space-y-2.5">
          <p className="text-xs font-medium tracking-wide text-[#0E5A5A]">{kicker}</p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#102018] text-balance">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#3E4F45] leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
