import {
  FaFacebookF,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

function FacebookSection() {
  return (
    <section
      id="facebook"
      className="relative overflow-hidden bg-[#050706] px-5 py-24 sm:px-8 lg:px-12"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center top-1/2">
                     
        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-12">

            {/* Profile Info */}
            <div>
              <div className="mb-6 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 shadow-[0_0_35px_rgba(59,130,246,0.12)]">
                  <FaFacebookF className="text-3xl text-blue-300" />
                </div>

                <div>
                  <p className="text-sm text-white/45">
                    Official Facebook
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                    Nawal Khan
                  </h3>
                </div>
              </div>

              <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Visit the official Facebook profile/page of Nawal Khan
                to stay updated with new posts, videos, announcements,
                and other latest content.
              </p>

              {/* Features */}
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs text-white/40">Platform</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Facebook
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs text-white/40">Profile</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Official
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs text-white/40">Updates</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Latest Content
                  </p>
                </div>
              </div>

              {/* Button */}
              <a
                href="https://www.facebook.com/Nawal.khan.00700"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-blue-300/25 bg-blue-500/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/45 hover:bg-blue-500/20 hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]"
              >
                <FaFacebookF className="text-blue-300" />
                View Facebook Profile
                <FaArrowUpRightFromSquare className="text-xs text-white/50" />
              </a>
            </div>

            {/* Facebook Visual */}
            <div className="mx-auto w-full max-w-xs lg:max-w-[280px]">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-blue-500/10">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.18),transparent_35%)]" />

                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/15 bg-black/20 shadow-2xl backdrop-blur-xl">
                    <FaFacebookF className="text-5xl text-blue-300" />
                  </div>

                  <p className="mt-6 text-lg font-semibold text-white">
                    Nawal Khan
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Official Facebook profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="mt-7 text-center text-xs text-white/30">
          Visit the official Facebook profile to see the latest content.
        </p>
      </div>
    </section>
  );
}

export default FacebookSection;