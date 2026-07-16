import express from 'express';
import Schedule from '../models/Schedule.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { courseId, instructorId, batchName, date } = req.body;

    if (!courseId || !instructorId || !batchName || !date) {
      return res.status(400).json({ error: 'Missing mandatory operational workflow payload coordinates' });
    }

  
    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

  
    const existingSchedule = await Schedule.findOne({
      instructor: instructorId,
      date: targetDate
    }).populate('instructor');

    if (existingSchedule) {
      return res.status(400).json({
        conflict: true,
        message: `Scheduling Blocked: Instructor "${existingSchedule.instructor.name}" is already booked on ${targetDate.toISOString().split('T')[0]}!`
      });
    }

  
    const newSchedule = new Schedule({
      course: courseId,
      instructor: instructorId,
      batchName,
      date: targetDate
    });

    await newSchedule.save();
    res.status(201).json({ message: 'Lecture allocated safely without conflict.', schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allSchedules = await Schedule.find({})
      .populate('course')
      .populate('instructor')
      .sort({ date: 1 });
    res.status(200).json(allSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/instructor/:instructorId', async (req, res) => {
  try {
    const { instructorId } = req.params;
    const instructorAgenda = await Schedule.find({ instructor: instructorId })
      .populate('course')
      .populate('instructor')
      .sort({ date: 1 });
    res.status(200).json(instructorAgenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;