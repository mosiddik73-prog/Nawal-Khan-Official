const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// ======================================================
// Nawal Khan YouTube Channels
// ======================================================

const CHANNEL_IDS = [
  "UCnWDk5kv2Dut9rmlcporiBw", // Nawal Khan Official
  "UCsMxPIhO_i2ftQyW_fWUMxQ", // @NawalKhanofficial-1
];

// ======================================================
// YouTube API Helper
// ======================================================

async function youtubeRequest(endpoint, params = {}) {
  const url = new URL(
    `https://www.googleapis.com/youtube/v3/${endpoint}`
  );

  url.searchParams.set("key", YOUTUBE_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "YouTube API request failed."
    );
  }

  return data;
}

// ======================================================
// Convert ISO duration to seconds
// ======================================================

function durationToSeconds(duration) {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) {
    return 0;
  }

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

// ======================================================
// Classify Video
// ======================================================

function classifyVideo(duration, title) {
  const seconds = durationToSeconds(duration);

  const lowerTitle = title.toLowerCase();

  // YouTube Shorts can be up to 3 minutes.
  if (
    seconds <= 180 ||
    lowerTitle.includes("#shorts") ||
    lowerTitle.includes("#short")
  ) {
    return "short";
  }

  return "long";
}

// ======================================================
// Get Channel Information
// ======================================================

async function getChannel(channelId) {
  const data = await youtubeRequest("channels", {
    part: "snippet,contentDetails",
    id: channelId,
  });

  if (!data.items || data.items.length === 0) {
    throw new Error(
      `YouTube channel not found: ${channelId}`
    );
  }

  const channel = data.items[0];

  return {
    id: channel.id,
    title: channel.snippet.title,
    description: channel.snippet.description || "",
    thumbnail:
      channel.snippet.thumbnails?.high?.url ||
      channel.snippet.thumbnails?.medium?.url ||
      channel.snippet.thumbnails?.default?.url ||
      "",
    uploadsPlaylistId:
      channel.contentDetails.relatedPlaylists.uploads,
  };
}

// ======================================================
// Get ALL Uploads From A Channel
// ======================================================

async function getAllPlaylistItems(playlistId) {
  const items = [];
  let nextPageToken = "";

  do {
    const params = {
      part: "snippet,contentDetails",
      playlistId,
      maxResults: "50",
    };

    if (nextPageToken) {
      params.pageToken = nextPageToken;
    }

    const data = await youtubeRequest(
      "playlistItems",
      params
    );

    if (Array.isArray(data.items)) {
      items.push(...data.items);
    }

    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  return items;
}

// ======================================================
// Get Video Details In Batches
// ======================================================

async function getVideoDetails(videoIds) {
  const videos = [];

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);

    const data = await youtubeRequest("videos", {
      part: "snippet,contentDetails,status",
      id: batch.join(","),
    });

    if (Array.isArray(data.items)) {
      videos.push(...data.items);
    }
  }

  return videos;
}

// ======================================================
// Build Videos For One Channel
// ======================================================

async function getChannelVideos(channelId) {
  const channel = await getChannel(channelId);

  const playlistItems = await getAllPlaylistItems(
    channel.uploadsPlaylistId
  );

  const videoIds = playlistItems
    .map((item) => item.contentDetails?.videoId)
    .filter(Boolean);

  if (videoIds.length === 0) {
    return {
      channel,
      videos: [],
    };
  }

  const videoDetails = await getVideoDetails(videoIds);

  const videos = videoDetails
    .filter((video) => {
      return video.status?.privacyStatus === "public";
    })
    .map((video) => {
      const title = video.snippet?.title || "";
      const duration =
        video.contentDetails?.duration || "PT0S";

      return {
        id: video.id,

        title,

        description:
          video.snippet?.description || "",

        publishedAt:
          video.snippet?.publishedAt || null,

        channelId:
          video.snippet?.channelId || channel.id,

        channelTitle:
          video.snippet?.channelTitle || channel.title,

        thumbnail:
          video.snippet?.thumbnails?.maxres?.url ||
          video.snippet?.thumbnails?.high?.url ||
          video.snippet?.thumbnails?.medium?.url ||
          video.snippet?.thumbnails?.default?.url ||
          `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,

        duration,

        durationSeconds:
          durationToSeconds(duration),

        type: classifyVideo(duration, title),

        url: `https://www.youtube.com/watch?v=${video.id}`,
      };
    });

  return {
    channel,
    videos,
  };
}



