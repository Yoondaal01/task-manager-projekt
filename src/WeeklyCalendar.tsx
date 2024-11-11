import React from 'react';
import { useUser } from './UserContext';
import './WeeklyCalendar.css';

const WeeklyCalendar: React.FC = () => {
  const { userData } = useUser();
  const weekDays = [
    'MAN.', 'TIRS.', 'ONS.', 'TOR.', 'FRE.', 'LØR.', 'SØN.'
  ];

  // Get current week dates
  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay() + 1;
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(startOfWeek + i);
    return date;
  });

  return (
    <div className="weekly-calendar-wrapper">
      <div className="weekly-calendar">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`day-column ${date.toDateString() === today.toDateString() ? 'current-day' : ''}`}
          >
            <div className="day-header">
              <p>{date.getDate()}</p>
              <h3>{weekDays[index]}</h3>
            </div>
            <div className="tasks">
              {userData.tasks
                .filter(task => new Date(task.date).toDateString() === date.toDateString())
                .map(task => (
                  <div key={task.id} className={`task ${task.priority}`}>
                    <h4>{task.title}</h4>
                    <p>{task.category}</p>
                  </div>
                ))}
            </div>
            <div className="add-task-button">
              <p>Add Task</p>
              <img src="src/assets/add-task-icon.png" alt="Add Task" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;