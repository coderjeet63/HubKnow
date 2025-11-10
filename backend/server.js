const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import cors
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const authRoutes = require('./routes/authRoutes.js');
const articleRoutes = require('./routes/articleRoutes.js');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// ✅ Enable CORS for frontend (React)
app.use(
  cors()
);

// ✅ Middleware to parse JSON
app.use(express.json());

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
