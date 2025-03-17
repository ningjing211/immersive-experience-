// components/sections/VerticalPage.tsx
import React, { useState, useRef, useEffect } from "react"
// import StandardContent from "../content/StandardContent"
// import NewsContent from "../content/NewsContent"
import { pageContents } from "../../data/data-section-data"

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
  // 創建一個簡單的內容組件來替代缺失的組件
  const StandardContent = () => (
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
  );

  // 創建一個簡單的新聞內容組件
  const NewsContent = () => {
    const [selectedArticle, setSelectedArticle] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayedArticle, setDisplayedArticle] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const articles = [
      {
        title: "Current - Latest updates and insights",
        content: [
          "保持最新資訊對於品牌成功至關重要。我們持續關注行業動態，分析市場趨勢，並分享有價值的見解，幫助客戶做出明智決策。我們的新聞和分析不僅提供信息，還提供實用的策略建議，使品牌能夠在競爭激烈的環境中脫穎而出。",
          "在有如太空艙般的冷調空間裡，填滿了襲自酸性設計的迷幻色系——才踏進去，便宛如身置星際異空間，沒錯，這就是此一世代最新穎的體驗，所有意想不到的神奇體驗，都將在此發生。"
        ],
        images: [
          "https://images.unsplash.com/photo-1614730020301-446462b8f138?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1614727187331-285522b20eaf?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
      },
      {
        title: "Second - Latest updates and insights",
        content: [
          "匯賦新創實現創新理念的線下實驗室。在這裡，每一杯奶昔的誕生，都承載著匯賦新創的核心技術與經營哲學。從 LINE CRM 系統, AI人工智慧點餐, 到 POS 系統，店內的一切運營細節，無不體現了匯賦新創在數位化與線下場景結合上的長遠期許。",
          "一個充滿溫度的線下空間。無論是參與設計的員工，還是作為股東的創意夥伴，他們共同將匯賦新創的創意注入到這家店裡，為顧客帶來更直觀的品牌體驗。"
        ],
        images: [
          "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
      },
      {
        title: "Third - Latest updates and insights",
        content: [
          "它的濃郁口感和色彩斑斕的配料，彷彿承載著美國20世紀中期的夢想與繁榮。它誕生於汽車旅館和路邊餐廳盛行的年代，象徵著一種自由流動的生活方式：跨越洲際的高速公路，霓虹燈閃爍下的加油站，以及疲憊旅人片刻的甜蜜享受。"
        ],
        images: [
          "https://images.unsplash.com/photo-1558158539-226f4a45f7b3?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
      },
      {
        title: "Fourth - Latest updates and insights",
        content: [
          "數位轉型已成為企業不可避免的趨勢。在這個快速變化的時代，品牌必須不斷適應新技術和消費者行為的變化。我們的專家團隊密切關注這些變化，提供前瞻性的見解和建議，幫助品牌在數位時代保持競爭力。",
          "社交媒體平台的演算法不斷變化，影響著品牌的曝光度和用戶參與度。了解這些變化並相應調整策略至關重要。我們的團隊提供最新的社交媒體趨勢分析和最佳實踐建議，幫助品牌在各平台上取得最大的影響力。"
        ],
        images: [
          "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
      }
    ];

    // 處理文章切換的平滑過渡
    const handleArticleChange = (index: number) => {
      if (index === selectedArticle) return;
      
      setIsTransitioning(true);
      
      // 設置延遲以允許淡出動畫完成
      setTimeout(() => {
        setSelectedArticle(index);
        setDisplayedArticle(index);
        
        // 淡入新內容
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
        
        // 滾動到頂部
        if (contentRef.current) {
          contentRef.current.scrollTop = 0;
        }
      }, 400); // 淡出動畫持續時間增加
    };

    // 處理滾動事件
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };

    return (
      <div className="flex h-full">
        {/* 左側 Breadcrumbs 導航 */}
        <div className="w-1/5 pr-8 pt-4">
          <div className="flex flex-col space-y-6">
            {articles.map((article, index) => (
              <button
                key={index}
                className={`text-left text-xl font-medium transition-colors ${
                  selectedArticle === index ? 'text-black' : 'text-gray-400'
                }`}
                style={{ fontFamily: "'Alice', serif" }}
                onClick={() => handleArticleChange(index)}
              >
                {article.title.split(' - ')[0].charAt(0).toUpperCase() + article.title.split(' - ')[0].slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 右側文章內容區域 */}
        <div className="w-4/5">
          <div 
            ref={contentRef}
            className="overflow-y-auto pr-4"
            style={{ 
              height: 'calc(100vh - 200px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
            onScroll={handleScroll}
          >
            <div 
              className="space-y-12 transition-all duration-500 ease-in-out"
              style={{ 
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateX(20px)' : 'translateX(0)',
                filter: `blur(${isTransitioning ? '3px' : '0'})`
              }}
            >
              <div className="max-w-4xl">
                <h3 className="text-3xl font-semibold mb-6 text-black">
                  {articles[displayedArticle].title}
                </h3>
                <div className="space-y-8">
                  {articles[displayedArticle].content.map((paragraph, idx) => (
                    <React.Fragment key={`content-${idx}`}>
                      <p className="text-lg text-[#333]">{paragraph}</p>
                      {articles[displayedArticle].images[idx] && (
                        <img 
                          src={articles[displayedArticle].images[idx]} 
                          alt={`Article image ${idx+1}`} 
                          className="w-full h-auto aspect-video object-cover rounded-lg"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                {/* 添加更多內容以確保有足夠的內容可滾動 */}
                <div className="mt-16 pb-32">
                  <h4 className="text-2xl font-semibold mb-4 text-[#555]">更多相關內容</h4>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <React.Fragment key={i}>
                        <p className="text-lg text-[#333]">
                          數位轉型已成為企業不可避免的趨勢。在這個快速變化的時代，品牌必須不斷適應新技術和消費者行為的變化。我們的專家團隊密切關注這些變化，提供前瞻性的見解和建議，幫助品牌在數位時代保持競爭力。
                        </p>
                        <p className="text-lg text-[#333]">
                          社交媒體平台的演算法不斷變化，影響著品牌的曝光度和用戶參與度。了解這些變化並相應調整策略至關重要。我們的團隊提供最新的社交媒體趨勢分析和最佳實踐建議，幫助品牌在各平台上取得最大的影響力。
                        </p>
                        <img 
                          src={i === 1 ? "https://images.unsplash.com/photo-1592035659284-3b39971c1107?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : 
                               i === 2 ? "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : 
                               "https://images.unsplash.com/photo-1522124624696-7ea32eb9592c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                          alt={`Additional content image ${i}`} 
                          className="w-full h-auto aspect-video object-cover rounded-lg"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 當垂直頁面顯示時，控制 body 滾動
  useEffect(() => {
    if (showVerticalPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showVerticalPage]);

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-start justify-start"
      style={{
        transform: `translateY(${showVerticalPage ? '0' : '100%'})`,
        transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.6s ease-in-out',
        opacity: showVerticalPage ? 1 : 0,
        pointerEvents: showVerticalPage ? 'auto' : 'none'
      }}
    >
      <div 
        className={`${currentPage === 4 ? 'w-full h-full mt-0' : 'w-[90%] h-[90%] mt-[10%]'} ml-0 ${currentPage === 4 ? 'bg-[#f4f4f4]' : 'bg-white'} relative rounded-r-lg shadow-2xl flex flex-col`}
      >
        <div className="p-16 flex-grow flex flex-col overflow-hidden">
          <h1 className="text-6xl font-bold text-black mb-8 flex-shrink-0">{pageContents[currentPage].title}</h1>
          
          {/* 根據當前頁面顯示不同內容 */}
          <div className="flex-grow overflow-hidden">
            {currentPage === 4 ? <NewsContent /> : <StandardContent />}
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
  )
}

export default VerticalPage
