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
          <img src="https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-letter-n-logo-design-png-png-image_5687381.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;