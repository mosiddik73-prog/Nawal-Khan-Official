import {
  FaYoutube,
  FaPlay,
} from "react-icons/fa";

function YouTubeSection() {
  return (
    <section
      id="youtube"
      className="relative overflow-hidden bg-[#050706] px-5 py-24 sm:px-8 lg:px-12"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center top-1/2">

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Follow Nawal Khan
          </h2>

        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-12">

            {/* Channel Info */}
            <div>
              <div className="mb-6 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 shadow-[0_0_35px_rgba(239,68,68,0.12)]">
                  <FaYoutube className="text-3xl text-red-400" />
                </div>

                <div>
                  <p className="text-sm text-white/45">
                    Official YouTube Channel
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                    Nawal Khan Official
                  </h3>
                </div>
              </div>

              <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Explore the official YouTube channel of Nawal Khan
                and discover the latest videos, Shorts, Naat,
                and other published content.
              </p>

              {/* Features */}
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs text-white/40">Platform</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    YouTube
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs text-white/40">Channel</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Official
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs text-white/40">Content</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Videos & Shorts
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#videos"
                  className="inline-flex items-center gap-3 rounded-full border border-red-300/25 bg-red-500/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-red-300/45 hover:bg-red-500/20 hover:shadow-[0_15px_40px_rgba(239,68,68,0.12)]"
                >
                  <FaPlay className="text-red-400" />
                  Watch Videos
                </a>

                <a
                  href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <FaYoutube className="text-red-400" />
                  Open YouTube
                  <span className="text-xs text-white/50">↗</span>
                </a>
              </div>
            </div>

            {/* YouTube Visual */}
            <div className="mx-auto w-full max-w-xs lg:max-w-[280px]">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-red-500/10">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(220,38,38,0.18),transparent_35%)]" />

                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/15 bg-black/20 shadow-2xl backdrop-blur-xl">
                    <FaYoutube className="text-5xl text-red-400" />
                  </div>

                  <p className="mt-6 text-lg font-semibold text-white">
                    Nawal Khan Official
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Official YouTube channel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="mt-7 text-center text-xs text-white/30">
          Watch the latest content directly on the website or visit
          the official YouTube channel.
        </p>
      </div>
    </section>
  );
}

export default YouTubeSection;