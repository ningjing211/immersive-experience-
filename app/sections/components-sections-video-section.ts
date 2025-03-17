// components/sections/VideoSection.tsx
import React, { useRef } from "react"
import YouTubePlayer from "../common/YouTubePlayer"

interface VideoSectionProps {
  videoId: string
  title: string
  description: string
  isActive: boolean
  index: number
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoId,
  title,
  description,
  isActive,
  index
}) => {
  const videoRef = useRef<HTMLIFrameElement | null>(null)

  return (
    <section
      className={`w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden ${isActive ? "active" : ""}`}
    >
      {/* YouTube iframe as background video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <YouTubePlayer
          ref={videoRef}
          videoId={videoId}
          className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          title={`Background video ${index + 1}`}
        />
      </div>

      {/* Stylish overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10"></div>
      <div className="absolute inset-0 mix-blend-overlay opacity-20 z-20 bg-[url('data:image/svg+xml,%3Csvg width=&quot;40&quot; height=&quot;40&quot; viewBox=&quot;0 0 40 40&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.1&quot; fillRule=&quot;evenodd&quot;%3E%3Cpath d=&quot;M0 40L40 0H20L0 20M40 40V20L20 40&quot;%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-20 pointer-events-none"></div>
      <div className="absolute inset-0 z-30 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=&quot;0 0 200 200&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cfilter id=&quot;noiseFilter&quot;%3E%3CfeTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;0.65&quot; numOctaves=&quot;3&quot; stitchTiles=&quot;stitch&quot;/%3E%3C/filter%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; filter=&quot;url(%23noiseFilter)&quot;/%3E%3C/svg%3E')]"></div>

      {/* Content */}
      <div className="relative z-40 flex flex-col items-center justify-center w-full h-full">
        <h1
          className={`text-7xl font-light tracking-tighter mb-8 text-center max-w-[90vw] shadow-md transition-all duration-800 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {title}
        </h1>

        <p
          className={`text-xl max-w-[600px] text-center font-light tracking-wider shadow-sm transition-all duration-800 delay-200 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {description}
        </p>
      </div>
    </section>
  )
}

export default VideoSection
