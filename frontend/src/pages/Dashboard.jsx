import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ArticleItem from '../components/ArticleItem';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth(); // Get user info from context

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get('/articles');
        setArticles(data);
        setFilteredArticles(data); // Initially, show all
      } catch (error) {
        console.error('Failed to fetch articles', error);
      }
      setLoading(false);
    };
    if(user) {
        fetchArticles();
    }
  }, [user]);

  // Handle search filtering
  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm, articles]);

  const handleDelete = async (id) => {
    // Using window.confirm() here, but a custom modal is better
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.delete(`/articles/${id}`);
        // Remove from both lists to update UI immediately
        setArticles(articles.filter((a) => a._id !== id));
        setFilteredArticles(filteredArticles.filter((a) => a._id !== id));
      } catch (error) {
        console.error('Failed to delete article', error);
        alert('Failed to delete. See console.');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      {/* Search/Filter bar */}
      <input
        type="text"
        placeholder="Search articles by title, content, or tag..."
        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Article List */}
      <div className="article-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleItem
              key={article._id}
              article={article}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-600">No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;