// ======================================================
// Get ALL Playlists From A Channel
// ======================================================

async function getAllChannelPlaylists(channelId) {
  const playlists = [];
  let nextPageToken = "";

  do {
    const params = {
      part: "snippet,contentDetails",
      channelId,
      maxResults: "50",
    };

    if (nextPageToken) {
      params.pageToken = nextPageToken;
    }

    const data = await youtubeRequest(
      "playlists",
      params
    );

    if (Array.isArray(data.items)) {
      playlists.push(...data.items);
    }

    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  return playlists;
}

// ======================================================
// Get Playlist Video Count
// ======================================================

async function getPlaylistVideoCount(playlistId) {
  try {
    let total = 0;
    let nextPageToken = "";

    do {
      const params = {
        part: "contentDetails",
        playlistId,
        maxResults: "50",
      };

      if (nextPageToken) {
        params.pageToken = nextPageToken;
      }

      const data = await youtubeRequest(
        "playlistItems",
        params
      );

      total += Array.isArray(data.items)
        ? data.items.length
        : 0;

      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);

    return total;
  } catch (error) {
    console.error(
      `Playlist count error (${playlistId}):`,
      error.message
    );

    return 0;
  }
}

// ======================================================
// Build Playlists For One Channel
// ======================================================

async function getChannelPlaylists(channelId) {
  const channel = await getChannel(channelId);

  const playlists =
    await getAllChannelPlaylists(channelId);

  const result = [];

  for (const playlist of playlists) {
    const playlistId = playlist.id;

    const videoCount =
      playlist.contentDetails?.itemCount ??
      (await getPlaylistVideoCount(playlistId));

    result.push({
      id: playlistId,

      title:
        playlist.snippet?.title ||
        "Untitled Playlist",

      description:
        playlist.snippet?.description || "",

      publishedAt:
        playlist.snippet?.publishedAt || null,

      channelId: channel.id,

      channelTitle: channel.title,

      thumbnail:
        playlist.snippet?.thumbnails?.maxres?.url ||
        playlist.snippet?.thumbnails?.high?.url ||
        playlist.snippet?.thumbnails?.medium?.url ||
        playlist.snippet?.thumbnails?.default?.url ||
        "",

      videoCount: Number(videoCount || 0),

      url:
        `https://www.youtube.com/playlist?list=${playlistId}`,
    });
  }

  return {
    channel,
    playlists: result,
  };
}


// ======================================================
// YouTube Community Posts - FREE INTERNAL API
// ======================================================

// YouTube's internal browse endpoint is used here.
// No Captapi credits are required.

const YOUTUBE_INNERTUBE_URL =
  "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false";

const POSTS_PARAMS = "EgVwb3N0c_IGBAoCSgA=";

// ======================================================
// YouTube InnerTube Request
// ======================================================

async function youtubeInnerTubeRequest(payload) {
  const response = await fetch(YOUTUBE_INNERTUBE_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142.0.0.0 Safari/537.36",
      "Origin": "https://www.youtube.com",
      "Referer": "https://www.youtube.com/",
    },

    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20261001.01.00",
          hl: "en",
          gl: "IN",
        },
      },

      ...payload,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        `YouTube InnerTube request failed (${response.status}).`
    );
  }

  return data;
}

// ======================================================
// Small helpers for YouTube renderer data
// ======================================================

