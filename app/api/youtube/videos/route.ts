import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function GET() {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { error: "YouTube API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const baseUrl = "https://www.googleapis.com/youtube/v3/search";
    const params = new URLSearchParams({
      part: "snippet",
      channelId: CHANNEL_ID,
      maxResults: "100",
      order: "date",
      type: "video",
      key: YOUTUBE_API_KEY,
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("YouTube API error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch videos from YouTube" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform YouTube API response to match the expected format
    const videos = data.items?.map((item: any) => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url,
      duration: null, // Duration requires a separate API call
      views: null, // View count requires statistics from video details endpoint
    })) || [];

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
