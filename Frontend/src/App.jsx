import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
