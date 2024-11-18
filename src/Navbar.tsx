import React, { useState } from 'react';
import './Navbar.css';
import { useUser } from './UserContext';

const Navbar: React.FC = () => {
  const { userData } = useUser();
  const [name, setName] = useState(userData?.name || ''); // Default to userData name if available, otherwise empty

  const today = new Date();
  const monthNames = [
    'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];
  const dayNames = [
    'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'
  ];

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="greeting">
          <h1>Hej {name || "Guest"}!</h1> {/* Display name or "Guest" if name is not provided */}
          <p>{dayNames[today.getDay()]}, {today.getDate()} {monthNames[today.getMonth()]} {today.getFullYear()}</p>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />
        </div>
        <div className="logo">
          <img src="https://i.pinimg.com/736x/81/3c/fc/813cfc3f214f8d187bdf5db2e0b3191f.jpg" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
