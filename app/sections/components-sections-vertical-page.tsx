// components/sections/VerticalPage.tsx
import React, { useState, useRef, useEffect } from "react"
// import StandardContent from "../content/StandardContent"
// import NewsContent from "../content/NewsContent"
import { pageContents } from "../../data/data-section-data"
import Link from "next/link"

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
  // 添加主要分類狀態
  const [activeCategory, setActiveCategory] = useState("Science");
  
  // 定義主要分類
  const categories = ["Science", "Digital", "Design", "AI Tools"];

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

  // 修改 NewsContent 組件
  const NewsContent = () => {
    // 定義文章數據
    const blogPosts = [
      {
        id: 1,
        title: "Las Palmas Cafe Revolutionizes Los Angeles Brunch Scene",
        category: "Lifestyle",
        date: "May 28, 2023",
        snippet: "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people...",
        image: "https://images.unsplash.com/photo-1592035659284-3b39971c1107?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2,
        title: "The Sound Club | Our Latest Curated Vinyl Collections",
        category: "Music",
        date: "May 27, 2023",
        snippet: "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people...",
        image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 5,
        title: "The Great Revival of Dance & Song in South Greenwich",
        category: "Culture",
        date: "May 24, 2023",
        snippet: "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people...",
        image: "https://images.unsplash.com/photo-1614730020301-446462b8f138?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 6,
        title: "Create Botanical Bliss in Any Space",
        category: "Lifestyle",
        date: "May 23, 2023",
        snippet: "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people...",
        image: "https://images.unsplash.com/photo-1614727187331-285522b20eaf?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];

    // 熱門文章
    const popularPosts = blogPosts.slice(0, 5);

    // 處理滾動事件
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };

    return (
      <div className="main-content-wrapper overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }} onScroll={handleScroll}>
        {/* 頂部分類區域 */}
        <div className="cat-top section flex flex-wrap -mx-2 mb-8">
          <div className="w-1/3 px-2">
            <div className="widget-content relative overflow-hidden rounded-lg">
              <a href="#" className="block relative group">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                     className="w-full h-20 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold">Travel</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="w-1/3 px-2">
            <div className="widget-content relative overflow-hidden rounded-lg">
              <a href="#" className="block relative group">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                     className="w-full h-20 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold">Fashion</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="w-1/3 px-2">
            <div className="widget-content relative overflow-hidden rounded-lg">
              <a href="#" className="block relative group">
                <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                     className="w-full h-20 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold">Design</h2>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 內容包裝器 */}
        <div id="content-wrapper" className="flex">
          {/* 主要內容區域 */}
          <div id="post-wrapper" className="w-2/3 pr-8">
            <div className="post-container">
              <div className="indexposts clear grid grid-cols-2 gap-6">
                {blogPosts.map(post => (
                  <div key={post.id} className="post bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="post-image">
                      <a href="#">
                        <img 
                          className="thumb w-full h-44 object-cover" 
                          alt={post.title} 
                          src={post.image} 
                        />
                      </a>
                    </div>
                    <div className="embedd p-6">
                      <header className="post-header">
                        <div className="labelhome mb-3">
                          <a href="#" className="text-gray-700 text-sm font-medium bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                            {post.category}
                          </a>
                        </div>
                        <h2 className="entry-title text-xl font-bold mb-3">
                          <Link href={`/article/${post.id}`} className="text-gray-800 hover:text-blue-600 transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                      </header>
                      <div className="entry-content clear">
                        <div className="intro-text text-gray-600 text-sm line-clamp-3">
                          {post.snippet}
                        </div>
                        <div className="mt-3">
                          <Link href={`/article/${post.id}`} className="text-blue-600 text-sm font-medium hover:underline">
                            Read More
                          </Link>
                        </div>
                      </div>
                      <div className="cen clearfix mt-4">
                        <span className="post-da text-gray-500 text-xs">{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 分頁 */}
              <div className="blog-pager flex justify-center items-center mt-10 mb-10">
                <span className="showpageOf mr-4 text-gray-500">第 1 頁，共 8 頁</span>
                <span className="pagecurrent w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full">1</span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">2</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">3</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">4</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">5</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">6</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">7</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full ml-2">8</a>
                </span>
                <span className="displaypageNum">
                  <a href="#" className="nextprevious flex items-center justify-center text-gray-600 hover:text-gray-800 ml-4">下一頁</a>
                </span>
              </div>
            </div>
          </div>
          
          {/* 側邊欄 */}
          <div id="sidebar-wrapper" className="w-1/3">
            <div className="sidebar-container">
              {/* 熱門文章 */}
              <div className="widget mb-10">
                <h2 className="title text-xl font-bold pb-2 mb-4 border-b border-gray-200 text-[#333]">熱門文章</h2>
                <div className="widget-content">
                  <ul className="popular-posts space-y-4">
                    {popularPosts.map(post => (
                      <li key={post.id} className="flex">
                        <div className="item-thumbnail mr-3">
                          <a href="#">
                            <img 
                              src={`https://picsum.photos/200/200?random=${post.id}`} 
                              alt={post.title} 
                              className="w-20 h-20 object-cover rounded-md" 
                            />
                          </a>
                        </div>
                        <div className="item-title flex-1">
                          <a href="#" className="text-sm font-medium text-[#333] hover:text-blue-600 transition-colors">{post.title}</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* 分類 */}
              <div className="widget mb-10">
                <h2 className="title text-xl font-bold pb-2 mb-4 border-b border-gray-200 text-[#333]">分類</h2>
                <div className="widget-content">
                  <ul className="categories">
                    {['Lifestyle', 'Beauty', 'Travel', 'Fashion', 'Music', 'Art', 'Culture', 'Food'].map((category, index) => (
                      <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <a href="#" className="text-[#333] hover:text-blue-600 transition-colors">{category}</a>
                        <span className="text-[#333] text-sm">{Math.floor(Math.random() * 10) + 1}</span>
                      </li>
                    ))}
                  </ul>
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
