import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import instructorRoutes from './routes/instructorRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

dotenv.config();

const app = express();
app.get('/api/test', (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});
// Standard middleware setup
app.use(cors());
app.use(express.json());

// Bind Database Connection routine
connectDB();

// Bind API Routing layers
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);

// Fallback Route handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint destination footprint requested does not exist' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Runtime Server Application] Running on interface port : ${PORT}`);
});