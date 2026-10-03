const galleryItems = [
  {
    number: "01",
    label: "NAAT",
    title: "Voice of Devotion",
    description: "Heartfelt Islamic recitations.",
    size: "large",
  },
  {
    number: "02",
    label: "MILAD",
    title: "Jashn-E-Nabi",
    description: "Milad Special 2026.",
    size: "small",
  },
  {
    number: "03",
    label: "HAMD",
    title: "Words of Praise",
    description: "Spiritual expressions through voice.",
    size: "small",
  },
  {
    number: "04",
    label: "KALAM",
    title: "Moments of Kalam",
    description: "A collection of devotional expression.",
    size: "wide",
  },
];

function GalleryCard({ item }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.025] ${
        item.size === "large"
          ? "min-h-[440px] md:row-span-2"
          : item.size === "wide"
            ? "min-h-[280px] md:col-span-2"
            : "min-h-[280px]"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#08100c] to-black transition duration-700 group-hover:scale-105" />

      {/* Decorative glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-300/[0.07] blur-[90px] transition duration-700 group-hover:bg-amber-300/[0.12]" />

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-[90px]" />

      {/* Geometric circles */}
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045] transition duration-700 group-hover:scale-110 group-hover:border-amber-300/[0.10]" />

      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/[0.06] transition duration-700 group-hover:scale-110" />

      {/* Center mark */}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/15 bg-amber-300/[0.045] shadow-[0_0_80px_rgba(252,211,77,0.06)] transition duration-500 group-hover:border-amber-300/30 group-hover:bg-amber-300/[0.08]">
        <span className="text-xl font-semibold tracking-tight text-amber-200/80">
          NK
        </span>
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

      {/* Number */}
      <div className="absolute right-6 top-6 text-4xl font-semibold tracking-tight text-white/[0.06] transition duration-500 group-hover:text-amber-300/[0.10]">
        {item.number}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-amber-300/50" />

          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-amber-200/70">
            {item.label}
          </p>
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {item.title}
        </h3>

        <p className="mt-2 max-w-md text-xs leading-6 text-white/35 sm:text-sm">
          {item.description}
        </p>
      </div>

      {/* Hover line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-amber-300/60 transition-all duration-700 group-hover:w-full" />
    </div>
  );
}

function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#040705] px-6 py-28 lg:px-8"
    >
      {/* Background */}
      <div className="absolute left-1/2 top-20 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber-300/50" />

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-300/70">
              Visual Stories
            </p>
          </div>

          <div className="mt-5 grid gap-7 md:grid-cols-[1fr_0.8fr] md:items-end">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Gallery
              <span className="text-white/35"> & Moments</span>
            </h2>

            <p className="max-w-xl text-sm leading-7 text-white/40 sm:text-base">
              A visual space for performances, releases, Milad moments and
              the artistic world surrounding Nawal Khan.
            </p>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {galleryItems.map((item) => (
            <GalleryCard key={item.number} item={item} />
          ))}
        </div>

        {/* Future photo strip */}
        <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/[0.10] bg-white/[0.015] px-6 py-10 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/15 bg-amber-300/[0.04]">
            <span className="text-xl text-amber-200/70">+</span>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white/75">
            Official Photo Collection
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-white/30 sm:text-sm">
            Verified official photographs can be added here as the artist's
            media collection becomes available.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Gallery;