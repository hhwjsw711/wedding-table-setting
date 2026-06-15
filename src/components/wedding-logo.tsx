export function WeddingLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#f8fafc" />
      <circle cx="24" cy="28" r="10" fill="#f472b6" />
      <circle cx="40" cy="28" r="10" fill="#f472b6" />
      <path d="M32 50 L14 32 A10 10 0 0 1 24 18 A11 11 0 0 1 32 23 A11 11 0 0 1 40 18 A10 10 0 0 1 50 32 Z" fill="#ec4899" />
      <circle cx="32" cy="32" r="8" fill="#ffffff" />
      <circle cx="32" cy="32" r="5" fill="#94a3b8" />
    </svg>
  );
}
