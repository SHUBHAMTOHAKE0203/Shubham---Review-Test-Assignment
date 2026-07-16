import express from 'express';
import Instructor from '../models/Instructor.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find({});
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error fetching instructors dataset' });
  }
});


router.post('/seed', async (req, res) => {
  try {
    await Instructor.deleteMany({});
    const sampleInstructors = [
      { name: 'Shubham Tohake', email: 'shubham@gmail.com' },
      { name: 'Akansha Chaudhary', email: 'akansha@gmail.com' },
      { name: 'Farhana Bhatt', email: 'farhana@gmail.com' },
     
    ];
    const createdInstructors = await Instructor.insertMany(sampleInstructors);
    res.status(201).json({ message: 'Database seeded with sample instructors', createdInstructors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;