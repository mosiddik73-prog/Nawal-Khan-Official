import { useEffect, useMemo, useState } from "react";
import { getYouTubeVideos } from "../api/youtube";

function formatDate(dateString) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function ReleaseCard({ video, featured = false }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      className={`group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition duration-500 hover:-translate-y-1 hover:border-amber-300/25 hover:bg-white/[0.045] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-amber-300/20 bg-black/55 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
            Official Release
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-amber-300/50 group-hover:bg-amber-300 group-hover:text-black">
            ▶
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          {formatDate(video.publishedAt)}
        </p>

        <h3
          className={`mt-2 font-medium leading-snug text-white transition group-hover:text-amber-200 ${
            featured
              ? "text-xl sm:text-2xl"
              : "text-base sm:text-lg"
          }`}
        >
          {video.title}
        </h3>

        {featured && video.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/35">
            {video.description}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
            Nawal Khan Official
          </span>

          <span className="text-sm text-amber-200/60 transition group-hover:translate-x-1 group-hover:text-amber-200">
            Watch ↗
          </span>
        </div>
      </div>
    </a>
  );
}

function LatestReleases() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadReleases() {
      try {
        setLoading(true);
        setError("");

        const data = await getYouTubeVideos();

        if (mounted) {
          const uniqueVideos = Array.from(
            new Map(
              data.map((video) => [video.videoId, video])
            ).values()
          );

          setVideos(uniqueVideos);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err.message ||
              "Unable to load latest releases."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadReleases();

    return () => {
      mounted = false;
    };
  }, []);

  const releases = useMemo(() => {
    return videos.filter(
      (video) => video.type === "long"
    );
  }, [videos]);

  const featured = releases[0];
  const otherReleases = releases.slice(1);

  return (
    <section
      id="releases"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050806] py-24 sm:py-32"
    >
      <div className="absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-amber-400/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-200/55">
              Music Collection
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Latest
              <span className="text-amber-200"> Releases</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
              Discover the latest official releases from
              Nawal Khan, automatically synced from the
              official YouTube channel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5">
              <span className="text-xs text-white/40">
                {releases.length}
              </span>
              <span className="ml-2 text-[9px] uppercase tracking-[0.18em] text-white/20">
                Releases
              </span>
            </div>

            <a
              href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-5 py-2.5 text-xs font-medium text-amber-200 transition hover:bg-amber-300 hover:text-black"
            >
              YouTube ↗
            </a>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="aspect-video animate-pulse bg-white/[0.05]" />

                <div className="space-y-3 p-5">
                  <div className="h-2 w-20 animate-pulse rounded-full bg-white/[0.06]" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.06]" />
                  <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-12 rounded-3xl border border-red-400/10 bg-red-400/[0.03] p-8 text-center">
            <p className="text-sm text-red-200/70">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Releases */}
        {!loading && !error && (
          <>
            {releases.length === 0 ? (
              <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
                <p className="text-lg font-medium text-white/70">
                  No releases found
                </p>

                <p className="mt-2 text-sm text-white/30">
                  New official releases will appear here
                  automatically.
                </p>
              </div>
            ) : (
              <>
                {/* Featured Release */}
                {featured && (
                  <div className="mt-12">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="h-px w-7 bg-amber-300/50" />

                      <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/50">
                        Featured Release
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2">
                      <ReleaseCard
                        video={featured}
                        featured
                      />

                      <div className="hidden items-center border-y border-r border-white/[0.08] bg-white/[0.015] p-10 lg:flex">
                        <div className="max-w-sm">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                            Nawal Khan Official
                          </p>

                          <h3 className="mt-4 text-3xl font-semibold leading-tight text-white">
                            Soulful
                            <span className="block text-amber-200">
                              Islamic Releases.
                            </span>
                          </h3>

                          <p className="mt-5 text-sm leading-7 text-white/35">
                            Explore naats, hamds, kalams and
                            other official releases from the
                            channel.
                          </p>

                          <a
                            href="#videos"
                            className="mt-7 inline-flex rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/55 transition hover:border-amber-300/30 hover:text-amber-200"
                          >
                            Explore All Videos →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Complete Releases */}
                {otherReleases.length > 0 && (
                  <div className="mt-16">
                    <div className="mb-7 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                          Complete Collection
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                          All Releases
                        </h3>
                      </div>

                      <p className="text-xs text-white/25">
                        {otherReleases.length} more
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {otherReleases.map((video) => (
                        <ReleaseCard
                          key={video.videoId}
                          video={video}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-7 sm:flex-row sm:px-8">
                  <div>
                    <p className="text-sm font-medium text-white/70">
                      New releases will appear automatically
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      This section stays connected to the
                      official YouTube channel.
                    </p>
                  </div>

                  <a
                    href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-amber-300 px-6 py-3 text-xs font-semibold text-black transition hover:bg-amber-200"
                  >
                    Open Official Channel ↗
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default LatestReleases;