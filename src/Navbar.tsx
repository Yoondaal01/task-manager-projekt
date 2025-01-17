import React, { useState } from 'react';
import './Navbar.css';
import { useUser } from './UserContext';

const Navbar: React.FC = () => {
  // Access user data from context
  const { userData } = useUser();
  // State to store user's name, defaulting to the name from userData if available
  const [name, setName] = useState(userData?.name || '');

  // Get today's date information for displaying in the navbar
  const today = new Date();
  const monthNames = [
    'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];
  const dayNames = [
    'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'
  ];

  // Handle keyboard accessibility for the name input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      // Save name or perform any action on Enter or Tab key press
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="greeting">
          {/* Display a greeting with the user's name or "Gæst" if no name is provided */}
          <h1>Hej {name || "Gæst"}!</h1>
          {/* Display today's date in a readable format */}
          <p>{dayNames[today.getDay()]}, {today.getDate()} {monthNames[today.getMonth()]} {today.getFullYear()}</p>
          {/* Hidden label for screen readers to ensure accessibility */}
          <label htmlFor="name-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0' }}>Indtast dit navn</label>
          {/* Input field to allow the user to enter their name */}
          <input
            id="name-input"
            type="text"
            value={name}
            placeholder="Indtast dit navn"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="name-input"
            aria-label="Indtast dit navn"
          />
        </div>
        <div className="logo">
          {/* Display the logo image */}
          <img src="https://i.pinimg.com/736x/81/3c/fc/813cfc3f214f8d187bdf5db2e0b3191f.jpg" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
