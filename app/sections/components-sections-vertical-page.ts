// components/sections/VerticalPage.tsx
import React from "react"
import StandardContent from "../content/StandardContent"
import NewsContent from "../content/NewsContent"
import { pageContents } from "../../data/sectionData"

interface VerticalPageProps {
  showVerticalPage: boolean
  setShowVerticalPage: (show: boolean) => void
  currentPage: number
}

const VerticalPage: React.FC<VerticalPageProps> = ({
  showVerticalPage,
  setShowVerticalPage,
  currentPage
}) => {
  return (
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
          
          {/* Show news content for the News page */}
          {currentPage === 4 ? (
            <NewsContent />
          ) : (
            <StandardContent content={pageContents[currentPage]} />
          )}
        </div>
        
        {/* Close button */}
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
  )
}

export default VerticalPage
