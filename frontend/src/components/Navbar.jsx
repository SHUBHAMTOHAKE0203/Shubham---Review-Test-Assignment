export default function Navbar({ activeView, onViewChange }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#1e3a8a',
      padding: '15px 30px',
      color: 'white',
      borderRadius: '8px',
      marginBottom: '25px'
    }}>
      <h2 style={{ margin: 0 }}>Lecture Scheduler</h2>
      <div>
        <button 
          onClick={() => onViewChange('admin')}
          style={{
            backgroundColor: activeView === 'admin' ? '#3b82f6' : 'transparent',
            border: activeView === 'admin' ? 'none' : '1px solid white',
            marginRight: '10px'
          }}>
          Admin Dashboard
        </button>
        <button 
          onClick={() => onViewChange('instructor')}
          style={{
            backgroundColor: activeView === 'instructor' ? '#3b82f6' : 'transparent',
            border: activeView === 'instructor' ? 'none' : '1px solid white'
          }}>
          Instructor Schedule
        </button>
      </div>
    </nav>
  );
}