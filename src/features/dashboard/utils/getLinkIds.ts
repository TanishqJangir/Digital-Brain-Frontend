export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    const match = parsedUrl.pathname.match(
      /(embed|shorts|live)\/([^/?]+)/
    );

    if (match) {
      return match[2];
    }

    return null;
  } catch {
    return null;
  }
}

export function getLinkedInPostId(url: string): string | null {
  const match = url.match(/activity-(\d+)/);
  if (match) return match[1];

  const shareMatch = url.match(/share:(\d+)/);
  if (shareMatch) return shareMatch[1];

  return null;
}