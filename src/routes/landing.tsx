import { Link } from "react-router";
import { useConvexAuth } from "convex/react";
import {
  FileSpreadsheet,
  Globe,
  GripHorizontal,
  LayoutGrid,
  Salad,
  Share2,
} from "lucide-react";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WeddingLogo } from "@/components/wedding-logo";

export function LandingPage() {
  const { t } = useI18n();
  const { isAuthenticated } = useConvexAuth();

  const L = t.landing;
  const appLink = isAuthenticated ? "/dashboard" : "/login";
  const ctaText = isAuthenticated ? L.goToApp : L.startFree;

  const featureIcons = [GripHorizontal, FileSpreadsheet, Salad, Share2, Globe, LayoutGrid];

  return (
    <div className="min-h-dvh bg-canvas text-foreground antialiased">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-8 md:pt-24">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <WeddingLogo />
            <span className="text-sm font-semibold">Wedding Table</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>

        {/* ============ Hero ============ */}
        <header className="relative overflow-hidden rounded-xl border border-border mb-16 sm:mb-20">
            <picture>
              <source srcSet="/gallery/hero-1.webp" type="image/webp" />
              <img
                alt=""
                className="absolute inset-0 size-full object-cover"
                decoding="async"
                fetchPriority="high"
                height="800"
                src="/gallery/hero-1.png"
                width="1200"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/40 to-canvas/90" />
          <div className="relative px-8 pb-12 pt-16 sm:pb-14 sm:pt-24 md:pt-32">
            <p className="mb-6 text-xs font-medium tracking-widest uppercase text-primary">
              {L.heroEyebrow}
            </p>
            <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {L.heroTitle}
            </h1>
            <p className="mb-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
              {L.heroTagline}
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={appLink}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </header>

        {/* ============ Gallery ============ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-primary">{L.galleryLabel}</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{L.galleryTitle}</h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">{L.galleryLede}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-border bg-background transition hover:shadow-lg"
              >
                <picture>
                  <source srcSet={img.webp} type="image/webp" />
                  <img
                    alt={L.galleryAlt}
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                    decoding="async"
                    height="600"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    src={img.src}
                    width="800"
                  />
                </picture>
              </div>
            ))}
          </div>
        </section>

        {/* ============ Features ============ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-primary">{L.featuresLabel}</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{L.featuresTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {L.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={f.name} className="bg-background p-6">
                  {Icon && <Icon className="mb-3 size-5 text-primary" aria-hidden="true" />}
                  <h3 className="mb-2 text-base font-semibold">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ Steps ============ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-primary">{L.stepsLabel}</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{L.stepsTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {L.steps.map((s, i) => (
              <div key={s.title} className="bg-background p-6">
                <span className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mb-1 text-sm font-semibold">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ Pricing ============ */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <p className="mb-1 text-sm font-medium text-primary">{L.pricingLabel}</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{L.pricingTitle}</h2>
          </div>

          <div className="flex flex-col items-center border-y border-border py-16 text-center">
            <p className="text-7xl font-bold tracking-tight sm:text-8xl">{L.pricingFree}</p>
            <p
              className="mt-4 max-w-lg text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: L.pricingVs }}
            />
            <Link
              to={appLink}
              className="mt-10 inline-flex h-12 w-64 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {ctaText}
            </Link>
            <p className="mt-4 max-w-lg text-xs text-muted-foreground">{L.pricingTerms}</p>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-primary">{L.faqLabel}</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{L.faqTitle}</h2>
          </div>

          <dl className="grid gap-6 sm:grid-cols-2">
            {L.faq.map((item) => (
              <div key={item.q}>
                <dt className="mb-1 text-sm font-semibold">{item.q}</dt>
                <dd className="text-sm text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ============ Footer ============ */}
        <footer className="flex flex-col items-start justify-between gap-8 border-t border-border pt-10 sm:flex-row sm:items-end">
          <div className="flex items-center gap-3">
            <WeddingLogo className="size-10" />
            <div>
              <p className="text-xl font-bold">Wedding Table</p>
              <p className="text-xs text-muted-foreground">{L.footerTagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-primary">{isAuthenticated ? L.goToApp : t.auth.login}</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

const galleryImages = [
  { src: "/gallery/round-1.jpg", webp: "/gallery/round-1.webp" },
  { src: "/gallery/round-2.jpg", webp: "/gallery/round-2.webp" },
  { src: "/gallery/round-3.jpg", webp: "/gallery/round-3.webp" },
  { src: "/gallery/round-4.jpg", webp: "/gallery/round-4.webp" },
  { src: "/gallery/round-5.jpg", webp: "/gallery/round-5.webp" },
  { src: "/gallery/round-6.jpg", webp: "/gallery/round-6.webp" },
  { src: "/gallery/round-7.jpg", webp: "/gallery/round-7.webp" },
  { src: "/gallery/round-8.jpg", webp: "/gallery/round-8.webp" },
];
