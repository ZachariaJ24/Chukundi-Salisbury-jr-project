import React from 'react';
import './Header.css';

interface HeaderProps {
  onRefresh?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🎬 VideoStream</h1>
          <p>Your Personal Video Library</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="refresh-button"
            onClick={onRefresh}
            title="Refresh video list"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