function getTextFromRenderer(renderer) {
  if (!renderer) {
    return "";
  }

  if (typeof renderer === "string") {
    return renderer;
  }

  if (renderer.simpleText) {
    return renderer.simpleText;
  }

  if (Array.isArray(renderer.runs)) {
    return renderer.runs
      .map((run) => run?.text || "")
      .join("");
  }

  return "";
}

function getThumbnailUrl(thumbnails) {
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) {
    return "";
  }

  return (
    thumbnails[thumbnails.length - 1]?.url ||
    thumbnails[0]?.url ||
    ""
  );
}

function getPostImageUrl(image) {
  if (!image) {
    return "";
  }

  if (typeof image === "string") {
    return image;
  }

  return (
    image.url ||
    image.thumbnails?.[image.thumbnails.length - 1]?.url ||
    image.thumbnails?.[0]?.url ||
    ""
  );
}

// ======================================================
// Extract all possible Post renderers recursively
// ======================================================

function findPostRenderers(value, result = []) {
  if (!value || typeof value !== "object") {
    return result;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      findPostRenderers(item, result);
    }

    return result;
  }

  // Modern YouTube community post renderer
  if (value.backstagePostThreadRenderer) {
    result.push(value.backstagePostThreadRenderer);
  }

  // Older/alternative renderer names
  if (value.backstagePostRenderer) {
    result.push(value.backstagePostRenderer);
  }

  if (value.backstagePostThreadRenderer) {
    findPostRenderers(
      value.backstagePostThreadRenderer,
      result
    );
  }

  for (const key of Object.keys(value)) {
    findPostRenderers(value[key], result);
  }

  return result;
}

// ======================================================
// Find YouTube continuation token
// ======================================================

function findContinuationToken(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const token = findContinuationToken(item);

      if (token) {
        return token;
      }
    }

    return null;
  }

  // Direct continuation command
  const token1 =
    value?.continuationCommand?.token;

  if (token1) {
    return token1;
  }

  // Continuation endpoint
  const token2 =
    value?.continuationEndpoint
      ?.continuationCommand
      ?.token;

  if (token2) {
    return token2;
  }

  // Continuation item renderer
  const token3 =
    value?.continuationItemRenderer
      ?.continuationEndpoint
      ?.continuationCommand
      ?.token;

  if (token3) {
    return token3;
  }

  // Recursive search
  for (const key of Object.keys(value)) {
    const token =
      findContinuationToken(value[key]);

    if (token) {
      return token;
    }
  }

  return null;
}

// ======================================================
// Extract video from linked content
// ======================================================

