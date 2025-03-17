// components/layout/Navigation.tsx
import React from "react"

interface NavigationProps {
  handlePrev: () => void
  handleNext: () => void
}

const Navigation: React.FC<NavigationProps> = ({ handlePrev, handleNext }) => {
  return (
    <>
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
    </>
  )
}

export default Navigation
