export function WeddingLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="#f8f4f1" />

      {/* Left chair */}
      <path d="M12 22 L12 38" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M12 38 L22 38" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M22 38 L22 44" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M12 38 L12 44" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M10 22 L14 22" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Right chair */}
      <path d="M52 22 L52 38" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M42 38 L52 38" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M42 38 L42 44" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M52 38 L52 44" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M50 22 L54 22" stroke="#b8868e" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Table */}
      <ellipse cx="32" cy="36" rx="8" ry="3" fill="none" stroke="#b8868e" strokeWidth="2" />
      <path d="M32 39 L32 46" stroke="#b8868e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28 46 L36 46" stroke="#b8868e" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Small flower accent on table */}
      <circle cx="32" cy="33.5" r="1.5" fill="#c9a66b" opacity="0.6" />
      <circle cx="30" cy="33" r="0.8" fill="#b8868e" opacity="0.4" />
      <circle cx="34" cy="33" r="0.8" fill="#b8868e" opacity="0.4" />
    </svg>
  );
}
