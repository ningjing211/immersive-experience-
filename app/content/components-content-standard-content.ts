// components/content/StandardContent.tsx
import React from "react"

interface StandardContentProps {
  content: {
    title: string
    subtitle: string
    keywords: string[]
    services: string[]
    description: string
  }
}

const StandardContent: React.FC<StandardContentProps> = ({ content }) => {
  return (
    <div className="flex flex-wrap">
      {/* Left content area - Keywords and Services */}
      <div className="w-full md:w-2/5 mb-8 md:mb-0 pr-0 md:pr-8">
        <div className="text-black text-3xl font-bold mb-8">
          <p>
            {content.keywords.map((keyword, i) => (
              <span key={i}>
                {keyword}<br/>
              </span>
            ))}
          </p>
        </div>
        
        <div className="text-black text-lg">
          <p className="font-medium mb-4">OUR SERVICES</p>
          <p>
            {content.services.map((service, i) => (
              <span key={i}>
                {service}<br/>
              </span>
            ))}
          </p>
        </div>
      </div>
      
      {/* Right content area - Subtitle and Description */}
      <div className="w-full md:w-3/5">
        <div className="mb-8">
          <p className="text-black text-2xl font-medium mb-6">{content.subtitle}</p>
          
          <p className="text-black text-base leading-relaxed" style={{ width: 'calc(4/5 * 100%)' }}>
            {content.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StandardContent
