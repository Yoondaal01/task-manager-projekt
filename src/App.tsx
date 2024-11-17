import React from 'react';
import Navbar from './Navbar';
import { UserProvider } from './UserContext';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar';
import OverAllToDo from './OverAllToDo';

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <OverAllToDo />
        <WeeklyCalendar />
        {/* Other components will go here */}
      </div>
    </UserProvider>
  );
};

export default App;