const express = require('express');
const router = express.Router();
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  summarizeArticle,
} = require('../controllers/articleController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

// Public routes
router.route('/').get(protect, getArticles); // All logged-in users can see articles
router.route('/:id').get(protect, getArticleById);

// Protected routes
router.route('/').post(protect, createArticle);
router.route('/:id').put(protect, updateArticle); // Logic inside controller checks owner/admin
router.route('/:id/summarize').post(protect, summarizeArticle); // Owner/Admin can summarize

// Admin-only routes
router.route('/:id').delete(protect, isAdmin, deleteArticle);

module.exports = router;



