require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");



const articleRoutes = require('./routes/articleRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(helmet());
// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
      ];

      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet AFTER cors
app.use(helmet());

app.use(morgan("dev"));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));
app.use(compression());app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
app.use(compression());


// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Children of Capital Backend API is running.' });
});

// Mounting API Routes (supporting both /route and /api/route for flexibility)
app.use('/articles', articleRoutes);
app.use('/api/articles', articleRoutes);

app.use('/newsletter', newsletterRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use('/contact', contactRoutes);
app.use('/api/contact', contactRoutes);

app.use('/submit-article', submissionRoutes);
app.use('/api/submit-article', submissionRoutes);

app.use('/upload', uploadRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Handler
app.use((req, res, _next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central Error Handler
app.use((err, req, res, _next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    success: false,
message:
  process.env.NODE_ENV === "production"
    ? "Internal Server Error"
    : err.message  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
