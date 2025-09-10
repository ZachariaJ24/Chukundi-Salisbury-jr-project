import React from 'react';
import { PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import './Header.css';

interface HeaderProps {
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  const isDemoMode = !process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL.includes('localhost');
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <PlayIcon className="logo-icon" />
          <h1>Video Streamer</h1>
          {isDemoMode && <span className="demo-badge">DEMO</span>}
        </div>
        <button className="refresh-btn" onClick={onRefresh} title="Refresh videos">
          <ArrowPathIcon className="refresh-icon" />
          Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
