const API_BASE_URL =
  "https://nawal-khan-official.onrender.com";

export async function getYouTubeVideos() {
  const response = await fetch(
    `${API_BASE_URL}/api/youtube/videos`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "Unable to load YouTube videos."
    );
  }

  return data.videos;
}

export async function getYouTubePlaylists() {
  const response = await fetch(
    `${API_BASE_URL}/api/youtube/playlists`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "Unable to load YouTube playlists."
    );
  }

  return data.playlists;
}

export async function getYouTubePosts() {
  const response = await fetch(
    `${API_BASE_URL}/api/youtube/posts`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.error ||
        "Unable to load YouTube posts."
    );
  }

  return data.posts;
}