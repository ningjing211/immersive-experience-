"use client"

import { useEffect, useRef, useState } from "react"

import Header from "../app/layout/components-layout-header"
import Menu from "../app/layout/components-layout-menu"
import Navigation from "../app/layout/components-layout-navigation"
import ScrollPrompt from "../app/layout/components-layout-scroll-prompt"
import SoundToggle from "../app/layout/components-layout-sound-toggle"

import VideoSection from "../app/sections/components-sections-video-section"
import VerticalPage from "../app/sections/components-sections-vertical-page"
import YouTubePlayer from "../app/common/components-common-youtube-player"
import { usePageNavigation } from "../hooks/hooks-use-page-navigation"

import { useSound } from "../hooks/hooks-use-sound"
import GlobalStyles from "../styles/styles-global-styles"

import { videoIds, sectionTitles, sectionDescriptions } from "../data/data-section-data"

export default function ImmersiveExperience() {
  // State hooks
  const [showVerticalPage, setShowVerticalPage] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Custom hooks
  const { currentPage, updateActivePage, handlePrev, handleNext } = usePageNavigation(5)
  const { soundOn, audioRef, toggleSound } = useSound(true)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle scroll to show vertical page
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      // 如果垂直頁面已經顯示，允許正常滾動
      if (showVerticalPage) {
        return;
      }
      
      // 阻止默認滾動行為
      e.preventDefault();
      
      // 檢測滾動方向
      if (e.deltaY > 0) {
        // 向下滾動，顯示垂直頁面
        setShowVerticalPage(true);
      } else if (e.deltaY < 0) {
        // 向上滾動，隱藏垂直頁面
        setShowVerticalPage(false);
      }
    };

    // 使用 wheel 事件而不是 scroll 事件
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [showVerticalPage]); // 添加 showVerticalPage 作為依賴項

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Select page from menu
  const selectPageFromMenu = (index: number) => {
    updateActivePage(index)
    setMenuOpen(false)
  }

  return (
    <div className="relative bg-black text-white">
      <GlobalStyles />

      {/* Header */}
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* Menu */}
      <Menu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        selectPageFromMenu={selectPageFromMenu} 
      />

      {/* Background music player */}
      <div className="hidden">
        <YouTubePlayer
          ref={audioRef}
          videoId="dnxMT77k9Hs"
          muted={!soundOn}
          autoplay={true}
          controls={false}
          loop={true}
          title="Background Music"
          className=""
        />
      </div>

      {/* Main horizontal scroll container */}
      <div className="h-[500vh]" ref={containerRef}>
        <div
          className="sticky top-0 h-screen w-[500vw] flex flex-row"
          style={{
            transform: `translateX(-${currentPage * 100}vw)`,
            transition: "transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
          }}
        >
          {videoIds.map((videoId, index) => (
            <VideoSection
              key={index}
              videoId={videoId}
              title={sectionTitles[index]}
              description={sectionDescriptions[index]}
              isActive={currentPage === index}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Navigation handlePrev={handlePrev} handleNext={handleNext} />

      {/* Scroll prompt - only visible on first page */}
      <ScrollPrompt visible={currentPage === 0} />

      {/* Vertical scroll page */}
      <VerticalPage 
        showVerticalPage={showVerticalPage} 
        setShowVerticalPage={setShowVerticalPage} 
        currentPage={currentPage} 
      />

      {/* Sound toggle */}
      <SoundToggle soundOn={soundOn} toggleSound={toggleSound} />
    </div>
  )
}
