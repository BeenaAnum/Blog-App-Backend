import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import uploadRoutes from './routes/upload.js';

const app = express();

// Database Connection
connectDB();

// CORS Configuration - CRITICAL FIX
const allowedOrigins = [
  'https://blog-app-frontend-drab.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 86400 // 24 hours
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...', cors: 'enabled' });
});

// Test CORS route
app.get('/api/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!', origin: req.headers.origin });
});

// Remove app.listen() - NOT needed for Vercel
// export the app for Vercel serverless functions
export default app;


// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import postRoutes from './routes/post.js';
// import uploadRoutes from './routes/upload.js';

// const app = express();

// // Database Connection
// connectDB();

// // CORS Configuration
// app.use(cors({
//   origin: [process.env.FRONTEND_URL,'http://localhost:5173'],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/upload', uploadRoutes);

// // Root route
// app.get('/', (req, res) => res.send('API is running...'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
