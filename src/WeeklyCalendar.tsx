import React, { useState } from 'react';
import { useUser } from './UserContext';
import './WeeklyCalendar.css';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
  time?: string; // Optional property
}

const WeeklyCalendar: React.FC = () => {
  const { userData, setUserData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);

  const weekDays = ['MAN.', 'TIRS.', 'ONS.', 'TOR.', 'FRE.', 'LØR.', 'SØN.'];

  // Get current week dates
  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay() + 1;
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(startOfWeek + i);
    return date;
  });

  const handleAddTaskButtonClick = (date: string, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedTask({
      id: Date.now(),
      title: '',
      category: '',
      priority: 'low',
      color: 'pink',
      date,
      time: '',
    });
    const rect = event.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      setModalPosition({ top: rect.top + window.scrollY, left: rect.right + window.scrollX + 10 });
    }
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedTask(task);
    const rect = event.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      setModalPosition({ top: rect.top + window.scrollY, left: rect.right + window.scrollX + 10 });
    }
    setIsModalOpen(true);
  };

  const handleTaskSubmit = () => {
    if (selectedTask) {
      setUserData({
        ...userData,
        tasks: userData.tasks.some((task) => task.id === selectedTask.id)
          ? userData.tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task))
          : [...userData.tasks, selectedTask],
      });
      setIsModalOpen(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSelectedTask((prevTask) => (prevTask ? { ...prevTask, [field]: value } : null));
  };

  const handleColorChange = (color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint') => {
    setSelectedTask((prevTask) => (prevTask ? { ...prevTask, color } : null));
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
                  .filter((task) => new Date(task.date).toDateString() === date.toDateString())
                  .map((task) => (
                    <div
                      key={task.id}
                      className={`task ${task.priority} ${task.color}`}
                      onClick={(e) => handleTaskClick(task, e)}
                      style={{ width: '100%' }}
                    >
                      {task.time ? <small className="task-time">{task.time}</small> : null}
                      <h4>{task.title}</h4>
                      <p>{task.category}</p>
                    </div>
                  ))}
              </div>
              <div
                className="add-task-button"
                onClick={(e) => handleAddTaskButtonClick(date.toISOString().split('T')[0], e)}
              >
                <p>Add Task</p>
                <img src="src/assets/add-task-icon.png" alt="Add Task" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && modalPosition && selectedTask && (
        <div
          className="modal-overlay"
          style={{ position: 'absolute', top: modalPosition.top, left: modalPosition.left, zIndex: 10 }}
        >
          <div className="modal-content">
            <TaskCard
              title={selectedTask.title}
              category={selectedTask.category}
              priority={selectedTask.priority}
              color={selectedTask.color}
              date={selectedTask.date}
              time={selectedTask.time || ''}
              onComplete={handleTaskSubmit}
              onDelete={() => setIsModalOpen(false)}
              onChange={handleChange}
              onColorChange={handleColorChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
