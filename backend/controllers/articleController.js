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
      createdBy: req.user._id,
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    console.error('Error creating article:', error.message);
    next(error);
  }
};

// @desc    Get all articles (Admin sees all, user sees own)
exports.getArticles = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role !== 'admin') {
      query = { createdBy: req.user._id };
    }

    const articles = await Article.find(query).populate('createdBy', 'name email');
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    next(error);
  }
};

// @desc    Get single article
// @route   GET /articles/:id
exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.user.role !== 'admin' && article.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this article' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error fetching article by ID:', error.message);
    next(error);
  }
};

// @desc    Update article
// @route   PUT /articles/:id
exports.updateArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.user.role !== 'admin' && article.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to edit this article' });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error.message);
    next(error);
  }
};

// @desc    Delete article (Admin only)
// @route   DELETE /articles/:id
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.deleteOne();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error.message);
    next(error);
  }
};

// @desc    Summarize article
// @route   POST /articles/:id/summarize
exports.summarizeArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.user.role !== 'admin' && article.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to summarize this article' });
    }

    const provider = process.env.LLM_PROVIDER || 'gemini';
    const summary = await summarizeWithLLM(article.content, provider);

    article.summary = summary;
    const updatedArticle = await article.save();

    res.json(updatedArticle);
  } catch (error) {
    console.error('Error summarizing article:', error.message);
    next(error);
  }
};
