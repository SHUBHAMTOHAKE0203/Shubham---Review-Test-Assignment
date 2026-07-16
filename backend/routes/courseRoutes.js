import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to extract courses records index' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    if (!name || !level || !description || !image) {
      return res.status(400).json({ error: 'All primary course validation fields are structural requirements' });
    }
    const course = new Course({ name, level, description, image });
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;