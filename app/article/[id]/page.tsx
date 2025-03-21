import React from 'react';
import ArticleDetail from '../../content/components-content-article-detail';

// 模擬文章數據庫
const articles = [
  {
    id: 1,
    title: "Las Palmas Cafe Revolutionizes Los Angeles Brunch Scene",
    category: "Lifestyle",
    date: "May 28, 2023",
    content: "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people...",
    image: "https://images.unsplash.com/photo-1592035659284-3b39971c1107?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Lifestyle", "Food", "Travel"]
  },
  {
    id: 2,
    title: "The Sound Club | Our Latest Curated Vinyl Collections",
    category: "Music",
    date: "May 27, 2023",
    content: "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels. They never said winning was easy. Some people...",
    image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Music", "Art", "Culture"]
  },
  // 可以添加更多文章...
];

// 獲取相關文章（排除當前文章）
const getRelatedArticles = (currentId: number) => {
  return articles
    .filter(article => article.id !== currentId)
    .slice(0, 3)
    .map(article => ({
      id: article.id,
      title: article.title,
      image: article.image
    }));
};

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id);
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    return <div className="container mx-auto px-4 py-8">文章不存在</div>;
  }
  
  const relatedArticles = getRelatedArticles(articleId);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleDetail article={article} relatedArticles={relatedArticles} />
    </div>
  );
} 