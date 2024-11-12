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
  time?: string; // Optional time property
  isComplete: boolean;
}

const WeeklyCalendar: React.FC = () => {
  const { userData, setUserData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = [
    'MAN.', 'TIRS.', 'ONS.', 'TOR.', 'FRE.', 'LØR.', 'SØN.'
  ];

  // Get current week dates
  const today = new Date();
  const currentDay = new Date(); // Store the actual current day
  today.setDate(today.getDate() + weekOffset * 7);
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
      isComplete: false,
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

  const handleDeleteTask = (taskId: number) => {
    setUserData({
      ...userData,
      tasks: userData.tasks.filter((task) => task.id !== taskId),
    });
  };

  const handleToggleCompleteTask = (taskId: number) => {
    setUserData({
      ...userData,
      tasks: userData.tasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      ),
    });
  };

  const handleChange = (field: string, value: string) => {
    setSelectedTask((prevTask) => prevTask ? ({ ...prevTask, [field]: value }) : null);
  };

  const handleColorChange = (color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint') => {
    setSelectedTask((prevTask) => prevTask ? ({ ...prevTask, color }) : null);
  };

  const handleWeekChange = (direction: 'prev' | 'next') => {
    setWeekOffset((prevOffset) => direction === 'prev' ? prevOffset - 1 : prevOffset + 1);
  };

  return (
    <div className="weekly-calendar-container">
      <div className="week-navigation">
        <button className="week-arrow" onClick={() => handleWeekChange('prev')}>&#9664;</button>
        <h2 className="week-number">Uge {Math.ceil(((weekDates[0].getTime() - new Date(weekDates[0].getFullYear(), 0, 1).getTime()) / 86400000 + new Date(weekDates[0].getFullYear(), 0, 1).getDay() + 1) / 7)}</h2>
        <button className="week-arrow" onClick={() => handleWeekChange('next')}>&#9654;</button>
      </div>
      <div className="weekly-calendar-wrapper">
        <div className="weekly-calendar">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`day-column ${date.toDateString() === currentDay.toDateString() ? 'current-day' : ''}`}
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
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onClick={(e) => handleTaskClick(task, e)}
                    >
                      <div>
                        {task.time ? <small className="task-time">{task.time}</small> : null}
                        <h4>{task.title}</h4>
                        <p>{task.category}</p>
                      </div>
                      <div className="task-actions" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                        <button className="task-delete" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>
                          <img src="src/assets/delete-button.png" alt="Delete" />
                        </button>
                        <button className="task-complete" onClick={(e) => { e.stopPropagation(); handleToggleCompleteTask(task.id); }}>
                          <img
                            src={task.isComplete ? "src/assets/done-button-active.png" : "src/assets/done-button-not-active.png"}
                            alt={task.isComplete ? "Complete" : "Incomplete"}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="add-task-button" onClick={(e) => handleAddTaskButtonClick(date.toISOString().split('T')[0], e)}>
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
