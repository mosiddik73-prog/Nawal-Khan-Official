import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#040705] px-6 py-28 lg:px-8"
    >
      {/* Background glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/[0.05] blur-[120px]" />

      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-amber-300/[0.045] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber-300/50" />

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-300/70">
              Stay Connected
            </p>
          </div>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Connect with
            <span className="text-amber-200"> Nawal Khan.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Follow the official online presence of Nawal Khan and stay
            connected with the latest videos, posts, updates and releases.
          </p>
        </div>

        {/* Main social card */}
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left */}
          <div className="relative p-8 sm:p-10 lg:p-14">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-300/[0.035] blur-[90px]" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-amber-300/15 bg-amber-300/[0.05] px-4 py-2 text-[9px] font-medium uppercase tracking-[0.25em] text-amber-200">
                Official Presence
              </span>

              <h3 className="mt-7 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Stay connected.
                <span className="block text-white/35">
                  Wherever you follow.
                </span>
              </h3>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                Explore Nawal Khan's official YouTube, Instagram and
                Facebook presence from one place.
              </p>

              {/* Social buttons */}
              <div className="mt-9 flex flex-wrap gap-3">

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-red-500/10 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-red-500/20"
                >
                  <FaYoutube className="text-red-400" />
                  <span>YouTube</span>
                  <span className="text-white/30 transition group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/nawal_khan_naat_reciter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-pink-500/10 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-pink-500/20"
                >
                  <FaInstagram className="text-pink-400" />
                  <span>Instagram</span>
                  <span className="text-white/30 transition group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Nawal.khan.00700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-blue-500/10 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-500/20"
                >
                  <FaFacebookF className="text-blue-400" />
                  <span>Facebook</span>
                  <span className="text-white/30 transition group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

              </div>
            </div>
          </div>

          {/* Right */}
          <div className="border-t border-white/[0.08] bg-black/20 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">

            <p className="text-[9px] uppercase tracking-[0.3em] text-white/25">
              Explore
            </p>

            <div className="mt-6 space-y-3">

              {/* Videos */}
              <a
                href="#videos"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition duration-300 hover:border-amber-300/20 hover:bg-amber-300/[0.04]"
              >
                <div>
                  <p className="text-sm font-medium text-white/75 transition group-hover:text-white">
                    Watch Videos
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Official video collection
                  </p>
                </div>

                <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-amber-200">
                  →
                </span>
              </a>

              {/* YouTube */}
              <a
                href="#youtube"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition duration-300 hover:border-amber-300/20 hover:bg-amber-300/[0.04]"
              >
                <div>
                  <p className="text-sm font-medium text-white/75 transition group-hover:text-white">
                    YouTube
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Official channel
                  </p>
                </div>

                <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-amber-200">
                  →
                </span>
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition duration-300 hover:border-amber-300/20 hover:bg-amber-300/[0.04]"
              >
                <div>
                  <p className="text-sm font-medium text-white/75 transition group-hover:text-white">
                    Instagram
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Official Instagram
                  </p>
                </div>

                <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-amber-200">
                  →
                </span>
              </a>

              {/* Facebook */}
              <a
                href="#facebook"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition duration-300 hover:border-amber-300/20 hover:bg-amber-300/[0.04]"
              >
                <div>
                  <p className="text-sm font-medium text-white/75 transition group-hover:text-white">
                    Facebook
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Official Facebook
                  </p>
                </div>

                <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-amber-200">
                  →
                </span>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom platform cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* YouTube */}
          <a
            href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-red-400/20"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Platform
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaYoutube className="text-red-400" />

                <p className="text-lg font-semibold text-white/80">
                  YouTube
                </p>
              </div>

              <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-red-300">
                ↗
              </span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/nawal_khan_naat_reciter/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/20"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Platform
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaInstagram className="text-pink-400" />

                <p className="text-lg font-semibold text-white/80">
                  Instagram
                </p>
              </div>

              <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-pink-300">
                ↗
              </span>
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/Nawal.khan.00700"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Platform
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaFacebookF className="text-blue-400" />

                <p className="text-lg font-semibold text-white/80">
                  Facebook
                </p>
              </div>

              <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-blue-300">
                ↗
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}

export default Contact;