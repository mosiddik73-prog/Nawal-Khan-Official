import { useEffect, useState } from "react";

const heroPhotos = [
  "https://www.bing.com/th/id/OIP.Ih_piUCA5u96ZRN0wYG6sQHaEI?w=215&h=128&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=ImgAns&rm=2",

  "https://th.bing.com/th/id/OIP.6klPZU_lHpArodZa-0m0kQAAAA?w=132&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.t7Fem8dcgO24DdoeQn10SwHaHa?w=186&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.AsvBgKAzL9735sj50qoHSAHaFj?w=249&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.xVOly4_OSrKn8xqgBFV6VgHaEH?w=324&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.s7mMSZ3p0eev5zl7nEC7vgHaDQ?w=321&h=153&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.7TEPzCMQ4yVq27VSa9vtswHaEK?w=269&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.2dTTUuh2WHCLWscMmZ16FgHaEK?w=270&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.5VTZfVLgFmQ7ietQ1IAXBQHaEK?w=321&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",

  "https://th.bing.com/th/id/OIP.EYfSDbC_FexPIb2sSg683wHaEK?w=308&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
];

function Hero() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((previous) => {
        return (previous + 1) % heroPhotos.length;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Photos */}
      {heroPhotos.map((photo, index) => (
        <img
          key={photo}
          src={photo}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1600ms] ${
            index === currentPhoto
              ? "opacity-100"
              : "opacity-0"
          }`}
        />
      ))}

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/85" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/55" />

      {/* Subtle green/gold atmosphere */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050806] to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pt-28 text-center sm:px-8 lg:px-10">
        
        {/* Small label */}
        <div className="mb-7 flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-5 py-2.5 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-amber-300" />
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs">
            Official Artist
          </span>
        </div>

        {/* Main Name */}
        <h1 className="max-w-5xl text-[4.5rem] font-semibold leading-[0.88] tracking-[-0.055em] text-white drop-shadow-2xl sm:text-8xl md:text-9xl lg:text-[10rem]">
          Nawal
          <span className="block bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500 bg-clip-text pb-3 text-transparent">
            Khan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-7 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
          Official website of Nawal Khan — Naat, Hamd, Manqabat & Kalam
        </p>

        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
          Naat · Hamd · Manqabat · Kalam
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#releases"
            className="rounded-full bg-amber-300 px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-amber-200 hover:shadow-[0_15px_50px_rgba(252,211,77,0.2)]"
          >
            Explore Music
          </a>

          <a
            href="#videos"
            className="rounded-full border border-white/20 bg-black/25 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
          >
            Watch Videos
          </a>
        </div>
      </div>

      {/* Photo indicators */}
      <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        {heroPhotos.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show photo ${index + 1}`}
            onClick={() => setCurrentPhoto(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentPhoto
                ? "w-7 bg-amber-300"
                : "w-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#releases"
        className="absolute bottom-8 right-6 z-20 hidden flex-col items-center gap-2 text-white/40 transition hover:text-amber-200 sm:flex"
      >
        <span className="text-[8px] uppercase tracking-[0.3em]">
          Scroll
        </span>

        <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </a>
    </section>
  );
}

export default Hero;