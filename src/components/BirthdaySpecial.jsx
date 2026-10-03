function BirthdaySpecial() {
  return (
    <section
      id="birthday"
      className="relative overflow-hidden bg-[#050806] px-6 py-28 lg:px-8"
    >
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/[0.045] blur-[140px]" />

      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-300/10 bg-gradient-to-br from-amber-300/[0.055] via-white/[0.02] to-emerald-950/20 px-7 py-14 sm:px-12 lg:px-20 lg:py-20">
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-amber-300/[0.07]" />

          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-amber-300/[0.05]" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/[0.035]" />

          {/* Stars / dots */}
          <span className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-amber-300/60" />
          <span className="absolute left-[22%] top-[72%] h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="absolute right-[18%] top-[34%] h-1 w-1 rounded-full bg-amber-200/50" />
          <span className="absolute right-[28%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-white/15" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-amber-300/60" />

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-200/75">
                  A Special Moment
                </p>
              </div>

              <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Celebrating
                <span className="block text-amber-200">
                  Nawal Khan
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                A dedicated space to celebrate the artist, his voice and the
                moments that connect his recitations with listeners around the
                world.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#videos"
                  className="inline-flex items-center gap-3 rounded-full bg-amber-300 px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-200 hover:shadow-[0_15px_45px_rgba(252,211,77,0.12)]"
                >
                  <span>Watch His Work</span>
                  <span>→</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm text-white/65 transition duration-300 hover:border-white/20 hover:text-white"
                >
                  <span>Connect</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Celebration visual */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-10 rounded-full bg-amber-300/[0.08] blur-[80px]" />

              <div className="relative aspect-square rounded-full border border-amber-300/[0.12] bg-black/20 p-5">
                <div className="flex h-full w-full items-center justify-center rounded-full border border-white/[0.06] bg-gradient-to-br from-amber-300/[0.08] via-transparent to-emerald-400/[0.05]">
                  <div className="text-center">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.07] shadow-[0_0_80px_rgba(252,211,77,0.08)]">
                      <span className="text-4xl font-semibold text-amber-200">
                        NK
                      </span>
                    </div>

                    <p className="mt-7 text-[9px] uppercase tracking-[0.35em] text-white/25">
                      Celebrating
                    </p>

                    <p className="mt-2 text-xl font-semibold tracking-tight text-white/80">
                      Nawal Khan
                    </p>

                    <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-amber-300/50">
                      Artist · Reciter · Voice
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating labels */}
              <div className="absolute -left-2 top-1/4 rounded-xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl sm:-left-8">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                  Voice
                </p>
                <p className="mt-1 text-xs font-medium text-white/65">
                  Devotion
                </p>
              </div>

              <div className="absolute -right-2 bottom-1/4 rounded-xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl sm:-right-8">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                  Music
                </p>
                <p className="mt-1 text-xs font-medium text-white/65">
                  Spirituality
                </p>
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="relative mt-14 border-t border-white/[0.08] pt-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Nawal Khan Official
              </p>

              <p className="text-xs text-white/25">
                A special digital tribute to the artist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BirthdaySpecial;