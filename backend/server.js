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

app.use(cors());
app.use(express.json());


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});


app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint destination footprint requested does not exist' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Runtime Server Application] Running on interface port : ${PORT}`);
});