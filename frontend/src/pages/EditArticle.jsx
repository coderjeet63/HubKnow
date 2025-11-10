import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

function EditArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Store as comma-separated string for editing
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false); // For fetching data
  const [error, setError] = useState('');
  
  const { id } = useParams(); // Check if we are editing (id will exist)
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    // If we are in "edit" mode, fetch the article data
    if (isEditing) {
      setPageLoading(true);
      const fetchArticle = async () => {
        try {
          const { data } = await api.get(`/articles/${id}`);
          setTitle(data.title);
          setContent(data.content);
          setTags(data.tags.join(', ')); // Convert array to comma-separated string
        } catch (err) {
          console.error("Failed to load article", err);
          setError('Failed to load article');
        }
        setPageLoading(false);
      };
      fetchArticle();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const articleData = {
      title,
      content,
      // Convert comma-separated string back to an array,
      // trimming whitespace and removing empty strings
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), 
    };

    try {
      let response;
      if (isEditing) {
        // Update existing article
        response = await api.put(`/articles/${id}`, articleData);
      } else {
        // Create new article
        response = await api.post('/articles', articleData);
      }
      navigate(`/articles/${response.data._id}`); // Redirect to the new/updated article
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save article');
      setLoading(false);
    }
  };

  if (pageLoading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Article' : 'Create New Article'}
      </h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="15"
            className="w-full px-3 py-2 border rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="tags">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, nodejs, ai"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Article' : 'Create Article')}
        </button>
      </form>
    </div>
  );
}

export default EditArticle;