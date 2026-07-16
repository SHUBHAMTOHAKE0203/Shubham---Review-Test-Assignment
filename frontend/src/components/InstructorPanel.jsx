import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_API = '/api';

export default function InstructorPanel() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInsId, setSelectedInsId] = useState('');
  const [personalAgenda, setPersonalAgenda] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_API}/instructors`).then(res => setInstructors(res.data));
  }, []);

  useEffect(() => {
    if (selectedInsId) {
      axios.get(`${BASE_API}/schedules/instructor/${selectedInsId}`)
        .then(res => setPersonalAgenda(res.data))
        .catch(err => console.error('Failed to load schedule for this instructor', err));
    } else {
      setPersonalAgenda([]);
    }
  }, [selectedInsId]);

  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3>Instructor Dashboard</h3>
      <div style={{ maxWidth: '400px', marginBottom: '25px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Select Instructor:</label>
        <select value={selectedInsId} onChange={e => setSelectedInsId(e.target.value)}>
          <option value="">-- Choose an instructor --</option>
          {instructors.map(ins => <option key={ins._id} value={ins._id}>{ins.name} ({ins.email})</option>)}
        </select>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

      <h4>Assigned Classes</h4>
      {selectedInsId && personalAgenda.length === 0 ? (
        <p style={{ color: '#64748b', fontStyle: 'italic' }}>No classes assigned to this instructor yet.</p>
      ) : !selectedInsId ? (
        <p style={{ color: '#94a3b8' }}>Select an instructor above to see their schedule.</p>
      ) : (
        <div className="card-grid">
          {personalAgenda.map(item => (
            <div className="card" key={item._id}>
              <img 
                src={item.course?.image} 
                alt={item.course?.name} 
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500'; }}
              />
              <div style={{ padding: '15px' }}>
                <span style={{ 
                  backgroundColor: '#fef3c7', 
                  color: '#d97706', 
                  fontSize: '0.75rem', 
                  fontWeight: '700', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  textTransform: 'uppercase' 
                }}>
                  {item.course?.level}
                </span>
                <h4 style={{ margin: '10px 0 5px 0', fontSize: '1.15rem' }}>{item.course?.name}</h4>
                <p style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '0.9rem' }}>
                  <strong>Batch:</strong> {item.batchName}
                </p>
                <p style={{ 
                  margin: '12px 0 0 0', 
                  padding: '8px', 
                  backgroundColor: '#eff6ff', 
                  color: '#1d4ed8', 
                  borderRadius: '4px', 
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Scheduled: {new Date(item.date).toISOString().split('T')[0]}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px', lineHeight: '1.4' }}>
                  {item.course?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}