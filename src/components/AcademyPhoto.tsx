import { useState } from 'react';
import { Stethoscope } from 'lucide-react';

interface AcademyPhotoProps {
  src: string;
  alt: string;
  aspectClass?: string;
  objectPositionClass?: string;
  caption?: string;
  className?: string;
  captionTone?: 'light' | 'dark';
}

export function AcademyPhoto({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  objectPositionClass = 'object-[50%_25%]',
  caption,
  className = '',
  captionTone = 'light',
}: AcademyPhotoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-[#EDF2EE] ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`h-full w-full object-cover ${objectPositionClass} block`}
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="h-full w-full flex flex-col items-center justify-center gap-2 p-4 text-center bg-[#EDF2EE] text-[#164424]"
          >
            <Stethoscope className="h-7 w-7 opacity-80" aria-hidden="true" />
            <p className="text-xs font-medium text-[#3E4F45] max-w-xs leading-snug">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-2 text-xs font-mono leading-snug ${
            captionTone === 'dark' ? 'text-white/80' : 'text-[#4A5D52]'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