function extractLinkedVideo(post) {
  const videoRenderer =
    post?.backstagePostThreadRenderer
      ?.backstagePostRenderer
      ?.videoRenderer ||
    post?.videoRenderer;

  if (!videoRenderer) {
    return null;
  }

  const videoId = videoRenderer.videoId;

  if (!videoId) {
    return null;
  }

  return {
    id: videoId,

    title: getTextFromRenderer(
      videoRenderer.title
    ),

    thumbnail: getThumbnailUrl(
      videoRenderer.thumbnail?.thumbnails
    ),

    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

// ======================================================
// Normalize one YouTube Community Post
// ======================================================

function normalizeInnerTubePost(rawPost, channel) {
  const post =
    rawPost?.backstagePostThreadRenderer ||
    rawPost?.backstagePostRenderer ||
    rawPost;

  const renderer =
    post?.backstagePostRenderer ||
    post;

  const postId =
    renderer?.postId ||
    renderer?.postIdText ||
    "";

  const contentText =
    getTextFromRenderer(
      renderer?.contentText
    ) ||
    getTextFromRenderer(
      renderer?.header
        ?.postHeaderRenderer
        ?.contentText
    ) ||
    "";

  const publishedText =
    getTextFromRenderer(
      renderer?.publishedTimeText
    ) ||
    getTextFromRenderer(
      renderer?.header
        ?.postHeaderRenderer
        ?.publishedTimeText
    ) ||
    "";

  const voteCount =
    renderer?.voteCount?.simpleText ||
    getTextFromRenderer(
      renderer?.voteCount
    ) ||
    "";

  const voteCountNumber =
    Number(
      String(voteCount).replace(/[^0-9]/g, "")
    ) || 0;

  /*
   * =========================================================
   * COMMUNITY POST ATTACHMENTS
   * =========================================================
   *
   * IMPORTANT:
   *
   * We ONLY read actual post attachments.
   *
   * We DO NOT scan the whole renderer recursively.
   *
   * This prevents YouTube channel avatars/logos from
   * accidentally becoming post images.
   */

  const attachment =
    renderer?.backstageAttachment ||
    renderer?.backstageAttachmentRenderer ||
    null;

  const images = [];

  function addImageFromThumbnails(thumbnails) {
    if (
      !Array.isArray(thumbnails) ||
      thumbnails.length === 0
    ) {
      return;
    }

    const url =
      getThumbnailUrl(thumbnails);

    if (
      url &&
      !images.includes(url)
    ) {
      images.push(url);
    }
  }

  /*
   * ---------------------------------------------------------
   * PHOTO POST
   * ---------------------------------------------------------
   *
   * These are the places where an actual Community Post
   * image can exist.
   */

  const possibleImageNodes = [
    attachment?.backstageImageRenderer,
    attachment?.imageRenderer,
    attachment?.image,
    attachment?.postImage,
    attachment?.imageThumbnail,

    // Additional YouTube Community Post image structures
    attachment?.backstageImage,
    attachment?.postImageRenderer,
    attachment?.backstagePostImageRenderer,
    attachment?.backstageImageAttachmentRenderer,
    attachment?.imageAttachmentRenderer,

    // Sometimes the image is nested one level deeper
    attachment?.backstageAttachmentRenderer,
    attachment?.backstageAttachmentRenderer?.image,
    attachment?.backstageAttachmentRenderer?.imageRenderer,
    attachment?.backstageAttachmentRenderer?.postImage,
  ];

  for (
  const imageNode of possibleImageNodes
) {
    if (!imageNode) {
      continue;
    }

    addImageFromThumbnails(
      imageNode?.thumbnail?.thumbnails
    );

    addImageFromThumbnails(
      imageNode?.thumbnails
    );

    addImageFromThumbnails(
      imageNode?.image?.thumbnails
    );

    addImageFromThumbnails(
      imageNode?.imageThumbnail?.thumbnails
    );

    addImageFromThumbnails(
      imageNode?.postImage?.thumbnails
    );

    addImageFromThumbnails(
      imageNode?.sources
    );
  }

  /* 
   * ---------------------------------------------------------
   * VIDEO ATTACHMENT
   * ---------------------------------------------------------
   *
   * If the post contains a YouTube video, use the video's
   * thumbnail as the visual preview.
   *
   * This is NOT the channel logo.
   */

  const videoRenderer =
    attachment?.videoRenderer ||
    attachment?.compactVideoRenderer ||
    attachment?.videoWithContextRenderer
      ?.videoRenderer ||
    null;

  if (
    videoRenderer?.thumbnail?.thumbnails
  ) {
    addImageFromThumbnails(
      videoRenderer.thumbnail.thumbnails
    );
  }

  /*
   * ---------------------------------------------------------
   * LINKED VIDEO
   * ---------------------------------------------------------
   */

  const linkedVideo =
    extractLinkedVideo(renderer);

  /*
   * ---------------------------------------------------------
   * POST TYPE
   * ---------------------------------------------------------
   */

  let postType = "text";

  if (
    renderer?.pollRenderer ||
    renderer?.backstagePostPollRenderer
  ) {
    postType = "poll";
  }

  if (videoRenderer || linkedVideo) {
    postType = "video";
  }

  if (
    images.length > 0 &&
    !videoRenderer &&
    !linkedVideo
  ) {
    postType = "photo";
  }

  /*
   * ---------------------------------------------------------
   * POLL OPTIONS
   * ---------------------------------------------------------
   */

  const pollOptions = [];

  const pollRenderer =
    renderer?.pollRenderer ||
    renderer?.backstagePostPollRenderer ||
    null;

  const pollChoices =
    pollRenderer?.choices ||
    pollRenderer?.pollChoices ||
    [];

  if (Array.isArray(pollChoices)) {
    for (const choice of pollChoices) {
      const text =
        getTextFromRenderer(
          choice?.text
        ) ||
        getTextFromRenderer(
          choice?.optionText
        ) ||
        "";

      if (text) {
        pollOptions.push({
          text,
          voteCount:
            Number(
              String(
                choice?.voteCount ||
                ""
              ).replace(
                /[^0-9]/g,
                ""
              )
            ) || 0,
        });
      }
    }
  }

  /*
   * ---------------------------------------------------------
   * FINAL POST OBJECT
   * ---------------------------------------------------------
   */

  return {
    id:
      postId ||
      `${channel.id}-${publishedText}-${contentText}`,

    url: postId
      ? `https://www.youtube.com/post/${postId}`
      : `https://www.youtube.com/channel/${channel.id}/community`,

    text: contentText,

    postType,

    publishedTime: null,

    publishedTimeText: publishedText,

    likeCount: voteCountNumber,

    likeCountText: voteCount,

    likeCountIsApproximate: true,

    /*
     * ONLY genuine attachment images.
     *
     * Channel avatar/logo is NOT included.
     */
    images,

    hashtags:
      contentText.match(
        /#[\p{L}\p{N}_]+/gu
      ) || [],

    linkedVideos:
      linkedVideo
        ? [linkedVideo]
        : [],

    pollOptions,

    totalVotes: 0,

    totalVotesIsApproximate: true,

    channelId:
      channel.id,

    channelTitle:
      channel.title,

    channelThumbnail:
      channel.thumbnail,

    channelUrl:
      `https://www.youtube.com/channel/${channel.id}`,
  };
}


// ======================================================
// Get ALL Community Posts From YouTube
// With Pagination / Continuation
// ======================================================

async function getChannelPostsFree(channelId) {
  const allPosts = new Map();

  let continuationToken = null;

  // Safety limit:
  // Ek channel se maximum 20 batches load honge.
  // Isse accidental infinite loop nahi hoga.
  const MAX_PAGES = 20;

  for (let page = 0; page < MAX_PAGES; page++) {
    let data;

    // --------------------------------------------------
    // FIRST PAGE
    // --------------------------------------------------

    if (!continuationToken) {
      data = await youtubeInnerTubeRequest({
        browseId: channelId,
        params: POSTS_PARAMS,
      });
    }

    // --------------------------------------------------
    // NEXT PAGES
    // --------------------------------------------------

    else {
      data = await youtubeInnerTubeRequest({
        continuation: continuationToken,
      });
    }

    // --------------------------------------------------
    // Find Posts
    // --------------------------------------------------

    const renderers =
      findPostRenderers(data);

    for (const renderer of renderers) {
      const post = normalizeInnerTubePost(
        renderer,
        {
          id: channelId,
          title: "",
          thumbnail: "",
        }
      );

      if (
        post.id &&
        !allPosts.has(post.id)
      ) {
        allPosts.set(
          post.id,
          post
        );
      }
    }

    // --------------------------------------------------
    // Find next continuation token
    // --------------------------------------------------

    const nextToken =
      findContinuationToken(data);

    // --------------------------------------------------
    // No more pages
    // --------------------------------------------------

    if (!nextToken) {
      continuationToken = null;
      break;
    }

    // --------------------------------------------------
    // Same token protection
    // --------------------------------------------------

    if (
      continuationToken &&
      nextToken === continuationToken
    ) {
      console.log(
        `Posts pagination stopped for ${channelId}: same continuation token.`
      );

      break;
    }

    continuationToken = nextToken;

    console.log(
      `Posts page ${page + 1} loaded for ${channelId}. Total posts: ${allPosts.size}`
    );
  }

  return {
    posts: Array.from(
      allPosts.values()
    ),

    nextCursor:
      continuationToken,

    hasMore:
      Boolean(continuationToken),
  };
}


// ======================================================
// Main YouTube Community Posts API
// ======================================================

app.get(
  "/api/youtube/posts",
  async (req, res) => {
    try {
      // ------------------------------------------------
      // Fetch channel information
      // ------------------------------------------------

      const channels =
        await Promise.all(
          CHANNEL_IDS.map((channelId) =>
            getChannel(channelId)
          )
        );

      // ------------------------------------------------
      // Fetch Posts
      // ------------------------------------------------

      const results =
        await Promise.all(
          channels.map(async (channel) => {
            const data =
              await getChannelPostsFree(
                channel.id
              );

            const posts =
              data.posts.map((post) => ({
                ...post,

                channelId:
                  channel.id,

                channelTitle:
                  channel.title,

                channelThumbnail:
                  channel.thumbnail,

                channelUrl:
                  `https://www.youtube.com/channel/${channel.id}`,
              }));

            return {
              channel,
              posts,
              communityStatus:
                posts.length > 0
                  ? "available"
                  : "empty",

              nextCursor:
                data.nextCursor,

              hasMore:
                data.hasMore,
            };
          })
        );

      // ------------------------------------------------
      // Merge all posts
      // ------------------------------------------------

      const allPosts =
        results.flatMap(
          (result) => result.posts
        );

      // ------------------------------------------------
      // Remove duplicates
      // ------------------------------------------------

      const uniquePostsMap =
        new Map();

      for (const post of allPosts) {
        if (
          post.id &&
          !uniquePostsMap.has(post.id)
        ) {
          uniquePostsMap.set(
            post.id,
            post
          );
        }
      }

      const posts =
        Array.from(
          uniquePostsMap.values()
        );

      // ------------------------------------------------
      // Response
      // ------------------------------------------------

      res.json({
        success: true,

        channels,

        channelCount:
          channels.length,

        count:
          posts.length,

        posts,

        sources:
          results.map((result) => ({
            channelId:
              result.channel.id,

            channelTitle:
              result.channel.title,

            communityStatus:
              result.communityStatus,

            hasMore:
              result.hasMore,

            nextCursor:
              result.nextCursor,
          })),
      });

    } catch (error) {
      console.error(
        "YouTube Free Posts API Error:",
        error.message
      );

      res.status(500).json({
        success: false,

        error:
          error.message ||
          "Unable to load YouTube posts.",
      });
    }
  }
);



// ======================================================
// Main YouTube Playlists API
// ======================================================

app.get("/api/youtube/playlists", async (req, res) => {
  try {
    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "YOUTUBE_API_KEY is missing in .env",
      });
    }

    const results = await Promise.all(
      CHANNEL_IDS.map((channelId) =>
        getChannelPlaylists(channelId)
      )
    );

    const channels = results.map(
      (result) => result.channel
    );

    const allPlaylists = results.flatMap(
      (result) => result.playlists
    );

    // Duplicate playlists remove karo
    const uniquePlaylistsMap = new Map();

    for (const playlist of allPlaylists) {
      if (!uniquePlaylistsMap.has(playlist.id)) {
        uniquePlaylistsMap.set(
          playlist.id,
          playlist
        );
      }
    }

    const playlists = Array.from(
      uniquePlaylistsMap.values()
    );

    // Latest playlists first
    playlists.sort((a, b) => {
      return (
        new Date(b.publishedAt || 0) -
        new Date(a.publishedAt || 0)
      );
    });

    res.json({
      success: true,

      channels,

      channelCount: channels.length,

      count: playlists.length,

      playlists,
    });
  } catch (error) {
    console.error(
      "YouTube Playlists API Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load YouTube playlists.",
    });
  }
});



