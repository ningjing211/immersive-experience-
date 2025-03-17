// components/content/NewsContent.tsx
import React, { useState, useRef } from "react"
import { newsArticles } from "../../data/sectionData"
import NewsArticle from "./NewsArticle"

const NewsContent: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState(0)
  const topRef = useRef<HTMLDivElement | null>(null)
  const articleRefs = useRef<Array<HTMLDivElement | null>>([])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const setArticleRef = (el: HTMLDivElement | null, index: number) => {
    if (articleRefs.current) {
      articleRefs.current[index] = el
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8" ref={topRef}>
        {/* Article selector - Displayed as a list */}
        <div className="space-y-6">
          {newsArticles.map((article, index) => (
            <div key={index}>
              <button 
                className={`block text-2xl font-light tracking-wider transition-colors ${selectedArticle === index ? 'text-black' : 'text-black/50'}`}
                style={{ fontFamily: "'Alice', serif" }}
                onClick={() => setSelectedArticle(index)}
              >
                {article.title.split(' - ')[0].toLowerCase()}
              </button>
            </div>
          ))}
        </div>
        
        {/* Article content */}
        <div className="md:col-span-3">
          {newsArticles.map((article, index) => (
            <div 
              key={index}
              className={selectedArticle === index ? 'block' : 'hidden'} 
              ref={(el) => setArticleRef(el as HTMLDivElement, index)}
            >
              <NewsArticle article={article} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Back to top button */}
      <div className="flex justify-center mt-16">
        <button 
          onClick={scrollToTop}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          回到頂部
        </button>
      </div>
    </>
  )
}

export default NewsContent
