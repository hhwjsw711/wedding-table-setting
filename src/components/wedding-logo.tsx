export function WeddingLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="#f8f4f1" />

      {/* Left chair back */}
      <path d="M11 18 L11 36" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M9 18 L15 18" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Left chair seat */}
      <rect x="11" y="36" width="13" height="2.5" rx="1" fill="#b8868e" />
      {/* Left chair legs */}
      <path d="M23 38.5 L23 46" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M13 38.5 L13 46" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Right chair back */}
      <path d="M53 18 L53 36" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M49 18 L55 18" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Right chair seat */}
      <rect x="40" y="36" width="13" height="2.5" rx="1" fill="#b8868e" />
      {/* Right chair legs */}
      <path d="M41 38.5 L41 46" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M51 38.5 L51 46" stroke="#b8868e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Table */}
      <rect x="25" y="32" width="14" height="3" rx="1.5" fill="#c9a66b" opacity="0.35" />
      <rect x="25" y="32" width="14" height="3" rx="1.5" fill="none" stroke="#b8868e" strokeWidth="2" />
      <path d="M32 35 L32 44" stroke="#b8868e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28 44 L36 44" stroke="#b8868e" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Flower accent */}
      <circle cx="32" cy="31" r="2" fill="#c9a66b" opacity="0.7" />
      <circle cx="30" cy="30" r="1" fill="#b8868e" opacity="0.5" />
      <circle cx="34" cy="30" r="1" fill="#b8868e" opacity="0.5" />
    </svg>
  );
}
