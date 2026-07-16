export function WeddingLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="#f8f4f1" />

      {/* Round table (top-down view) */}
      <circle cx="32" cy="32" r="12" fill="#f8f0e8" stroke="#b8868e" strokeWidth="2.5" />

      {/* Table cloth inner ring */}
      <circle cx="32" cy="32" r="7" fill="none" stroke="#c9a66b" strokeWidth="1" opacity="0.5" />

      {/* Center flower */}
      <circle cx="32" cy="32" r="3" fill="#c9a66b" opacity="0.8" />
      <circle cx="32" cy="28.5" r="1.5" fill="#b8868e" opacity="0.6" />
      <circle cx="35" cy="30" r="1.5" fill="#b8868e" opacity="0.5" />
      <circle cx="35" cy="34" r="1.5" fill="#b8868e" opacity="0.5" />
      <circle cx="32" cy="35.5" r="1.5" fill="#b8868e" opacity="0.6" />
      <circle cx="29" cy="34" r="1.5" fill="#b8868e" opacity="0.5" />
      <circle cx="29" cy="30" r="1.5" fill="#b8868e" opacity="0.5" />

      {/* 8 seat dots around table */}
      <circle cx="32" cy="16" r="2.5" fill="#b8868e" opacity="0.7" />
      <circle cx="43.3" cy="20.7" r="2.5" fill="#b8868e" opacity="0.6" />
      <circle cx="48" cy="32" r="2.5" fill="#b8868e" opacity="0.7" />
      <circle cx="43.3" cy="43.3" r="2.5" fill="#b8868e" opacity="0.6" />
      <circle cx="32" cy="48" r="2.5" fill="#b8868e" opacity="0.7" />
      <circle cx="20.7" cy="43.3" r="2.5" fill="#b8868e" opacity="0.6" />
      <circle cx="16" cy="32" r="2.5" fill="#b8868e" opacity="0.7" />
      <circle cx="20.7" cy="20.7" r="2.5" fill="#b8868e" opacity="0.6" />
    </svg>
  );
}
