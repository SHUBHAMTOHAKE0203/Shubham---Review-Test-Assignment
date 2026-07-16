import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_API = '/api';

export default function AdminPanel() {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  
  
  const [alertInfo, setAlertInfo] = useState({ text: '', isError: false });

  
  const [courseInput, setCourseInput] = useState({ name: '', level: 'Beginner', description: '', image: '' });
  const [scheduleInput, setScheduleInput] = useState({ courseId: '', instructorId: '', batchName: '', date: '' });

  useEffect(() => {
    loadSystemContext();
  }, []);

  const loadSystemContext = async () => {
    try {
      const [insRes, courseRes, schedRes] = await Promise.all([
        axios.get(`${BASE_API}/instructors`),
        axios.get(`${BASE_API}/courses`),
        axios.get(`${BASE_API}/schedules`)
      ]);
      setInstructors(insRes.data);
      setCourses(courseRes.data);
      setSchedules(schedRes.data);
    } catch (err) {
      triggerAlert('Failed to load data. Please try again.', true);
    }
  };

  const triggerAlert = (text, isError = false) => {
    setAlertInfo({ text, isError });
    setTimeout(() => setAlertInfo({ text: '', isError: false }), 6000);
  };

  const runInstructorSeed = async () => {
    try {
      const res = await axios.post(`${BASE_API}/instructors/seed`);
      triggerAlert(res.data.message, false);
      loadSystemContext();
    } catch (err) {
      triggerAlert('Something went wrong while adding sample instructors.', true);
    }
  };

  const createCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_API}/courses`, courseInput);
      triggerAlert(`Course "${courseInput.name}" was added successfully.`, false);
      setCourseInput({ name: '', level: 'Beginner', description: '', image: '' });
      loadSystemContext();
    } catch (err) {
      triggerAlert(err.response?.data?.error || 'Could not add the course. Please check the details and try again.', true);
    }
  };

  const allocationScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_API}/schedules`, scheduleInput);
      triggerAlert(response.data.message, false);
      setScheduleInput({ courseId: '', instructorId: '', batchName: '', date: '' });
      loadSystemContext();
    } catch (err) {
      
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Could not schedule the batch. Please try again.';
      triggerAlert(errorMsg, true);
    }
  };

  return (
    <div style={{ padding: '10px 0' }}>
      {alertInfo.text && (
        <div style={{
          padding: '15px',
          backgroundColor: alertInfo.isError ? '#fee2e2' : '#dcfce7',
          color: alertInfo.isError ? '#991b1b' : '#166534',
          borderRadius: '6px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>{alertInfo.text}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Course Creation Form Wrapper Container Column */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>Add a New Course</h3>
          <form onSubmit={createCourseSubmit}>
            <label>Course Name</label>
            <input type="text" value={courseInput.name} onChange={e => setCourseInput({...courseInput, name: e.target.value})} required placeholder="e.g., Full Stack Development Bootcamp" />
            
            <label>Difficulty Level</label>
            <select value={courseInput.level} onChange={e => setCourseInput({...courseInput, level: e.target.value})}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <label>Description</label>
            <textarea rows="3" value={courseInput.description} onChange={e => setCourseInput({...courseInput, description: e.target.value})} required placeholder="Give a short overview of what this course covers..." />

            <label>Cover Image URL</label>
            <input type="url" value={courseInput.image} onChange={e => setCourseInput({...courseInput, image: e.target.value})} required placeholder="https://images.unsplash.com/photo-example" />
            
            <button type="submit" style={{ width: '100%', marginTop: '5px' }}>Add Course</button>
          </form>
        </div>

       
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>Schedule a Batch</h3>
          <form onSubmit={allocationScheduleSubmit}>
            <label>Course</label>
            <select value={scheduleInput.courseId} onChange={e => setScheduleInput({...scheduleInput, courseId: e.target.value})} required>
              <option value="">-- Select a course --</option>
              {courses.map(c => <option key={c._id} value={c._id}>{c.name} ({c.level})</option>)}
            </select>

            <label>Instructor</label>
            <select value={scheduleInput.instructorId} onChange={e => setScheduleInput({...scheduleInput, instructorId: e.target.value})} required>
              <option value="">-- Select an instructor --</option>
              {instructors.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
            </select>

            <label>Batch Name</label>
            <input type="text" value={scheduleInput.batchName} onChange={e => setScheduleInput({...scheduleInput, batchName: e.target.value})} required placeholder="e.g., Batch MERN-Alpha, Morning Cohort 2" />

            <label>Date</label>
            <input type="date" value={scheduleInput.date} onChange={e => setScheduleInput({...scheduleInput, date: e.target.value})} required />

            <button type="submit" style={{ width: '100%', marginTop: '5px', backgroundColor: '#10b981' }}>Schedule Batch</button>
          </form>
        </div>
      </div>

      <div style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Instructors</h3>
          {instructors.length === 0 && <button onClick={runInstructorSeed} style={{ backgroundColor: '#6b7280' }}>Add Sample Instructors</button>}
        </div>
        <ul>
          {instructors.map(ins => <li key={ins._id}><strong>{ins.name}</strong> , email: <code style={{ color: '#ec4899' }}>{ins.email}</code></li>)}
        </ul>
      </div>

      <div style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3>Scheduled Batches</h3>
        {schedules.length === 0 ? <p>No batches have been scheduled yet.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Course</th>
                <th style={{ padding: '12px' }}>Batch</th>
                <th style={{ padding: '12px' }}>Instructor</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(s => (
                <tr key={s._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{new Date(s.date).toISOString().split('T')[0]}</td>
                  <td style={{ padding: '12px' }}>{s.course?.name}</td>
                  <td style={{ padding: '12px' }}><span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontSize: '0.85em' }}>{s.batchName}</span></td>
                  <td style={{ padding: '12px', color: '#475569' }}>{s.instructor?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}