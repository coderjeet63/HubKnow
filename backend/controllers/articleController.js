const Article = require('../models/articleModel.js');
const { summarizeWithLLM } = require('../services/llmService.js');

// @desc    Create new article
// @route   POST /articles
exports.createArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const article = new Article({
      title,
      content,
      tags: tags || [],
      createdBy: req.user._id, // req.user is from 'protect' middleware
    });
    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    next(error);
  }
};

// @desc    Get articles (All for Admin, Own for User)
// @route   GET /articles
exports.getArticles = async (req, res, next) => {
  try {
    let query = {};

    // --- THIS IS THE LOGIC YOU WANT ---
    if (req.user.role !== 'admin') {
      // If user is NOT an admin, only find articles they created
      query = { createdBy: req.user._id };
    }
    // If user IS an admin, query remains {} (empty), finding all articles.
    // --- END OF LOGIC ---

    const articles = await Article.find(query).populate('createdBy', 'name email');
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single article
// @route   GET /articles/:id
exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      // --- THIS IS THE LOGIC YOU WANT ---
      // Check if the user is the creator OR an admin
      if (req.user.role !== 'admin' && article.createdBy.toString() !== req.user._id.toString()) {
        res.status(403); // Forbidden
        throw new Error('Not authorized to view this article');
      }
      // --- END OF LOGIC ---
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
     // This catches errors like invalid ObjectId
    next(error);
  }
};

// @desc    Update an article
// @route   PUT /articles/:id
exports.updateArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    // --- THIS IS THE LOGIC YOU WANT ---
    // Check permission: Must be owner OR admin
    if (req.user.role !== 'admin' && article.createdBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('User not authorized to edit this article');
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an article (Admin only)
// @route   DELETE /articles/:id
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      // NOTE: The route 'articleRoutes.js' already uses 'isAdmin' middleware,
      // so only admins can even reach this function. No extra check needed.
      await article.deleteOne(); // or article.deleteOne()
      res.json({ message: 'Article removed' });
    } else {
      res.status(404);
      throw new Error('Article not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Summarize article content
// @route   POST /articles/:id/summarize
exports.summarizeArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // --- THIS IS THE LOGIC YOU WANT ---
    // Check permission: Must be owner OR admin
    if (req.user.role !== 'admin' && article.createdBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('User not authorized to summarize this article');
    }

    // Use the LLM_PROVIDER from .env or default to 'gemini'
    const provider = process.env.LLM_PROVIDER || 'gemini';
    const summary = await summarizeWithLLM(article.content, provider);
    
    article.summary = summary;
    const updatedArticle = await article.save();
    
    res.json(updatedArticle);
  } catch (error) {
    // The llmService will console.error the specific Gemini error
    next(error); // Pass to general error handler
  }
};