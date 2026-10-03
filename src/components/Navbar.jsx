import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* Top Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

      <nav className="relative mx-auto w-full max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-3">
          <div className="flex items-center justify-between">

            {/* Brand */}
            <a
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              {/* Logo */}
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-amber-300/30 bg-amber-300/10">
                <div className="absolute inset-0 rounded-full bg-amber-300/10 blur-md transition duration-500 group-hover:bg-amber-300/25" />

                <span className="relative text-sm font-bold tracking-tight text-amber-200">
                  NK
                </span>
              </div>

              {/* Name */}
              <div className="hidden sm:block">
                <p className="text-[13px] font-semibold tracking-[0.2em] text-white">
                  NAWAL KHAN
                </p>

                <p className="mt-0.5 text-[9px] tracking-[0.35em] text-white/35">
                  OFFICIAL
                </p>
              </div>
            </a>

            {/* Center Brand Message */}
            <div className="hidden md:block">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/30">
                Official Website
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-5 py-2.5 text-sm font-medium text-amber-200 transition duration-300 hover:border-amber-300/50 hover:bg-amber-300 hover:text-black hover:shadow-[0_0_30px_rgba(252,211,77,0.12)] sm:flex"
              >
                <span>YouTube</span>
                <span className="text-xs">↗</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition hover:border-amber-300/30 hover:text-amber-200 sm:hidden"
              >
                <div className="flex w-4 flex-col gap-1.5">
                  <span
                    className={`h-px w-full bg-current transition duration-300 ${
                      menuOpen
                        ? "translate-y-[4px] rotate-45"
                        : ""
                    }`}
                  />

                  <span
                    className={`h-px w-full bg-current transition duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  />

                  <span
                    className={`h-px w-full bg-current transition duration-300 ${
                      menuOpen
                        ? "-translate-y-[4px] -rotate-45"
                        : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 sm:hidden ${
              menuOpen
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-medium text-amber-200 transition hover:border-amber-300/40 hover:bg-amber-300 hover:text-black"
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

