import { useEffect, useMemo, useState } from "react";
import {
  getYouTubeVideos,
  getYouTubePlaylists,
  getYouTubePosts,
} from "../api/youtube";

import {
  FaYoutube,
  FaPlay,
  FaVideo,
  FaNewspaper,
  FaList,
  FaExternalLinkAlt,
  FaHeart,
  FaPoll,
  FaImage,
} from "react-icons/fa";

// ======================================================
// Helpers
// ======================================================

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDuration(duration) {
  if (!duration) return "";

  const match = duration.match(
    /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
  );

  if (!match) return "";

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function getImageUrl(image) {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  return (
    image.url ||
    image.src ||
    image.thumbnail ||
    image.imageUrl ||
    ""
  );
}

function getLinkedVideoUrl(video) {
  if (!video) return "";

  if (typeof video === "string") {
    return video;
  }

  return (
    video.url ||
    video.videoUrl ||
    video.link ||
    ""
  );
}

// ======================================================
// Playlist Card
// ======================================================

function PlaylistCard({ playlist }) {
  return (
    <a
      href={playlist.url}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[0.05] hover:shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {playlist.thumbnail ? (
          <img
            src={playlist.thumbnail}
            alt={playlist.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-950 to-black">
            <FaList className="text-4xl text-emerald-300/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <span className="absolute left-3 top-3 rounded-full border border-emerald-300/20 bg-black/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-200 backdrop-blur-md">
          Playlist
        </span>

        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-black/80 px-2.5 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
          <FaList className="text-emerald-300" />

          <span>
            {playlist.videoCount || 0}{" "}
            {Number(playlist.videoCount) === 1
              ? "video"
              : "videos"}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-300 text-black shadow-2xl">
            <FaExternalLinkAlt className="text-sm" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          {formatDate(playlist.publishedAt)}
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-6 text-white/90 transition group-hover:text-emerald-200">
          {playlist.title}
        </h3>

        {playlist.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/35">
            {playlist.description}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <span className="max-w-[70%] truncate text-[10px] uppercase tracking-[0.15em] text-white/25">
            {playlist.channelTitle || "Nawal Khan"}
          </span>

          <span className="flex shrink-0 items-center gap-2 text-xs text-emerald-200/70 transition group-hover:translate-x-1 group-hover:text-emerald-200">
            Open
            <FaExternalLinkAlt className="text-[9px]" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ======================================================
// Post Card
// ======================================================

function PostCard({ post }) {
  const postImages = Array.isArray(post.images)
    ? post.images.map(getImageUrl).filter(Boolean)
    : [];

  const linkedVideos = Array.isArray(post.linkedVideos)
    ? post.linkedVideos
    : [];

  const pollOptions = Array.isArray(post.pollOptions)
    ? post.pollOptions
    : [];

  const postText = post.text || "";
  const postUrl = post.url || "";
  const hasPoll = pollOptions.length > 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04] hover:shadow-2xl">

      {/* ==================================================
          POST HEADER
          Sirf post type + date
          Channel logo/avatar intentionally removed
      ================================================== */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6">

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-500/[0.07] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-blue-300/80">
            {hasPoll ? (
              <FaPoll />
            ) : postImages.length > 0 ? (
              <FaImage />
            ) : (
              <FaNewspaper />
            )}

            {hasPoll
              ? "Poll"
              : postImages.length > 0
              ? "Photo Post"
              : "Community Post"}
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.12em] text-white/30">
          {formatDate(post.publishedTime)}
        </span>
      </div>

      {/* ==================================================
          POST BODY
      ================================================== */}
      <div className="p-5 sm:p-6">

        {/* ==================================================
            ACTUAL POST TEXT
        ================================================== */}
        {postText && (
          <p className="whitespace-pre-line text-sm leading-7 text-white/75">
            {postText}
          </p>
        )}

        {/* ==================================================
            ACTUAL POST IMAGES
            Channel logo/avatar is NOT used here
        ================================================== */}
        {postImages.length > 0 && (
          <div
            className={`${
              postText ? "mt-5" : ""
            } grid gap-2 overflow-hidden rounded-2xl ${
              postImages.length === 1
                ? "grid-cols-1"
                : "grid-cols-2"
            }`}
          >
            {postImages.slice(0, 4).map((image, index) => (
              <a
                key={`${image}-${index}`}
                href={image}
                target="_blank"
                rel="noreferrer"
                className={`group/image relative overflow-hidden bg-black ${
                  postImages.length === 1
                    ? "aspect-video"
                    : "aspect-square"
                }`}
              >
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover/image:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover/image:bg-black/10" />
              </a>
            ))}
          </div>
        )}

        {/* ==================================================
            LINKED VIDEOS
            Sirf tab jab post ke andar actual linked video ho
        ================================================== */}
        {linkedVideos.length > 0 && (
          <div className="mt-5 space-y-2">
            {linkedVideos.slice(0, 3).map((video, index) => {
              const videoUrl = getLinkedVideoUrl(video);

              if (!videoUrl) {
                return null;
              }

              const videoTitle =
                typeof video === "string"
                  ? "Watch linked video"
                  : video.title ||
                    video.videoTitle ||
                    "Watch linked video";

              const videoThumbnail =
                typeof video === "object"
                  ? getImageUrl(
                      video.thumbnail ||
                        video.image
                    )
                  : "";

              return (
                <a
                  key={`${videoUrl}-${index}`}
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-3 transition hover:border-red-400/20 hover:bg-red-500/[0.05]"
                >
                  <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-xl bg-black">
                    {videoThumbnail ? (
                      <img
                        src={videoThumbnail}
                        alt={videoTitle}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-red-400">
                        <FaYoutube />
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                        <FaPlay className="ml-0.5 text-[8px]" />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-medium leading-5 text-white/70">
                      {videoTitle}
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-wider text-red-300/50">
                      Watch on YouTube
                    </p>
                  </div>

                  <FaExternalLinkAlt className="mr-1 shrink-0 text-[9px] text-white/25" />
                </a>
              );
            })}
          </div>
        )}

        {/* ==================================================
            POLL
        ================================================== */}
        {hasPoll && (
          <div className="mt-5 rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-4">

            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-blue-200/80">
              <FaPoll />
              <span>Poll</span>
            </div>

            <div className="space-y-2">
              {pollOptions.map((option, index) => {
                const optionText =
                  typeof option === "string"
                    ? option
                    : option.text ||
                      option.label ||
                      option.title ||
                      `Option ${index + 1}`;

                const votes =
                  typeof option === "object"
                    ? option.voteCount ||
                      option.votes ||
                      null
                    : null;

                return (
                  <div
                    key={`${optionText}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                  >
                    <span className="text-xs text-white/65">
                      {optionText}
                    </span>

                    {votes !== null && (
                      <span className="text-[10px] text-white/30">
                        {votes}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {post.totalVotes > 0 && (
              <p className="mt-3 text-[9px] uppercase tracking-wider text-white/25">
                {post.totalVotes} votes
              </p>
            )}
          </div>
        )}

        {/* ==================================================
            POST FOOTER
        ================================================== */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">

          <div className="flex items-center gap-2 text-xs text-white/30">
            <FaHeart className="text-red-400/60" />

            <span>
              {post.likeCountText ||
                (post.likeCount > 0
                  ? post.likeCount
                  : "Like")}
            </span>
          </div>

          {postUrl && (
            <a
              href={postUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-blue-300/80 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-200"
            >
              View on YouTube
              <FaExternalLinkAlt className="text-[8px]" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ======================================================
// Main Videos Component
// ======================================================

function Videos() {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [posts, setPosts] = useState([]);

  const [activeTab, setActiveTab] =
    useState("all");

  const [loading, setLoading] = useState(true);
  const [playlistsLoading, setPlaylistsLoading] =
    useState(false);
  const [postsLoading, setPostsLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [playlistsError, setPlaylistsError] =
    useState("");
  const [postsError, setPostsError] =
    useState("");

  // ====================================================
  // Videos
  // ====================================================

  async function loadVideos() {
    try {
      setError("");

      const data = await getYouTubeVideos();

      setVideos(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);

      setError(
        "Videos load nahi ho paaye. Backend check karo."
      );
    } finally {
      setLoading(false);
    }
  }

  // ====================================================
  // Playlists
  // ====================================================

  async function loadPlaylists() {
    try {
      setPlaylistsError("");
      setPlaylistsLoading(true);

      const data =
        await getYouTubePlaylists();

      setPlaylists(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);

      setPlaylistsError(
        "Playlists load nahi ho paayi. Backend check karo."
      );
    } finally {
      setPlaylistsLoading(false);
    }
  }

  // ====================================================
  // Posts
  // ====================================================

  async function loadPosts() {
    try {
      setPostsError("");
      setPostsLoading(true);

      const data = await getYouTubePosts();

      setPosts(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);

      setPostsError(
        "Posts load nahi ho paaye. Backend ya Captapi check karo."
      );
    } finally {
      setPostsLoading(false);
    }
  }

  // ====================================================
  // Initial Load + Auto Refresh
  // ====================================================

  useEffect(() => {
    loadVideos();
    loadPlaylists();
    loadPosts();

    // Har 5 minute mein latest content check hoga.
    const refreshTimer = setInterval(() => {
      loadVideos();
      loadPlaylists();
      loadPosts();
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshTimer);
  }, []);

  // ====================================================
  // Video Filters
  // ====================================================

  const longVideos = useMemo(() => {
    return videos.filter(
      (video) => video.type === "long"
    );
  }, [videos]);

  const shorts = useMemo(() => {
    return videos.filter(
      (video) => video.type === "short"
    );
  }, [videos]);

  const visibleVideos = useMemo(() => {
    if (activeTab === "long") {
      return longVideos;
    }

    if (activeTab === "shorts") {
      return shorts;
    }

    return videos;
  }, [
    activeTab,
    videos,
    longVideos,
    shorts,
  ]);

  const isVideoTab =
    activeTab === "all" ||
    activeTab === "long" ||
    activeTab === "shorts";

  // ====================================================
  // Tabs
  // ====================================================

  const tabs = [
    {
      id: "all",
      label: "All",
      description: "Videos + Shorts",
      count: videos.length,
      icon: FaVideo,
      activeColor:
        "border-amber-300/40 bg-amber-300/[0.08] shadow-[0_0_35px_rgba(252,211,77,0.06)]",
      iconColor:
        "bg-amber-300 text-black",
      textColor:
        "text-amber-200",
      lineColor:
        "from-amber-300",
    },
    {
      id: "long",
      label: "Videos",
      description: "Full-length videos",
      count: longVideos.length,
      icon: FaPlay,
      activeColor:
        "border-red-400/40 bg-red-500/[0.07] shadow-[0_0_35px_rgba(239,68,68,0.06)]",
      iconColor:
        "bg-red-500 text-white",
      textColor:
        "text-red-300",
      lineColor:
        "from-red-400",
    },
    {
      id: "shorts",
      label: "Shorts",
      description: "Quick vertical videos",
      count: shorts.length,
      icon: FaYoutube,
      activeColor:
        "border-violet-400/40 bg-violet-500/[0.07] shadow-[0_0_35px_rgba(139,92,246,0.07)]",
      iconColor:
        "bg-violet-500 text-white",
      textColor:
        "text-violet-300",
      lineColor:
        "from-violet-400",
    },
    {
      id: "posts",
      label: "Posts",
      description: "Community updates",
      count: posts.length,
      icon: FaNewspaper,
      activeColor:
        "border-blue-400/40 bg-blue-500/[0.07] shadow-[0_0_35px_rgba(59,130,246,0.06)]",
      iconColor:
        "bg-blue-500 text-white",
      textColor:
        "text-blue-300",
      lineColor:
        "from-blue-400",
    },
    {
      id: "playlists",
      label: "Playlists",
      description: "Organized collections",
      count: playlists.length,
      icon: FaList,
      activeColor:
        "border-emerald-400/40 bg-emerald-500/[0.07] shadow-[0_0_35px_rgba(16,185,129,0.07)]",
      iconColor:
        "bg-emerald-500 text-white",
      textColor:
        "text-emerald-300",
      lineColor:
        "from-emerald-400",
    },
  ];

  // ====================================================
  // Render
  // ====================================================

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-[#050806] px-5 py-24 sm:px-8 lg:px-10"
    >
      {/* Background glow */}
      <div className="absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-red-500/[0.04] blur-[140px]" />

      <div className="absolute bottom-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-amber-400/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-300" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-200/70">
                Nawal Khan
              </span>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Content
              <span className="text-white/35">
                {" "}
                Library
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
              Nawal Khan ke videos, Shorts,
              posts aur playlists ek hi premium
              space mein.
            </p>
          </div>

          {/* YouTube button */}
          <a
            href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:border-red-500/40 hover:bg-red-500/20"
          >
            <FaYoutube />

            <span>Open YouTube</span>

            <span className="text-xs">
              ↗
            </span>
          </a>
        </div>

        {/* Content filter */}
        <div className="mt-10 border-b border-white/[0.08] pb-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              const isActive =
                activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? tab.activeColor
                      : "border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {isActive && (
                    <span
                      className={`absolute left-0 top-0 h-full w-1 ${
                        tab.id === "all"
                          ? "bg-amber-300"
                          : tab.id === "long"
                          ? "bg-red-400"
                          : tab.id === "shorts"
                          ? "bg-violet-400"
                          : tab.id === "posts"
                          ? "bg-blue-400"
                          : "bg-emerald-400"
                      }`}
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                        isActive
                          ? tab.iconColor
                          : "bg-white/[0.06] text-white/50 group-hover:text-white"
                      }`}
                    >
                      <Icon className="text-sm" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm font-semibold ${
                            isActive
                              ? tab.textColor
                              : "text-white/80"
                          }`}
                        >
                          {tab.label}
                        </p>

                        <span
                          className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                            isActive
                              ? "bg-white/10 text-white/70"
                              : "bg-white/[0.06] text-white/35"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-[9px] text-white/35">
                        {tab.description}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r ${tab.lineColor} to-transparent`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            VIDEO LOADING
        ================================================== */}

        {loading && isVideoTab && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="aspect-video animate-pulse rounded-2xl bg-white/[0.05]"
                />
              )
            )}
          </div>
        )}

        {/* ==================================================
            PLAYLIST LOADING
        ================================================== */}

        {activeTab === "playlists" &&
          playlistsLoading && (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="aspect-video animate-pulse rounded-2xl bg-white/[0.05]"
                  />
                )
              )}
            </div>
          )}

        {/* ==================================================
            POSTS LOADING
        ================================================== */}

        {activeTab === "posts" &&
          postsLoading && (
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-[360px] animate-pulse rounded-3xl bg-white/[0.05]"
                  />
                )
              )}
            </div>
          )}

        {/* ==================================================
            VIDEO ERROR
        ================================================== */}

        {!loading &&
          isVideoTab &&
          error && (
            <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6 text-sm text-red-300">
              {error}
            </div>
          )}

        {/* ==================================================
            PLAYLIST ERROR
        ================================================== */}

        {!playlistsLoading &&
          activeTab === "playlists" &&
          playlistsError && (
            <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6 text-sm text-red-300">
              {playlistsError}
            </div>
          )}

        {/* ==================================================
            POSTS ERROR
        ================================================== */}

        {!postsLoading &&
          activeTab === "posts" &&
          postsError && (
            <div className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-500/[0.05] p-6 text-sm text-blue-200">
              {postsError}
            </div>
          )}

        {/* ==================================================
            POSTS
        ================================================== */}

        {!postsLoading &&
          !postsError &&
          activeTab === "posts" &&
          posts.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard
                  key={
                    post.id ||
                    post.url ||
                    Math.random()
                  }
                  post={post}
                />
              ))}
            </div>
          )}

        {/* ==================================================
            NO POSTS
        ================================================== */}

        {!postsLoading &&
          !postsError &&
          activeTab === "posts" &&
          posts.length === 0 && (
            <div className="mt-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]">
              <div className="relative px-6 py-16 text-center sm:px-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                  <FaNewspaper className="text-xl" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  No Community Posts Found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
                  Abhi Nawal Khan ke public
                  Community Posts available nahi
                  mile.
                </p>

                <a
                  href="https://www.youtube.com/channel/UCnWDk5kv2Dut9rmlcporiBw/community"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-xs font-medium text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/20"
                >
                  <FaYoutube />
                  Open YouTube Community
                  <span>↗</span>
                </a>
              </div>
            </div>
          )}

        {/* ==================================================
            PLAYLISTS
        ================================================== */}

        {!playlistsLoading &&
          !playlistsError &&
          activeTab === "playlists" &&
          playlists.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                />
              ))}
            </div>
          )}

        {/* ==================================================
            NO PLAYLISTS
        ================================================== */}

        {!playlistsLoading &&
          !playlistsError &&
          activeTab === "playlists" &&
          playlists.length === 0 && (
            <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <FaList />
              </div>

              <p className="mt-5 text-sm text-white/40">
                Abhi koi public playlist available
                nahi mili.
              </p>
            </div>
          )}

        {/* ==================================================
            VIDEOS
        ================================================== */}

        {!loading &&
          !error &&
          isVideoTab &&
          visibleVideos.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-2xl"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl">
                        <FaPlay className="ml-0.5 text-sm" />
                      </div>
                    </div>

                    {formatDuration(
                      video.duration
                    ) && (
                      <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-[10px] font-medium text-white">
                        {formatDuration(
                          video.duration
                        )}
                      </span>
                    )}

                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-md">
                      {video.type === "short"
                        ? "Short"
                        : "Video"}
                    </span>

                    {video.channelTitle && (
                      <span className="absolute bottom-3 left-3 max-w-[65%] truncate rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[9px] text-white/60 backdrop-blur-md">
                        {video.channelTitle}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-medium leading-6 text-white/85 transition group-hover:text-white">
                      {video.title}
                    </h3>

                    <p className="mt-2 text-[10px] uppercase tracking-wider text-white/25">
                      {formatDate(
                        video.publishedAt
                      )}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

        {/* ==================================================
            EMPTY VIDEOS
        ================================================== */}

        {!loading &&
          !error &&
          isVideoTab &&
          visibleVideos.length === 0 && (
            <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-10 text-center">
              <p className="text-sm text-white/40">
                Is category mein abhi koi video nahi
                hai.
              </p>
            </div>
          )}
      </div>
    </section>
  );
}

export default Videos;
