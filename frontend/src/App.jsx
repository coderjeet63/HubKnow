import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ArticlePage from './pages/ArticlePage';
import EditArticle from './pages/EditArticle'; // Page for New/Edit
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/useAuth';
import Loader from './components/Loader';

function App() {
  const { loading } = useAuth();

  // Show a global loader while auth state is being determined
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-container">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Direct (Unprotected) Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/articles/new" element={<EditArticle />} />
          <Route path="/articles/edit/:id" element={<EditArticle />} />

          {/* Fallback route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
