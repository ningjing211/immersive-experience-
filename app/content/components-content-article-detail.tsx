import React from "react";
import Link from "next/link";

interface ArticleDetailProps {
  article: {
    id: number;
    title: string;
    category: string;
    date: string;
    content: string;
    image: string;
    tags?: string[];
  };
  relatedArticles?: Array<{
    id: number;
    title: string;
    image: string;
  }>;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, relatedArticles = [] }) => {
  // 模擬文章內容段落 - 刪除了您指定的段落
  const paragraphs = [
    "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people can't handle success, I can. Look at the sunset, life is amazing, life is beautiful, life is what you make it. Life is what you make it, so let's make it.",
    "They never said winning was easy. Some people can't handle success, I can. You see the hedges, how I got it shaped up? It's important to shape up your hedges, it's like getting a haircut, stay fresh. I told you all this before, when you have a swimming pool, do not use chlorine, use salt water, the healing, salt water is the healing. Look at the sunset, life is amazing, life is beautiful, life is what you make it. Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast, so we are going to enjoy our breakfast.",
    "Give thanks to the most high. You do know, you do know that they don't want you to have lunch. I'm keeping it real with you, so what you going do is have lunch. Another one.",
    "Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast. It took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started. The other day the grass was brown, now it's green because I ain't give up. Never surrender."
  ];

  // 模擬引用
  const quote = {
    text: "Doing the best at this moment puts you in the best place for the next moment! They never said winning was easy.",
    author: "Oprah Winfrey"
  };

  return (
    <div id="content-wrapper" className="flex">
      <div id="post-wrapper" className="w-2/3 pr-8">
        <div className="post-container">
          <div className="post bg-white rounded-lg overflow-hidden shadow-md">
            {/* 文章頭部 */}
            <div className="post-header p-6 pb-0">
              <div className="labelhome mb-3">
                <a href="#" className="text-gray-700 text-sm font-medium bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                  {article.category}
                </a>
              </div>
              <h1 className="entry-title text-3xl font-bold mb-4 text-gray-800">
                {article.title}
              </h1>
              <div className="post-info mb-6 text-gray-500 text-sm">
                <span className="time-info">
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {article.date}
                  </a>
                </span>
              </div>
            </div>

            {/* 文章內容 */}
            <div className="post-entry px-6">
              {/* 主圖 */}
              <div className="mb-6">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* 文章段落 */}
              <div className="space-y-6 text-[#333] leading-relaxed">
                {paragraphs.slice(0, 2).map((paragraph, idx) => (
                  <p key={idx} className="text-lg">{paragraph}</p>
                ))}

                {/* 引用 */}
                <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-6 italic text-gray-700">
                  <p>{quote.text}</p>
                  <cite className="block mt-2 text-sm font-medium not-italic">— {quote.author}</cite>
                </blockquote>

                {paragraphs.slice(2).map((paragraph, idx) => (
                  <p key={idx + 2} className="text-lg">{paragraph}</p>
                ))}
              </div>

              {/* 標籤 */}
              <div className="labelhome1 clearfix mt-8 mb-6">
                {article.tags?.map((tag, idx) => (
                  <a key={idx} href="#" className="text-gray-700 text-sm bg-gray-100 px-3 py-1 rounded-md mr-2 mb-2 inline-block hover:bg-gray-200 transition-colors">
                    {tag}
                  </a>
                ))}
              </div>

              {/* 社交分享 */}
              <div className="social-buttons mb-8">
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors">
                    <i className="fa fa-pinterest"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
                    <i className="fa fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* 上一篇/下一篇 */}
            <div className="odd-pager border-t border-gray-200">
              <ul className="flex justify-between p-6">
                <li className="w-1/2 pr-2">
                  <a href="#" className="flex items-center group">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdiGU0xWr7ctBZVR5v9LD-m4V18CvVVs0Hyt2uq6Mt795M1SRoV0EkjLhAWXKj1IfGvuUurImd1pi4WfCJMuPH4OztadjwkVtICTKA-LMgt-zKxmUMB5qFckaNFQbHInGQp7DNlyXnxUHh/s180/room.jpg" 
                         className="w-20 h-20 object-cover rounded-md mr-3" />
                    <div>
                      <strong className="block text-gray-500 text-sm mb-1">Previous</strong>
                      <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">Urban Hike: A Journalist's Closer Look into Walkability in The Big City</span>
                    </div>
                  </a>
                </li>
                <li className="w-1/2 pl-2 text-right">
                  <a href="#" className="flex items-center justify-end group">
                    <div>
                      <strong className="block text-gray-500 text-sm mb-1">Next</strong>
                      <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">Unruly & Unplugged: Corazon's Sophomore Album Release Party</span>
                    </div>
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEinZ2ONj_BPqSXIeI43Vl49Csq6KL7Nu6GjRUeSAC2TjXlqYr6nekVubnBTlzMct2bgaiRtP8RWVZb4-QtZ1PQWuWNdXOMKt_jw_yIT4HqbOH_Zi416hBrAUdybPKwvpXcleB-75i8X0KLI/s180/man.jpg" 
                         className="w-20 h-20 object-cover rounded-md ml-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* 相關文章 */}
            <div className="related-posts p-6 border-t border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-[#333]">Related Articles</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* 預設的相關文章 */}
                <div className="related-post">
                  <a href="#" className="block group">
                    <div className="mb-3">
                      <img 
                        src="https://picsum.photos/400/300?random=101" 
                        alt="Seen in Manhattan | Our Summer Street Style Picks" 
                        className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-[#333] group-hover:text-blue-600 transition-colors">
                      Seen in Manhattan | Our Summer Street Style Picks
                    </h3>
                  </a>
                </div>
                <div className="related-post">
                  <a href="#" className="block group">
                    <div className="mb-3">
                      <img 
                        src="https://picsum.photos/400/300?random=102" 
                        alt="Plantation over sexy girl" 
                        className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-[#333] group-hover:text-blue-600 transition-colors">
                      Plantation over sexy girl
                    </h3>
                  </a>
                </div>
                <div className="related-post">
                  <a href="#" className="block group">
                    <div className="mb-3">
                      <img 
                        src="https://picsum.photos/400/300?random=103" 
                        alt="Party all night" 
                        className="w-full h-32 object-cover rounded-md group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-[#333] group-hover:text-blue-600 transition-colors">
                      Party all night
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 側邊欄 */}
      <div id="sidebar-wrapper" className="w-1/3">
        <div className="sidebar-container">
          {/* 關於我 */}
          <div className="widget mb-10">
            <h2 className="title text-xl font-bold pb-2 mb-4 border-b border-gray-200 text-[#333]">Author</h2>
            <div className="widget-content">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhj1IJ-Ye479-qyMk3TKwCHC_m4rnul0uyRqGKUW3Gl6Vc99sgTwPzTyMW46pGtudJ5xpfr8kOaifvy7VdtUAys7ohH_kqkQw47vPPxC3xqqpCqYeDqbElExAHulCCOSmEvNjjatF4UY2sL/s1600/about2-1.jpg" 
                className="w-full h-auto mb-4 rounded-md"
              />
              <div className="author-sign flex justify-center mb-3">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNwOO5Af2dwIbXjhPJPsNKsiegWkOLzq578uyAAg58WMH6AYJ3tXB7HL-CDTUG7LF2CrFjnrzX9HLKmYWw9FG07iTEOLbw_PZ9bbZyVLGnCU_X_byILH5vpTm_wMpypw45BXAOGN8W0Wnk/s1600/almondita+%25282%2529.png" 
                     className="h-12" />
              </div>
              <div className="author-text text-center text-gray-700 italic">
                I could look back at my life and get a good story out of it. It's a picture of somebody trying to figure things out.
              </div>
            </div>
          </div>
          
          {/* 熱門文章 */}
          <div className="widget mb-10">
            <h2 className="title text-xl font-bold pb-2 mb-4 border-b border-gray-200 text-[#333]">熱門文章</h2>
            <div className="widget-content">
              <ul className="popular-posts space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex">
                    <div className="item-thumbnail mr-3">
                      <a href="#">
                        <img 
                          src={`https://picsum.photos/200/200?random=${i+10}`} 
                          alt={`Popular post ${i}`} 
                          className="w-20 h-20 object-cover rounded-md" 
                        />
                      </a>
                    </div>
                    <div className="item-title flex-1">
                      <a href="#" className="text-sm font-medium text-[#333] hover:text-blue-600 transition-colors">
                        {i === 1 ? "The Great Revival of Dance & Song in South Greenwich" :
                         i === 2 ? "Incredible Graffiti Art Spotted in East Village" :
                         i === 3 ? "Do NYC like a Local: Our Favorite Airbnb's on a Budget" :
                         i === 4 ? "The Sound Club | Our Latest Curated Vinyl Collections" :
                         "Las Palmas Cafe Revolutionizes Los Angeles Brunch Scene"}
                      </a>
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
          
          {/* 廣告 */}
          <div className="widget mb-10">
            <h2 className="title text-xl font-bold pb-2 mb-4 border-b border-gray-200 text-[#333]">Advertisement</h2>
            <div className="widget-content">
              <a href="#">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBXJBYllMoTEJ58DQo-qFCjieFWe0uDYzuJbiCWKDNTnowMZ6vjOs8MKleT-uuU7JWXnEUrgMUBETw17WHxuEcH0CFhWNOGMI8BOXgtrwzHq2mJe0J8Qdp6Ao4Kq4p7lPrHbraovvjFTky/s1600/promo-6.jpg" 
                  className="w-full h-auto rounded-md"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail; 