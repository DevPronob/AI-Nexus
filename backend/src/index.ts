import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-nexus';

// Attempt connection but don't block server startup
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Database connection error (IP whitelist?):', err.message);
    console.log('Server will run with mock data fallback.');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
