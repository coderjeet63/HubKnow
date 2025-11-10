import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await api.get(`/articles/${id}`);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article', error);
        navigate('/'); // Go home if article not found
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id, navigate]);

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      // Call the backend summarize endpoint
      const { data } = await api.post(`/articles/${id}/summarize`);
      // Update the article state with the new summary from the response
      setArticle(data); 
    } catch (error) {
      console.error('Failed to summarize article', error);
      alert('Error summarizing article. See console for details.');
    }
    setSummarizing(false);
  };

  if (loading) return <Loader />;
  if (!article) return <div>Article not found.</div>;

  return (
    <div className="article-view bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="article-meta text-gray-500 mb-4">
        <p>Tags: {article.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm mr-2">
            {tag}
          </span>
        ))}</p>
      </div>
      
      <hr className="my-4" />

      {/* Summary Section */}
      <div className="summary-section bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
        <button
          onClick={handleSummarize}
          disabled={summarizing}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {summarizing ? 'Generating...' : (article.summary ? '🤖 Regenerate Summary' : '🤖 Generate Summary')}
        </button>
        {article.summary ? (
          <blockquote className="summary-content mt-4 border-l-4 border-blue-500 pl-4 italic text-gray-800">
            {article.summary}
          </blockquote>
        ) : (
          <p className="mt-4 text-gray-600">No summary. Click the button to generate one.</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Full Content Section */}
      <div className="article-content">
        <h3 className="text-2xl font-semibold mb-2">Full Content</h3>
        {/* Using <pre> to respect whitespace and newlines in the content */}
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-gray-800 font-sans">
          {article.content}
        </pre> 
      </div>
    </div>
  );
}

export default ArticlePage;