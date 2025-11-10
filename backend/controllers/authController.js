const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // You will need to add this

// Helper to generate token
const generateToken = (id, email, role) => { // Added email/role for better tokens
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /auth/register
exports.registerUser = async (req, res, next) => { // Added 'next' for error handling
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists'); // Throw error
    }
    
    const role = req.body.role || 'user'; 
    const user = await User.create({ name, email, password, role });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data'); // Throw error
    }
  } catch (error) {
    next(error); // Pass error to the errorHandler
  }
};

// @desc    Auth user & get token
// @route   POST /auth/login
exports.loginUser = async (req, res, next) => { // Added 'next' for error handling
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password'); // Throw error
    }
  } catch (error) {
    next(error); // Pass error to the errorHandler
  }
};