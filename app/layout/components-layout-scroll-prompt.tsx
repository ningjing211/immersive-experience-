// components/layout/ScrollPrompt.tsx
import React from "react"

interface ScrollPromptProps {
  visible: boolean
}

const ScrollPrompt: React.FC<ScrollPromptProps> = ({ visible }) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2.5 z-50 text-xs font-light tracking-wider lowercase opacity-80 transition-opacity duration-500 ${visible ? "opacity-80" : "opacity-0"}`}
    >
      <span>Scroll to explore</span>
      <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center relative backdrop-blur-sm">
        <div className="w-1 h-1 bg-white rounded-full animate-[scrollAnim_2s_infinite]"></div>
      </div>
      
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

export default ScrollPrompt
