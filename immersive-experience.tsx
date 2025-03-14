"use client"

import { useEffect, useRef, useState } from "react"

export default function ImmersiveExperience() {
  const [currentPage, setCurrentPage] = useState(0)
  const [soundOn, setSoundOn] = useState(true) // 开始时声音开启
  const [showVerticalPage, setShowVerticalPage] = useState(false) // 新增：控制垂直页面显示
  const [menuOpen, setMenuOpen] = useState(false) // 新增：控制菜單顯示
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

  const sectionTitles = ["Philosophy", "Value", "Roots", "Vision", "News"]
  const sectionDescriptions = [
    "Explore our guiding principles and approach",
    "Discover what drives our creative process",
    "Learn about our heritage and foundation",
    "See our perspective on the future of brands",
    "Stay updated with our latest insights and trends",
  ]

  // 為每個頁面定義對應的內容
  const pageContents = [
    // Philosophy 頁面內容
    {
      title: "Philosophy",
      subtitle: "Philosophy that serves brands",
      keywords: ["strategy", "reliability", "expertise", "durability"],
      services: ["brand positioning", "360° strategy / ecosystem", "PRM & CRM"],
      description: "我們相信品牌的潛力和在不同媒體上存在的力量。我們的信念在於掌握和理解品牌、其價值觀和抱負，以便能夠支持其整體傳播。這種意識使我們能夠保持品牌的本質和形象，從而提供一個智能策略，並回應一個不斷發展的需求高的受眾。"
    },
    // Value 頁面內容
    {
      title: "Value",
      subtitle: "Values that define our approach",
      keywords: ["integrity", "innovation", "precision", "collaboration"],
      services: ["brand strategy", "market positioning", "identity design"],
      description: "我們的價值觀引導我們的每一個決策和行動。我們致力於以誠信、創新和精確的方式為客戶提供服務，同時注重團隊協作，確保每個項目都能達到最高標準。我們相信，只有通過堅持這些核心價值，才能為客戶創造真正有意義的品牌體驗。"
    },
    // Roots 頁面內容
    {
      title: "Roots",
      subtitle: "Our foundation and heritage",
      keywords: ["tradition", "experience", "knowledge", "adaptation"],
      services: ["brand heritage", "storytelling", "cultural integration"],
      description: "我們的根源深植於豐富的行業經驗和專業知識。多年來，我們不斷學習、適應和發展，同時保持對傳統價值的尊重。這種平衡使我們能夠創造既尊重品牌歷史又面向未來的解決方案，幫助客戶在不斷變化的市場中保持相關性和競爭力。"
    },
    // Vision 頁面內容
    {
      title: "Vision",
      subtitle: "Looking towards the future",
      keywords: ["foresight", "innovation", "growth", "sustainability"],
      services: ["trend analysis", "future planning", "sustainable strategies"],
      description: "我們的願景是成為品牌發展的先驅，不僅關注當下，更著眼於未來。我們致力於識別新興趨勢，預測市場變化，並開發創新解決方案，幫助品牌實現可持續增長。我們相信，真正成功的品牌不僅能適應變化，還能引領變革。"
    },
    // News 頁面內容
    {
      title: "News",
      subtitle: "Latest updates and insights",
      keywords: ["current", "relevant", "informative", "engaging"],
      services: ["market updates", "trend reports", "case studies"],
      description: "保持最新資訊對於品牌成功至關重要。我們持續關注行業動態，分析市場趨勢，並分享有價值的見解，幫助客戶做出明智決策。我們的新聞和分析不僅提供信息，還提供實用的策略建議，使品牌能夠在競爭激烈的環境中脫穎而出。"
    }
  ];

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

  // 切換菜單顯示狀態
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  // 從菜單選擇頁面
  const selectPageFromMenu = (index: number) => {
    updateActivePage(index);
    setMenuOpen(false); // 選擇後關閉菜單
  }

  return (
    <div className="relative bg-black text-white">
      {/* 添加 Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alice&family=Chocolate+Classical+Sans&family=IM+Fell+Double+Pica:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>

      <header className="fixed top-0 left-0 w-full px-8 py-7 flex justify-between items-center z-50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="relative w-7 h-7 mr-2.5">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-white"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            <div className="absolute left-0 top-0 h-full w-0.5 bg-white"></div>
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span className="text-sm font-medium">One One </span>
        </div>

        <div 
          className="flex items-center cursor-pointer z-[80]"
          onClick={toggleMenu}
        >
          <span className="mr-2.5 text-sm font-medium">menu</span>
          <div className="flex flex-col gap-1.5">
            <div className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </div>
      </header>

      {/* 新增：菜單覆蓋層 */}
      <div 
        className="fixed inset-0 z-[75] pointer-events-none"
        style={{
          clipPath: menuOpen ? 'circle(150% at 95% 5%)' : 'circle(0% at 95% 5%)',
          transition: 'clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        <div 
          className={`absolute inset-0 bg-[#b3b1a6] backdrop-blur-md ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {/* 關閉按鈕 - 移到右邊 */}
          <button 
            className="absolute top-8 right-8 text-black/70 flex items-center text-sm font-light"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mr-2">close menu</span>
            <div className="w-4 h-px bg-black/70"></div>
          </button>
          
          {/* 中央內容區域 */}
          <div className="flex flex-col justify-center items-center h-full">
            <div className="max-w-md w-full mx-auto px-8 -translate-x-24 mt-16">
              <ul className="space-y-5">
                <li className="transform transition-all duration-500 translate-x-0 opacity-100" style={{ transitionDelay: '0s' }}>
                  <button 
                    className="text-2xl font-light tracking-wider hover:text-black transition-colors text-black"
                    style={{ fontFamily: "'Alice', serif" }}
                    onClick={() => selectPageFromMenu(0)}
                  >
                    Philosophy
                  </button>
                </li>
                <li className="transform transition-all duration-500 translate-x-0 opacity-100" style={{ transitionDelay: '0.1s' }}>
                  <button 
                    className="text-2xl font-light tracking-wider hover:text-black transition-colors text-black/50"
                    style={{ fontFamily: "'Alice', serif" }}
                    onClick={() => selectPageFromMenu(1)}
                  >
                    Value
                  </button>
                </li>
                <li className="transform transition-all duration-500 translate-x-0 opacity-100" style={{ transitionDelay: '0.2s' }}>
                  <button 
                    className="text-2xl font-light tracking-wider hover:text-black transition-colors text-black/50"
                    style={{ fontFamily: "'Alice', serif" }}
                    onClick={() => selectPageFromMenu(2)}
                  >
                    Roots
                  </button>
                </li>
                <li className="transform transition-all duration-500 translate-x-0 opacity-100" style={{ transitionDelay: '0.3s' }}>
                  <button 
                    className="text-2xl font-light tracking-wider hover:text-black transition-colors text-black/50"
                    style={{ fontFamily: "'Alice', serif" }}
                    onClick={() => selectPageFromMenu(3)}
                  >
                    Vision
                  </button>
                </li>
                <li className="transform transition-all duration-500 translate-x-0 opacity-100" style={{ transitionDelay: '0.4s' }}>
                  <button 
                    className="text-2xl font-light tracking-wider hover:text-black transition-colors text-black/50"
                    style={{ fontFamily: "'Alice', serif" }}
                    onClick={() => selectPageFromMenu(4)}
                  >
                    News
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* 底部連結 */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8 text-xs text-black/70">
            <a 
              href="#" 
              className="hover:text-black transition-colors"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              About us
            </a>
            <a 
              href="#" 
              className="hover:text-black transition-colors"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Get in touch
            </a>
            <a 
              href="#" 
              className="hover:text-black transition-colors"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Legal notice
            </a>
          </div>
        </div>
      </div>

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

                <p
                  className={`text-xl max-w-[600px] text-center font-light tracking-wider shadow-sm transition-all duration-800 delay-200 ${currentPage === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  {sectionDescriptions[index]}
                </p>
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

      {/* Scroll prompt - only visible on first page */}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2.5 z-50 text-xs font-light tracking-wider lowercase opacity-80 transition-opacity duration-500 ${currentPage > 0 ? "opacity-0" : "opacity-80"}`}
      >
        <span>Scroll to explore</span>
        <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center relative backdrop-blur-sm">
          <div className="w-1 h-1 bg-white rounded-full animate-[scrollAnim_2s_infinite]"></div>
        </div>
      </div>

      {/* 新增：垂直滾動頁面 */}
      <div 
        className="fixed inset-0 z-[60] flex items-start justify-start"
        style={{
          transform: `translateY(${showVerticalPage ? '0' : '100%'})`,
          transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.6s ease-in-out',
          opacity: showVerticalPage ? 1 : 0,
        }}
      >
        <div className="w-[90%] h-[90%] ml-0 bg-white relative overflow-auto rounded-r-lg shadow-2xl mt-[10%]">
          <div className="p-16">
            <h1 className="text-6xl font-bold text-black mb-12">{pageContents[currentPage].title}</h1>
            
            <div className="flex flex-wrap">
              {/* 左側內容區域 - A 區塊 */}
              <div className="w-full md:w-2/5 mb-8 md:mb-0 pr-0 md:pr-8">
                <div className="text-black text-3xl font-bold mb-8">
                  <p>
                    {pageContents[currentPage].keywords.map((keyword, i) => (
                      <span key={i}>
                        {keyword}<br/>
                      </span>
                    ))}
                  </p>
                </div>
                
                <div className="text-black text-lg">
                  <p className="font-medium mb-4">OUR SERVICES</p>
                  <p>
                    {pageContents[currentPage].services.map((service, i) => (
                      <span key={i}>
                        {service}<br/>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              
              {/* 右側內容區域 - B 區塊 */}
              <div className="w-full md:w-3/5">
                <div className="mb-8">
                  <p className="text-black text-2xl font-medium mb-6">{pageContents[currentPage].subtitle}</p>
                  
                  <p className="text-black text-base leading-relaxed" style={{ width: 'calc(4/5 * 100%)' }}>
                    {pageContents[currentPage].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 關閉按鈕 */}
          <button 
            className="absolute top-8 right-8 text-black flex items-center"
            onClick={() => setShowVerticalPage(false)}
          >
            <span className="mr-2">關閉</span>
            <div className="w-6 h-px bg-black transform rotate-45"></div>
            <div className="w-6 h-px bg-black transform -rotate-45 -ml-6"></div>
          </button>
        </div>
      </div>

      {/* 靜音按鈕 */}
      <button
        className="fixed bottom-8 right-8 z-[70] text-xs font-light tracking-wider lowercase opacity-80 cursor-pointer hover:opacity-100 transition-opacity duration-300 py-2 px-4 border border-white/30 rounded-full backdrop-blur-sm"
        onClick={toggleSound}
        aria-label={soundOn ? "mute" : "sound"}
      >
        {soundOn ? "mute" : "sound"}
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

