function Footer() {
  const videoLinks = [
    {
      label: "Videos",
      href: "https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw/videos",
    },
    {
      label: "Shorts",
      href: "https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw/shorts",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#030504]">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-0 h-72 w-[500px] -translate-x-1/2 rounded-full bg-amber-300/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-14 py-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:py-20">

          {/* Brand */}
          <div>
            <a
              href="/"
              className="group inline-flex items-center gap-4"
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.06]">
                <div className="absolute inset-0 rounded-full bg-amber-300/[0.05] blur-md transition group-hover:bg-amber-300/[0.10]" />

                <span className="relative text-lg font-semibold tracking-tight text-amber-200">
                  NK
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-white">
                  NAWAL KHAN
                </p>

                <p className="mt-1 text-[9px] tracking-[0.35em] text-white/25">
                  OFFICIAL
                </p>
              </div>
            </a>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/35">
              The official digital home for Nawal Khan — bringing together
              naats, hamds, manqabats, videos and moments of devotion.
            </p>

            {/* Official YouTube */}
            <a
              href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-3 rounded-full border border-amber-300/15 bg-amber-300/[0.05] px-5 py-3 text-sm font-medium text-amber-200 transition duration-300 hover:border-amber-300/30 hover:bg-amber-300 hover:text-black"
            >
              <span>Official YouTube</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>

          {/* Videos */}
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-amber-300/60">
              Videos
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {videoLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-fit items-center gap-2 text-sm text-white/35 transition duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-amber-300 transition-all duration-300 group-hover:w-4" />

                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-amber-300/60">
              Connect
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/35 transition hover:text-white"
              >
                YouTube
              </a>

              <a
                href="https://www.instagram.com/nawal_khan_naat_reciter/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/35 transition hover:text-white"
              >
                Official Instagram
              </a>

              <a
                href="https://www.facebook.com/Nawal.khan.00700"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/35 transition hover:text-white"
              >
                Official Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08]" />

{/* Bottom */}
<div className="flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:justify-between">

  {/* Copyright + Developer */}
  <div className="flex flex-col gap-3">
    <p className="text-[10px] tracking-[0.12em] text-white/20">
      © {new Date().getFullYear()} Nawal Khan Official. All rights
      reserved.
    </p>

    <p className="text-[10px] tracking-[0.12em] text-white/20">
      Designed &amp; Developed by{" "}
      <span className="font-medium text-amber-200/80">
        Mo. Siddik
      </span>
    </p>

    {/* Developer Contact */}
    <a
      href="https://t.me/SiddikCodeLab"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit items-center gap-2 text-[10px] tracking-[0.08em] text-white/25 transition duration-300 hover:text-white/60"
    >
      <span>
        Need a website? Contact me on Telegram
      </span>

      <span className="text-amber-200/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-200">
        ↗
      </span>

      <span className="text-amber-200/80">
        @SiddikCodeLab
      </span>
    </a>
  </div>

  {/* Footer Actions */}
  <div className="flex items-center gap-5">
    <a
      href="#top"
      className="text-[10px] uppercase tracking-[0.2em] text-white/20 transition hover:text-amber-200"
    >
      Back to top ↑
    </a>

    <span className="h-3 w-px bg-white/10" />

    <span className="text-[10px] uppercase tracking-[0.2em] text-white/15">
      Made with devotion
    </span>
  </div>
</div>

      </div>
    </footer>
  );
}

export default Footer;