// ======================================================
// Main YouTube Videos API
// ======================================================

app.get("/api/youtube/videos", async (req, res) => {
  try {
    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "YOUTUBE_API_KEY is missing in .env",
      });
    }

    // --------------------------------------------------
    // Fetch both channels
    // --------------------------------------------------

    const results = await Promise.all(
      CHANNEL_IDS.map((channelId) =>
        getChannelVideos(channelId)
      )
    );

    // --------------------------------------------------
    // Collect channels
    // --------------------------------------------------

    const channels = results.map(
      (result) => result.channel
    );

    // --------------------------------------------------
    // Merge all videos
    // --------------------------------------------------

    const allVideos = results.flatMap(
      (result) => result.videos
    );

    // --------------------------------------------------
    // Remove duplicate videos
    // --------------------------------------------------

    const uniqueVideosMap = new Map();

    for (const video of allVideos) {
      if (!uniqueVideosMap.has(video.id)) {
        uniqueVideosMap.set(video.id, video);
      }
    }

    const videos = Array.from(
      uniqueVideosMap.values()
    );

    // --------------------------------------------------
    // Newest videos first
    // --------------------------------------------------

    videos.sort((a, b) => {
      return (
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
      );
    });

    // --------------------------------------------------
    // Separate long videos / shorts
    // --------------------------------------------------

    const longVideos = videos.filter(
      (video) => video.type === "long"
    );

    const shorts = videos.filter(
      (video) => video.type === "short"
    );

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    res.json({
      success: true,

      channels,

      channelCount: channels.length,

      count: videos.length,

      longVideos: longVideos.length,

      shorts: shorts.length,

      videos,
    });
  } catch (error) {
    console.error(
      "YouTube API Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load YouTube videos.",
    });
  }
});

