import { type ReactNode } from "react";
import { Link } from "react-router";
import { useConvexAuth } from "convex/react";
import {
  ArrowRight,
  Building2,
  Camera,
  ChefHat,
  ExternalLink,
  FileSpreadsheet,
  Flower2,
  Gift,
  Globe,
  GripHorizontal,
  LayoutGrid,
  Lightbulb,
  Mail,
  PrinterCheck,
  Quote,
  Salad,
  Share2,
  Sparkles,
  Users,
  VenetianMask,
} from "lucide-react";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WeddingLogo } from "@/components/wedding-logo";
import { useReveal } from "@/hooks/use-reveal";
import { partners, type PartnerCategory } from "@/planner/partners";

const categoryIcon: Record<PartnerCategory, typeof Building2> = {
  venue: Building2,
  planner: VenetianMask,
  photographer: Camera,
  florist: Flower2,
  catering: ChefHat,
  attire: VenetianMask,
};

const advantageIcons: Record<string, typeof GripHorizontal> = {
  drag: GripHorizontal,
  share: Share2,
  free: Gift,
};

const featureIcons = [
  GripHorizontal,
  Users,
  FileSpreadsheet,
  Salad,
  Share2,
  FileSpreadsheet,
  LayoutGrid,
  PrinterCheck,
  Globe,
];

/* ── Reveal wrapper component ── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── Decorative ornament divider ── */
function Ornament() {
  return (
    <div className="divider-ornament my-16 select-none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
      </svg>
    </div>
  );
}

