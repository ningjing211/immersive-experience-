import React, { forwardRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  title?: string;
  className?: string;
}

const YouTubePlayer = forwardRef<HTMLIFrameElement, YouTubePlayerProps>(
  ({ videoId, autoplay = false, controls = true, loop = false, muted = false, title = "", className = "" }, ref) => {
    // 構建 YouTube URL 參數
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      controls: controls ? "1" : "0",
      loop: loop ? "1" : "0",
      mute: muted ? "1" : "0",
      playlist: loop ? videoId : "",
      enablejsapi: "1",
    });

    return (
      <iframe
        ref={ref}
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        className={className}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    );
  }
);

YouTubePlayer.displayName = "YouTubePlayer";

export default YouTubePlayer; 