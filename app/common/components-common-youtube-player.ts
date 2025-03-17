// components/common/YouTubePlayer.tsx
import React, { forwardRef, ForwardedRef } from "react"

interface YouTubePlayerProps {
  videoId: string
  muted?: boolean
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  className?: string
  title?: string
  isBackground?: boolean
}

const YouTubePlayer = forwardRef(
  (
    {
      videoId,
      muted = true,
      autoplay = true,
      controls = false,
      loop = true,
      className = "",
      title = "YouTube video player",
      isBackground = false,
    }: YouTubePlayerProps,
    ref: ForwardedRef<HTMLIFrameElement>
  ) => {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      mute: muted ? "1" : "0",
      controls: controls ? "1" : "0",
      showinfo: "0",
      rel: "0",
      loop: loop ? "1" : "0",
      playlist: videoId,
      enablejsapi: "1",
      version: "3",
      playerapiid: "ytplayer",
      disablekb: "1",
      fs: "0",
      modestbranding: "1",
      origin: typeof window !== "undefined" ? window.location.origin : "",
    })

    const src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`

    return (
      <iframe
        ref={ref}
        src={src}
        className={className}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={title}
      />
    )
  }
)

YouTubePlayer.displayName = "YouTubePlayer"

export default YouTubePlayer