/* ── Section heading with eyebrow ── */
function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-primary">
        {eyebrow}
      </p>
      <h2 className={`max-w-[30ch] font-serif text-3xl font-light leading-[1.2] tracking-tight sm:text-4xl ${center ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 max-w-[65ch] text-base leading-relaxed text-muted-foreground ${center ? "mx-auto" : ""}`}>
          {lede}
        </p>
      )}
    </div>
  );
}

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
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 md:pt-14">
        {/* ====== Nav ====== */}
        <nav className="mb-12 flex items-center justify-between sm:mb-16">
          <Link to="/" className="flex items-center gap-2.5">
            <WeddingLogo />
            <span className="font-serif text-base font-medium tracking-wide">Wedding Table</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              to={appLink}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {isAuthenticated ? L.goToApp : t.auth.login}
            </Link>
          </div>
        </nav>

        {/* ====== Hero ====== */}
        <header className="relative mb-20 overflow-hidden rounded-3xl shadow-soft-lg sm:mb-28">
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
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/85 via-canvas/40 to-canvas/95" />
          <div className="relative px-6 pb-14 pt-16 sm:px-12 sm:pb-20 sm:pt-24 md:px-16 md:pt-28">
            <p className="mb-5 text-xs font-medium tracking-[0.22em] uppercase text-primary">
              {L.heroEyebrow}
            </p>
            <h1 className="mb-6 max-w-3xl font-serif text-4xl font-light leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
              {L.heroTitle}
            </h1>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              {L.heroTagline}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-soft-lg hover:opacity-95 active:scale-[0.98]"
              >
                {L.tryNow}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to={appLink}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/70 px-8 text-sm font-medium text-foreground backdrop-blur transition hover:border-primary/30 hover:bg-background active:scale-[0.98]"
              >
                {ctaText}
              </Link>
            </div>
            <p className="mt-4 text-xs font-light tracking-wide text-muted-foreground/80">
              ✦ {L.pricingTerms}
            </p>
          </div>
        </header>

        {/* ====== Advantages ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.advantagesLabel}
              title={L.advantagesTitle}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {L.advantages.map((adv, i) => {
                const Icon = advantageIcons[adv.icon] ?? Sparkles;
                return (
                  <Reveal key={adv.title} delay={i * 80}>
                    <div className="hover-lift h-full rounded-2xl bg-background p-8 shadow-soft">
                      <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary-muted text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mb-2.5 font-serif text-xl font-medium leading-tight">{adv.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{adv.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== Gallery ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.galleryLabel}
              title={L.galleryTitle}
              lede={L.galleryLede}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((img, i) => (
                <Reveal key={i} delay={(i % 4) * 60}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-shadow hover:shadow-soft-lg">
                    <picture>
                      <source srcSet={img.webp} type="image/webp" />
                      <img
                        alt={L.galleryAlt}
                        className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                        decoding="async"
                        height="600"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        src={img.src}
                        width="800"
                      />
                    </picture>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== Features ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.featuresLabel}
              title={L.featuresTitle}
              lede={L.featuresLede}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {L.features.map((f, i) => {
                const Icon = featureIcons[i % featureIcons.length];
                const isAccent = i === 0 || i === 4 || i === 8;
                return (
                  <Reveal key={f.name} delay={(i % 3) * 80}>
                    <div
                      className={`hover-lift h-full rounded-2xl p-7 shadow-soft sm:p-8 ${
                        isAccent ? "bg-primary-muted/60" : "bg-background"
                      }`}
                    >
                      {Icon && (
                        <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary-muted text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                      )}
                      <h3 className="mb-2.5 font-serif text-lg font-medium leading-tight">{f.name}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== Steps ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.stepsLabel}
              title={L.stepsTitle}
              lede={L.stepsLede}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {L.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <div className="hover-lift h-full rounded-2xl bg-background p-8 shadow-soft">
                    <span className="mb-5 inline-flex size-12 items-center justify-center rounded-full bg-primary font-serif text-lg font-medium text-primary-foreground">
                      {i + 1}
                    </span>
                    <h3 className="mb-2.5 font-serif text-lg font-medium leading-tight">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-soft-lg hover:opacity-95 active:scale-[0.98]"
              >
                {L.tryNow}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== Guide ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.guideLabel}
              title={L.guideTitle}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {L.guideSections.map((sec, i) => (
                <Reveal key={i} delay={(i % 2) * 80}>
                  <div className="hover-lift h-full rounded-2xl bg-background p-7 shadow-soft sm:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-gold-muted text-gold">
                        <Lightbulb className="size-4" aria-hidden="true" />
                      </span>
                      <h3 className="font-serif text-lg font-medium leading-tight">{sec.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{sec.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== Testimonials ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.testimonialsLabel}
              title={L.testimonialsTitle}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {L.testimonials.map((tm, i) => (
                <Reveal key={i} delay={(i % 2) * 80}>
                  <div className="hover-lift flex h-full flex-col rounded-2xl bg-background p-7 shadow-soft sm:p-8">
                    <Quote className="mb-4 size-6 text-primary/25" aria-hidden="true" />
                    <p className="mb-6 flex-1 font-serif text-base font-light italic leading-relaxed text-foreground">
                      "{tm.quote}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-medium leading-tight">{tm.author}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{tm.location}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ====== Partner Banner ====== */}
        {partners.length > 0 && (
          <Reveal>
            <section className="mb-20 overflow-hidden rounded-2xl bg-gradient-to-r from-gold-muted/60 via-background to-gold-muted/60 px-6 py-7 shadow-soft sm:px-8">
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <p className="shrink-0 text-xs font-medium tracking-[0.2em] uppercase text-gold">
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
                        <span className="flex size-8 items-center justify-center rounded-lg bg-gold-muted text-gold transition-colors group-hover:bg-primary-muted group-hover:text-primary">
                          <Icon className="size-4" />
                        </span>
                        <span className="hidden sm:inline">{info.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          </Reveal>
        )}

        <Ornament />

        {/* ====== Pricing ====== */}
        <Reveal>
          <section className="mb-20">
            <div className="flex flex-col items-center rounded-3xl bg-background px-8 py-20 text-center shadow-soft-lg sm:py-24">
              <p className="mb-3 text-xs font-medium tracking-[0.22em] uppercase text-primary">
                {L.pricingLabel}
              </p>
              <p className="font-serif text-7xl font-light leading-none tracking-tight sm:text-8xl">
                {L.pricingFree}
              </p>
              <p
                className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: L.pricingVs }}
              />
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/demo"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-soft-lg hover:opacity-95 active:scale-[0.98]"
                >
                  {L.tryNow}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to={appLink}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-foreground transition hover:border-primary/30 active:scale-[0.98]"
                >
                  {ctaText}
                </Link>
              </div>
              <p className="mt-5 max-w-lg text-xs leading-relaxed text-muted-foreground">
                {L.pricingTerms}
              </p>
            </div>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== FAQ ====== */}
        <Reveal>
          <section className="mb-20">
            <SectionHeading
              eyebrow={L.faqLabel}
              title={L.faqTitle}
            />
            <dl className="grid gap-8 sm:grid-cols-2">
              {L.faq.map((item, i) => (
                <Reveal key={item.q} delay={(i % 2) * 60}>
                  <div className="rounded-2xl bg-background p-6 shadow-soft sm:p-7">
                    <dt className="mb-2 font-serif text-base font-medium leading-tight">{item.q}</dt>
                    <dd className="max-w-[55ch] text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </section>
        </Reveal>

        <Ornament />

        {/* ====== Partners ====== */}
        {partners.length > 0 && (
          <Reveal>
            <section className="mb-20">
              <div className="mb-10">
                <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-primary">
                  {P.sectionTitle}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner, i) => {
                  const Icon = categoryIcon[partner.category];
                  const info = P.descriptions[partner.id];
                  if (!info) return null;
                  return (
                    <Reveal key={partner.id} delay={(i % 3) * 80}>
                      <div className="hover-lift group relative flex h-full flex-col rounded-2xl bg-background p-7 shadow-soft sm:p-8">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary-muted">
                            <Icon className="size-4" />
                          </span>
                          <h3 className="font-serif text-base font-medium leading-tight">{info.name}</h3>
                        </div>
                        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
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
                    </Reveal>
                  );
                })}
              </div>
            </section>
          </Reveal>
        )}

        {/* ====== Advertise ====== */}
        <Reveal>
          <section className="mb-20 overflow-hidden rounded-3xl bg-gradient-to-b from-primary-muted/40 via-background to-background px-6 py-12 shadow-soft sm:px-10 sm:py-16">
            <div className="mx-auto max-w-2xl">
              <div className="mb-10 text-center">
                <p className="mb-3 font-serif text-xl font-medium leading-tight">
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
                    className="flex flex-col items-center rounded-2xl bg-primary-muted/50 px-4 py-7 text-center"
                  >
                    <p className="font-serif text-3xl font-light leading-none tracking-tight text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-2.5 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 border-t border-border pt-6 text-center">
                <p className="text-sm font-medium text-foreground">{P.advertisePricing}</p>
                <a
                  href={`mailto:${P.advertiseContact}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-95 active:scale-[0.98]"
                >
                  <Mail className="size-4" />
                  {P.advertiseContact}
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ====== Bottom CTA ====== */}
        <Reveal>
          <section className="mb-20 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-muted/50 via-background to-accent px-8 py-16 text-center shadow-soft-lg sm:py-20">
            <h2 className="mb-4 font-serif text-3xl font-light leading-tight tracking-tight sm:text-4xl">
              {L.bottomCtaTitle}
            </h2>
            <p className="mb-10 max-w-lg mx-auto text-base leading-relaxed text-muted-foreground">
              {L.bottomCtaDesc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-soft-lg hover:opacity-95 active:scale-[0.98]"
              >
                {L.tryNow}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to={appLink}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-foreground transition hover:border-primary/30 active:scale-[0.98]"
              >
                {ctaText}
              </Link>
            </div>
          </section>
        </Reveal>

        {/* ====== Footer ====== */}
        <footer className="flex flex-col items-start justify-between gap-8 border-t border-border pt-10 sm:flex-row sm:items-end">
          <div className="flex items-center gap-3">
            <WeddingLogo className="size-10" />
            <div>
              <p className="font-serif text-xl font-medium leading-none">Wedding Table</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{L.footerTagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              to="/demo"
              className="hover:text-primary"
            >
              {L.tryNow}
            </Link>
            <span className="text-border">|</span>
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
