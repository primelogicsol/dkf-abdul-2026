import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// Helper function to format duration from ISO 8601 to HH:MM:SS or MM:SS
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const [, hours, minutes, seconds] = match;
  const h = hours ? parseInt(hours) : 0;
  const m = minutes ? parseInt(minutes) : 0;
  const s = seconds ? parseInt(seconds) : 0;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Helper function to format view count
function formatViews(viewCount: number): string {
  if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  }
  if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + "K";
  }
  return viewCount.toString();
}

export async function GET() {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { error: "YouTube API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    // Step 1: Search for videos from the channel
    const searchUrl = "https://www.googleapis.com/youtube/v3/search";
    const searchParams = new URLSearchParams({
      part: "snippet",
      channelId: CHANNEL_ID,
      maxResults: "100",
      order: "date",
      type: "video",
      key: YOUTUBE_API_KEY,
    });

    const searchResponse = await fetch(`${searchUrl}?${searchParams.toString()}`, {
      cache: "no-store",
    });

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json().catch(() => ({}));
      console.error("YouTube Search API error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch videos from YouTube" },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json({ videos: [] });
    }

    // Extract video IDs
    const videoIds = searchData.items
      .map((item: any) => item.id?.videoId)
      .filter(Boolean);

    // Step 2: Fetch video details (duration, view count) in batches of 50
    const batchSize = 50;
    const allVideoDetails: any[] = [];

    for (let i = 0; i < videoIds.length; i += batchSize) {
      const batch = videoIds.slice(i, i + batchSize);
      const detailsUrl = "https://www.googleapis.com/youtube/v3/videos";
      const detailsParams = new URLSearchParams({
        part: "contentDetails,statistics",
        id: batch.join(","),
        key: YOUTUBE_API_KEY,
      });

      const detailsResponse = await fetch(`${detailsUrl}?${detailsParams.toString()}`, {
        cache: "no-store",
      });

      if (detailsResponse.ok) {
        const detailsData = await detailsResponse.json();
        allVideoDetails.push(...(detailsData.items || []));
      }
    }

    // Create a map of video ID to details
    const detailsMap = new Map(
      allVideoDetails.map((item: any) => [item.id, item])
    );

    // Step 3: Combine search results with video details
    const videos = searchData.items.map((item: any) => {
      const videoId = item.id?.videoId;
      const details = detailsMap.get(videoId);

      return {
        id: videoId,
        title: item.snippet?.title,
        thumbnail:
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.default?.url,
        duration: details
          ? formatDuration(details.contentDetails?.duration || "PT0S")
          : null,
        views: details
          ? formatViews(parseInt(details.statistics?.viewCount || "0"))
          : null,
      };
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
