import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ArticleItem({ article, onDelete }) {
  const { user } = useAuth();

  // Check if the current user can edit or delete
  // Role-Aware UI: Must be admin OR the creator of the article
  const canModify = user && (user.role === 'admin' || user.id === article.createdBy._id);
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold mb-2">
        <Link to={`/articles/${article._id}`} className="text-blue-600 hover:underline">
          {article.title}
        </Link>
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        {/* Check if createdBy is populated, otherwise show ID */}
        By: {article.createdBy?.name || 'Unknown User'}
      </p>
      
      {article.summary && (
        <blockquote className="border-l-4 border-gray-200 pl-4 my-2 italic text-gray-700">
          {article.summary.substring(0, 150)}...
        </blockquote>
      )}

      <div className="mt-2 mb-2">
        {article.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm mr-2">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Role-Aware UI: Show buttons based on permissions */}
      <div className="mt-4 flex space-x-2">
        {canModify && (
          <Link
            to={`/articles/edit/${article._id}`}
            className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Edit
          </Link>
        )}
        {isAdmin && (
          <button
            onClick={() => onDelete(article._id)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete (Admin)
          </button>
        )}
      </div>
    </div>
  );
}

export default ArticleItem;