export function WeddingLogo({ className = "size-8" }: { className?: string }) {
  return (
    <img
      className={className}
      src="/logo-128.png"
      alt="Wedding Table"
      width={32}
      height={32}
      decoding="async"
    />
  );
}
