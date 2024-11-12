import React from 'react';
import './Navbar.css';
import { useUser } from './UserContext';

const Navbar: React.FC = () => {
  const { userData } = useUser();
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
          <h1>Hej {userData.name}!</h1>
          <p>{dayNames[today.getDay()]}, {today.getDate()} {monthNames[today.getMonth()]} {today.getFullYear()}</p>
        </div>
        <div className="logo">
          <img src="https://i.pinimg.com/736x/81/3c/fc/813cfc3f214f8d187bdf5db2e0b3191f.jpg" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;