function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#050806] px-6 py-28 lg:px-8"
    >
      {/* Ambient background */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/[0.045] blur-[140px]" />

      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-amber-300/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber-300/50" />

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-300/70">
              The Artist
            </p>
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About
              <span className="text-white/35"> Nawal Khan</span>
            </h2>

            <p className="max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
              Discover the voice behind heartfelt Islamic recitations,
              naats, hamds and manqabats.
            </p>
          </div>
        </div>

        {/* Main profile */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Artist visual */}
          <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#07100c] to-black" />

            <div className="absolute left-1/2 top-[38%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/[0.08]" />

            <div className="absolute left-1/2 top-[38%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-[-35px] rounded-full bg-amber-300/[0.04] blur-3xl" />

                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.06] shadow-[0_0_100px_rgba(252,211,77,0.08)]">
                  <span className="text-6xl font-semibold tracking-tight text-amber-200">
                    NK
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/75 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[9px] uppercase tracking-[0.3em] text-amber-300/60">
                Nawal Khan
              </p>

              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Voice of Devotion
              </h3>

              <p className="mt-2 text-xs tracking-[0.2em] text-white/30">
                NAAT · HAMD · MANQABAT
              </p>
            </div>
          </div>

          {/* Biography */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 sm:p-10 lg:p-14">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-amber-300/15 bg-amber-300/[0.06] px-3 py-1.5 text-[9px] font-medium tracking-[0.2em] text-amber-200">
                ARTIST PROFILE
              </span>

              <span className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <h3 className="mt-8 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              A distinctive voice in
              <span className="text-amber-200"> Islamic recitation.</span>
            </h3>

            <div className="mt-7 space-y-5 text-sm leading-7 text-white/40 sm:text-base">
              <p>
                Nawal Khan is a Pakistani Naat and Hamd reciter whose work
                spans naats, hamds, manqabats and Islamic kalams.
              </p>

              <p>
                His official YouTube presence brings together releases and
                videos for listeners looking to explore his recitations and
                spiritual work.
              </p>

              <p>
                From new releases to established kalams, this website is
                designed as a dedicated digital home for discovering Nawal
                Khan's work.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-10 border-l border-amber-300/30 pl-5">
              <p className="text-lg font-medium leading-8 text-white/75">
                “A digital space dedicated to the art, voice and spiritual
                expression of Nawal Khan.”
              </p>
            </div>

            {/* Categories */}
            <div className="mt-12 grid grid-cols-3 border-y border-white/[0.08] py-6">
              <div>
                <p className="text-lg font-semibold text-white sm:text-2xl">
                  Naat
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Recitation
                </p>
              </div>

              <div className="border-l border-white/[0.08] pl-5 sm:pl-8">
                <p className="text-lg font-semibold text-white sm:text-2xl">
                  Hamd
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Praise
                </p>
              </div>

              <div className="border-l border-white/[0.08] pl-5 sm:pl-8">
                <p className="text-lg font-semibold text-white sm:text-2xl">
                  Kalam
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Collection
                </p>
              </div>
            </div>

            {/* Channel CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Explore the official artist channel
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Watch releases, naats and latest uploads.
                </p>
              </div>

              <a
                href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-200 hover:shadow-[0_12px_40px_rgba(252,211,77,0.12)]"
              >
                <span>YouTube</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-6 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] px-6 py-6 text-center sm:px-10 sm:py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/20">
            Nawal Khan Official
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/35">
            Music, devotion and moments that connect through the timeless
            tradition of Islamic recitation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;