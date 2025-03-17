// components/content/NewsArticle.tsx
import React from "react"

interface NewsArticleProps {
  article: {
    id: number
    title: string
    content: string[]
    images: string[]
    additional?: {
      title: string
      content: string[]
      images: string[]
    }
  }
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article }) => {
  return (
    <div className="max-h-[70vh] overflow-y-auto pr-4">
      <h3 className="text-3xl font-semibold mb-6 sticky top-0 bg-white pt-2 pb-2 z-10 text-[#555]">
        {article.title}
      </h3>
      
      <div className="space-y-8">
        {article.content.map((paragraph, idx) => (
          <React.Fragment key={`content-${idx}`}>
            <p className="text-lg text-[#333]">{paragraph}</p>
            {article.images[idx] && (
              <img 
                src={article.images[idx]} 
                alt={`${article.title} image ${idx+1}`} 
                className="w-full h-80 object-cover rounded-lg"
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Additional content section */}
      {article.additional && (
        <div className="mt-12">
          <h4 className="text-2xl font-semibold mb-4 text-[#555]">{article.additional.title}</h4>
          <div className="space-y-8">
            {article.additional.content.map((paragraph, idx) => (
              <React.Fragment key={`additional-${idx}`}>
                <p className="text-lg text-[#333]">{paragraph}</p>
                {article.additional.images[idx] && (
                  <img 
                    src={article.additional.images[idx]} 
                    alt={`Additional content image ${idx+1}`} 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsArticle
