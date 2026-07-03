import { Link } from "react-router";
import { useConvexAuth } from "convex/react";
import {
  Building2,
  Camera,
  ChefHat,
  ExternalLink,
  FileSpreadsheet,
  Flower2,
  Globe,
  GripHorizontal,
  LayoutGrid,
  Mail,
  Salad,
  Share2,
  VenetianMask,
} from "lucide-react";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WeddingLogo } from "@/components/wedding-logo";
import { partners, type PartnerCategory } from "@/planner/partners";

const categoryIcon: Record<PartnerCategory, typeof Building2> = {
  venue: Building2,
  planner: VenetianMask,
  photographer: Camera,
  florist: Flower2,
  catering: ChefHat,
  attire: VenetianMask,
};

const featureIcons = [GripHorizontal, FileSpreadsheet, Salad, Share2, Globe, LayoutGrid];

export function LandingPage() {
  const { t } = useI18n();
  const { isAuthenticated } = useConvexAuth();

  const L = t.landing;
  const P = t.partners;
  const appLink = isAuthenticated ? "/dashboard" : "/login";
  const ctaText = isAuthenticated ? L.goToApp : L.startFree;
  const featuredPartners = partners.filter((p) => p.featured);

  return (
    <div className="min-h-dvh bg-canvas text-foreground antialiased">
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
        {/* ====== Nav ====== */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <WeddingLogo />
            <span className="text-sm font-semibold">Wedding Table</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>

        {/* ====== Hero ====== */}
        <header className="relative mb-28 overflow-hidden rounded-2xl border border-border">
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
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/30 to-canvas/90" />
          <div className="relative px-6 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-20 md:px-12 md:pt-24">
            <p className="mb-6 text-xs font-medium tracking-[0.18em] uppercase text-primary">
              {L.heroEyebrow}
            </p>
            <h1 className="mb-5 max-w-2xl text-4xl font-bold leading-none tracking-tighter sm:text-6xl lg:text-7xl">
              {L.heroTitle}
            </h1>
            <p className="mb-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
              {L.heroTagline}
            </p>
            <Link
              to={appLink}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            >
              {ctaText}
            </Link>
          </div>
        </header>

        {/* ====== Gallery ====== */}
        <section className="mb-28">
          <div className="mb-8">
            <p className="mb-1 text-xs font-medium tracking-[0.18em] uppercase text-primary">
              {L.galleryLabel}
            </p>
            <h2 className="max-w-[20ch] text-2xl font-bold leading-none tracking-tight sm:text-3xl">
              {L.galleryTitle}
            </h2>
            <p className="mt-3 max-w-[65ch] text-sm text-muted-foreground">
              {L.galleryLede}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border bg-background transition hover:shadow-md"
              >
                <picture>
                  <source srcSet={img.webp} type="image/webp" />
                  <img
                    alt={L.galleryAlt}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
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

        {/* ====== Partner Banner ====== */}
        {partners.length > 0 && (
        <section className="mb-28 overflow-hidden rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50/70 via-background to-amber-50/70">
          <div className="flex flex-col items-start justify-between gap-5 px-6 py-7 sm:flex-row sm:items-center sm:px-8">
            <p className="shrink-0 text-xs font-semibold tracking-[0.18em] uppercase text-amber-700">
              {P.bannerTitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {featuredPartners.map((partner) => {
                const Icon = categoryIcon[partner.category];
                const info = P.descriptions[partner.id];
                if (!info) return null;
                return (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg border border-amber-200/60 bg-amber-50 text-amber-700 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="hidden sm:inline">{info.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {/* ====== Features ====== */}
        <section className="mb-28 reveal-section">
          <div className="mb-10">
            <h2 className="max-w-[20ch] text-2xl font-bold leading-none tracking-tight sm:text-3xl">
              {L.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {L.features.map((f, i) => {
              const Icon = featureIcons[i];
              const isAccent = i === 0 || i === 3 || i === 4;
              return (
                <div key={f.name} className={`p-6 sm:p-7 ${isAccent ? "bg-accent/50" : "bg-background"}`}>
                  {Icon && <Icon className="mb-4 size-5 text-primary" aria-hidden="true" />}
                  <h3 className="mb-2 text-base font-semibold leading-tight">{f.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====== Steps ====== */}
        <section className="mb-28">
          <div className="mb-12">
            <h2 className="max-w-[20ch] text-2xl font-bold leading-none tracking-tight sm:text-3xl">
              {L.stepsTitle}
            </h2>
          </div>

          <div className="relative grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {L.steps.map((s, i) => (
              <div key={s.title} className="bg-background p-6 sm:p-7">
                <span className="mb-4 inline-flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-sm font-semibold leading-tight">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====== Partners ====== */}
        {partners.length > 0 && (
        <section className="mb-28">
          <div className="mb-8">
            <p className="mb-1 text-xs font-medium tracking-[0.18em] uppercase text-primary">
              {P.sectionTitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => {
              const Icon = categoryIcon[partner.category];
              const info = P.descriptions[partner.id];
              if (!info) return null;
              return (
                <div
                  key={partner.id}
                  className="group relative flex flex-col rounded-xl border border-border bg-background p-6 transition hover:border-primary/20 hover:shadow-md sm:p-7"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-accent text-primary transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="text-sm font-semibold leading-tight">{info.name}</h3>
                  </div>
                  <p className="mb-5 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {info.desc}
                  </p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/70"
                  >
                    {P.visitWebsite}
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>
        )}

        {/* ====== Advertise ====== */}
        <section className="mb-28 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-b from-primary/[0.03] via-background to-background px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-lg font-semibold leading-tight tracking-tight">
                {P.advertiseTitle}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {P.advertiseDescription}
              </p>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {P.advertiseStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-xl border border-primary/10 bg-primary/[0.04] px-4 py-6 text-center"
                >
                  <p className="text-2xl font-bold leading-none tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 border-t border-border pt-6 text-center">
              <p className="text-sm font-medium text-foreground">{P.advertisePricing}</p>
              <a
                href={`mailto:${P.advertiseContact}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
              >
                <Mail className="size-4" />
                {P.advertiseContact}
              </a>
            </div>
          </div>
        </section>

        {/* ====== Pricing ====== */}
        <section className="mb-28 reveal-section">
          <div className="flex flex-col items-center rounded-2xl border border-border px-8 py-20 text-center sm:py-24">
            <p className="text-7xl font-bold leading-none tracking-tighter sm:text-8xl">
              {L.pricingFree}
            </p>
            <p
              className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: L.pricingVs }}
            />
            <Link
              to={appLink}
              className="mt-10 inline-flex h-12 w-64 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
            >
              {ctaText}
            </Link>
            <p className="mt-4 max-w-lg text-xs leading-relaxed text-muted-foreground">
              {L.pricingTerms}
            </p>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section className="mb-28">
          <div className="mb-10">
            <h2 className="max-w-[20ch] text-2xl font-bold leading-none tracking-tight sm:text-3xl">
              {L.faqTitle}
            </h2>
          </div>

          <dl className="grid gap-8 sm:grid-cols-2">
            {L.faq.map((item) => (
              <div key={item.q}>
                <dt className="mb-1.5 text-sm font-semibold leading-tight">{item.q}</dt>
                <dd className="max-w-[55ch] text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ====== Bottom CTA ====== */}
        {partners.length > 0 && (
        <section className="mb-28 overflow-hidden rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50/70 via-background to-amber-50/70 px-8 py-10 text-center sm:py-12">
          <p className="mb-5 text-lg font-semibold leading-tight tracking-tight sm:text-xl">
            {P.bottomCta}
          </p>
          <a
            href="#partners"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-primary/30 bg-background px-6 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
          >
            {P.bottomCtaLink}
            <ExternalLink className="size-3.5" />
          </a>
        </section>
        )}

        {/* ====== Footer ====== */}
        <footer className="flex flex-col items-start justify-between gap-8 border-t border-border pt-10 sm:flex-row sm:items-end">
          <div className="flex items-center gap-3">
            <WeddingLogo className="size-10" />
            <div>
              <p className="text-xl font-bold leading-none">Wedding Table</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{L.footerTagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="hover:text-primary"
            >
              {isAuthenticated ? L.goToApp : t.auth.login}
            </Link>
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