// ======================================================
// Health Check
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Nawal Khan Website YouTube Server is running.",
    channels: CHANNEL_IDS,
  });
});

// ======================================================
// Start Server
// ======================================================

app.listen(PORT, () => {
  console.log(
    `Nawal Khan YouTube Server running on http://localhost:${PORT}`
  );

  console.log(
    `Connected channels: ${CHANNEL_IDS.length}`
  );
});



// ======================================================
// Instagram Media API
// ======================================================

const INSTAGRAM_ACCESS_TOKEN =
  process.env.INSTAGRAM_ACCESS_TOKEN || "";

const INSTAGRAM_API_VERSION =
  process.env.INSTAGRAM_API_VERSION || "";

async function instagramRequest(endpoint, params = {}) {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    throw new Error(
      "INSTAGRAM_ACCESS_TOKEN is missing in .env"
    );
  }

  if (!INSTAGRAM_API_VERSION) {
    throw new Error(
      "INSTAGRAM_API_VERSION is missing in .env"
    );
  }

  const url = new URL(
    `https://graph.instagram.com/${INSTAGRAM_API_VERSION}/${endpoint}`
  );

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  url.searchParams.set(
    "access_token",
    INSTAGRAM_ACCESS_TOKEN
  );

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        "Instagram API request failed."
    );
  }

  return data;
}


// ======================================================
// Get Instagram Media
// ======================================================

app.get("/api/instagram/media", async (req, res) => {
  try {
    const data = await instagramRequest("me/media", {
      fields:
        "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username",
      limit: "50",
    });

    const media = Array.isArray(data?.data)
      ? data.data.map((item) => ({
          id: item.id,

          caption:
            item.caption || "",

          mediaType:
            item.media_type || "IMAGE",

          mediaUrl:
            item.media_url || "",

          thumbnailUrl:
            item.thumbnail_url ||
            item.media_url ||
            "",

          permalink:
            item.permalink || "",

          timestamp:
            item.timestamp || null,

          username:
            item.username || "",
        }))
      : [];

    res.json({
      success: true,
      count: media.length,
      media,
      paging: data?.paging || null,
    });
  } catch (error) {
    console.error(
      "Instagram Media API Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load Instagram media.",
    });
  }
});

