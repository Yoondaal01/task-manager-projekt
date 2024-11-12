import React, { useState } from 'react';
import { useUser } from './UserContext';
import './WeeklyCalendar.css';
import TaskCard from './TaskCard';

const WeeklyCalendar: React.FC = () => {
  const { userData, setUserData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<{
    title: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
    date: string;
  }>({
    title: '',
    category: '',
    priority: 'low',
    color: 'pink',
    date: ''
  });

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

  const handleAddTaskButtonClick = (date: string) => {
    setSelectedDate(date);
    setNewTask({ ...newTask, date });
    setIsModalOpen(true);
  };

  const handleTaskSubmit = () => {
    const newTaskWithId = { ...newTask, id: Date.now() };
    setUserData({ ...userData, tasks: [...userData.tasks, newTaskWithId] });
    setIsModalOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  return (
    <div className="weekly-calendar-container">
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
              <div className="add-task-button" onClick={() => handleAddTaskButtonClick(date.toISOString().split('T')[0])}>
                <p>Add Task</p>
                <img src="src/assets/add-task-icon.png" alt="Add Task" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TaskCard
              title={newTask.title}
              category={newTask.category}
              priority={newTask.priority as 'low' | 'medium' | 'high'}
              color={newTask.color as 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint'}
              date={selectedDate || ''}
              onComplete={handleTaskSubmit}
              onDelete={() => setIsModalOpen(false)}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;