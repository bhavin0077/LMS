//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/course', requireAuth, (req, res) => res.render('course'));
app.use(authRoutes);

