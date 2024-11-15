import React from 'react';
import Navbar from './Navbar';
import { UserProvider } from './UserContext';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar';




const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <WeeklyCalendar />
      
      
      </div>
    </UserProvider>
  );
};

export default App;