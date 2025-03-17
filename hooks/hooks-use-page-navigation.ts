// hooks/usePageNavigation.ts
import { useState, useEffect } from "react"

export function usePageNavigation(maxPages: number) {
  const [currentPage, setCurrentPage] = useState(0)

  // Navigation functions
  const updateActivePage = (index: number) => {
    setCurrentPage(index)

    // Scroll to appropriate position
    const scrollTarget = (index / maxPages) * (document.documentElement.scrollHeight - window.innerHeight)
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
    if (currentPage < maxPages - 1) {
      updateActivePage(currentPage + 1)
    }
  }

  // Keyboard navigation
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

  return {
    currentPage,
    setCurrentPage,
    updateActivePage,
    handlePrev,
    handleNext
  }
}
