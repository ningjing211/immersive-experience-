"use client"

import { useEffect, useRef, useState } from "react"

export default function ImmersiveExperience() {
  const [currentPage, setCurrentPage] = useState(0)
  const [soundOn, setSoundOn] = useState(true) // 开始时声音开启
  const [showVerticalPage, setShowVerticalPage] = useState(false) // 新增：控制垂直页面显示
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Array<HTMLIFrameElement | null>>([])
  const audioRef = useRef<HTMLIFrameElement | null>(null)

  // YouTube 视频 ID
  const videoIds = [
    "PUnu_i5Jmtw", // Experience - PRANITJKAMBLE
    "elA9ppRJtxU", // Discover - Krista Ortega
    "P6uwj5Ix7qg", // Connect - DoodletmeGO
    "4bm6y4wmW80", // Observe - Saddle Rock Production
    "9OquUp6x5IU", // Reflect - Dario Idoate Film
  ]

  const sectionTitles = ["experience", "discover", "connect", "observe", "reflect"]
  const sectionDescriptions = [
    "Immerse yourself in new perspectives",
    "Explore the journey through immersive landscapes",
    "Find your place in nature's grand design",
    "See the world through different perspectives",
    "Take time to contemplate the journey",
  ]

  useEffect(() => {
    // 修改：使用新的滚动处理逻辑
    const handleScroll = (e: WheelEvent) => {
      // 阻止默认滚动行为
      e.preventDefault();
      
      // 检测滚动方向
      if (e.deltaY > 0) {
        // 向下滚动，显示垂直页面
        setShowVerticalPage(true);
      } else if (e.deltaY < 0) {
        // 向上滚动，隐藏垂直页面
        setShowVerticalPage(false);
      }
    };

    // 使用 wheel 事件而不是 scroll 事件
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const updateActivePage = (index: number) => {
    setCurrentPage(index)

    // 滚动到适当位置
    const scrollTarget = (index / 5) * (document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    })
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      updateActivePage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < 4) {
      updateActivePage(currentPage + 1)
    }
  }

  // 修复的静音切换功能
  const toggleSound = () => {
    setSoundOn(!soundOn);
    
    if (audioRef.current && audioRef.current.contentWindow) {
      try {
        // 正确的 YouTube iframe API 消息格式
        audioRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: soundOn ? "pauseVideo" : "playVideo",
          }),
          "*"
        );
      } catch (error) {
        console.error("控制音频时出错:", error);
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        handlePrev()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentPage])

  return (
    <div className="relative bg-black text-white">
      <header className="fixed top-0 left-0 w-full px-8 py-7 flex justify-between items-center z-50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="relative w-7 h-7 mr-2.5">
            <div className="absolute top-0 left-0 w-2 h-2 bg-white"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
          </div>
          <span className="text-sm font-medium">Take 2</span>
        </div>

        <div className="flex items-center cursor-pointer">
          <span className="mr-2.5 text-sm font-medium">menu</span>
          <div className="flex flex-col gap-1.5">
            <div className="w-5 h-px bg-white"></div>
            <div className="w-5 h-px bg-white"></div>
            <div className="w-5 h-px bg-white"></div>
          </div>
        </div>
      </header>

      {/* Background music player */}
      <div className="hidden">
        <iframe
          ref={audioRef}
          src="https://www.youtube.com/embed/dnxMT77k9Hs?enablejsapi=1&autoplay=1&mute=0&controls=0&showinfo=0&rel=0&loop=1&playlist=dnxMT77k9Hs&origin=http://localhost:3000"
          allow="autoplay; encrypted-media"
          title="Background Music"
        />
      </div>

      <div className="h-[500vh]" ref={containerRef}>
        <div
          className="sticky top-0 h-screen w-[500vw] flex flex-row"
          style={{
            transform: `translateX(-${currentPage * 100}vw)`,
            transition: "transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
          }}
        >
          {videoIds.map((videoId, index) => (
            <section
              key={index}
              className={`w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden ${currentPage === index ? "active" : ""}`}
            >
              {/* YouTube iframe as background video */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <iframe
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&enablejsapi=1&version=3&playerapiid=ytplayer&disablekb=1&fs=0&modestbranding=1`}
                  className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                  className={`text-7xl font-light tracking-tighter mb-8 text-center max-w-[90vw] shadow-md transition-all duration-800 ${currentPage === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                  {sectionTitles[index]}
                </h1>

                {index > 0 && (
                  <p
                    className={`text-xl max-w-[600px] text-center font-light tracking-wider shadow-sm transition-all duration-800 delay-200 ${currentPage === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    {sectionDescriptions[index]}
                  </p>
                )}

                {index === 0 && (
                  <button
                    className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 border border-white/30 bg-transparent text-white py-2 px-4 text-sm tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm z-40 ${currentPage === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    onClick={handleNext}
                  >
                    <span>See reflection</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center">
        <div
          className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
          onClick={handlePrev}
        >
          ←
        </div>
      </div>

      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center">
        <div
          className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
          onClick={handleNext}
        >
          →
        </div>
      </div>

      {/* Page indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-50">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`w-10 h-px transition-all duration-500 cursor-pointer ${currentPage === index ? "bg-white" : "bg-white/30"}`}
            onClick={() => updateActivePage(index)}
          ></div>
        ))}
      </div>

      {/* Scroll prompt - only visible on first page */}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2.5 z-50 text-xs font-light tracking-wider lowercase opacity-80 transition-opacity duration-500 ${currentPage > 0 ? "opacity-0" : "opacity-80"}`}
      >
        <span>Scroll to explore</span>
        <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center relative backdrop-blur-sm">
          <div className="w-1 h-1 bg-white rounded-full animate-[scrollAnim_2s_infinite]"></div>
        </div>
      </div>

      {/* 新增：垂直滚动页面 */}
      <div 
        className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center"
        style={{
          transform: `translateY(${showVerticalPage ? '0' : '100%'})`,
          transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
          opacity: showVerticalPage ? 1 : 0,
        }}
      >
        <div className="w-full h-full absolute">
          <img 
            src="/path-to-your-image.jpg" 
            alt="Full screen background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl font-light mb-8">新页面标题</h1>
          <p className="text-xl">这是一个新的垂直滚动页面，当您向下滚动时会平滑过渡显示。向上滚动可以返回到主体验页面。</p>
        </div>
      </div>

      {/* 静音按钮 */}
      <button
        className="fixed bottom-8 right-8 z-[70] text-xs font-light tracking-wider lowercase opacity-80 cursor-pointer hover:opacity-100 transition-opacity duration-300 py-2 px-4 border border-white/30 rounded-full backdrop-blur-sm"
        onClick={toggleSound}
        aria-label={soundOn ? "静音" : "播放声音"}
      >
        {soundOn ? "静音" : "播放声音"}
      </button>

      <style jsx>{`
        @keyframes scrollAnim {
          0% {
            transform: translateY(-5px);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(5px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

