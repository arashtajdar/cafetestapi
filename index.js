import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for frontend integration
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Main entry welcome endpoint (unprotected for health check)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Cafe Finder API',
    status: 'Healthy',
    documentation: 'c:\\Projects\\cafeTestApi\\implementation-plan.md'
  });
});

// Register all API routes under /api
app.use('/api', apiRouter);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Global error caught:', err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start the server
app.listen(port, () => {
  console.log(`Cafe Finder Backend is running on port ${port}`);
  console.log(`Auth Configured: User: ${process.env.BASIC_AUTH_USER || 'Not Set'}`);
});
