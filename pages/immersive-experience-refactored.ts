"use client"

import { useEffect, useRef, useState } from "react"
import Header from "../components/layout/Header"
import Menu from "../components/layout/Menu"
import Navigation from "../components/layout/Navigation"
import ScrollPrompt from "../components/layout/ScrollPrompt"
import SoundToggle from "../components/layout/SoundToggle"
import VideoSection from "../components/sections/VideoSection"
import VerticalPage from "../components/sections/VerticalPage"
import YouTubePlayer from "../components/common/YouTubePlayer"
import { usePageNavigation } from "../hooks/usePageNavigation"
import { useSound } from "../hooks/useSound"
import GlobalStyles from "../styles/globalStyles"
import { videoIds, sectionTitles, sectionDescriptions } from "../data/sectionData"

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
      // Prevent default scroll behavior
      e.preventDefault()
      
      // Detect scroll direction
      if (e.deltaY > 0) {
        // Scroll down, show vertical page
        setShowVerticalPage(true)
      } else if (e.deltaY < 0) {
        // Scroll up, hide vertical page
        setShowVerticalPage(false)
      }
    }

    // Use wheel event instead of scroll event
    window.addEventListener("wheel", handleScroll, { passive: false })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [])

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
