import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import InstructorPanel from './components/InstructorPanel';

export default function App() {
  const [currentView, setCurrentView] = useState('admin');

  return (
    <div className="container">
      <Navbar activeView={currentView} onViewChange={setCurrentView} />
      
      <main style={{ marginTop: '10px' }}>
        {currentView === 'admin' ? (
          <AdminPanel />
        ) : (
          <InstructorPanel />
        )}
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '50px', 
        padding: '20px 0', 
        color: '#94a3b8', 
        fontSize: '0.85rem',
        borderTop: '1px solid #e2e8f0'
      }}>
        made by shubham
      </footer>
    </div>
  );
}