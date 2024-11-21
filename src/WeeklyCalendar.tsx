import React, { useState } from 'react';
import { useUser } from './UserContext';
import './WeeklyCalendar.css';
import TaskCard from './TaskCard';
import FocusModePanel from './FocusModePanel';

interface Task {
  id: number;
  title: string;
  category: string;
  priority: 'lav' | 'medium' | 'høj';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
  time?: string;
  isComplete: boolean;
}

const WeeklyCalendar: React.FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { userData, setUserData } = useUser();
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);

  const weekDays = ['MAN.', 'TIRS.', 'ONS.', 'TOR.', 'FRE.', 'LØR.', 'SØN.'];

  // Get current week dates
  const today = new Date();
  const currentDay = new Date();
  today.setDate(today.getDate() + weekOffset * 7);
  const startOfWeek = today.getDate() - today.getDay() + 1;
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(startOfWeek + i);
    return date;
  });

  // Toggle Focus Mode Panel
  const toggleFocusMode = () => {
    setIsFocusModeOpen(!isFocusModeOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  // Function to handle adding a new task
  const handleAddTaskButtonClick = (date: string, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedTask({
      id: Date.now(), // Generate a unique ID
      title: '',
      category: '',
      priority: 'lav',
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

  // Function to handle clicking on an existing task
  const handleTaskClick = (task: Task, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedTask(task);
    const rect = event.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      setModalPosition({ top: rect.top + window.scrollY, left: rect.right + window.scrollX + 10 });
    }
    setIsModalOpen(true);
  };

  // Function to handle task submission
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

  // Function to handle task deletion
  const handleDeleteTask = (taskId: number) => {
    setUserData({
      ...userData,
      tasks: userData.tasks.filter((task) => task.id !== taskId),
    });
    setIsModalOpen(false);
  };

  // Function to handle completing a task
  const handleToggleCompleteTask = (taskId: number) => {
    setUserData({
      ...userData,
      tasks: userData.tasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      ),
    });
  };

  // Function to handle changes in the task form
  const handleChange = (field: string, value: string) => {
    setSelectedTask((prevTask) => (prevTask ? { ...prevTask, [field]: value } : null));
  };

  // Function to handle color change
  const handleColorChange = (color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint') => {
    setSelectedTask((prevTask) => (prevTask ? { ...prevTask, color } : null));
  };

  return (
    <div className="weekly-calendar-container">
      {isOverlayVisible && <div className="overlay" aria-hidden="true"></div>}
      
      {/* Move the Focus Mode button right after the navbar */}
      <div className="focus-mode-button-container">
        <button
          className="focus-mode-button"
          onClick={toggleFocusMode}
          aria-label="Aktiver Fokus Mode"
        >
          Fokus Mode
        </button>
      </div>

      <div className="week-navigation">
        <button
          className="week-arrow"
          onClick={() => setWeekOffset(weekOffset - 1)}
          aria-label="Forrige uge"
        >
          &#9664;
        </button>
        <h2 className="week-number">
          Uge {Math.ceil(((weekDates[0].getTime() - new Date(weekDates[0].getFullYear(), 0, 1).getTime()) / 86400000 + new Date(weekDates[0].getFullYear(), 0, 1).getDay() + 1) / 7)}
        </h2>
        <button
          className="week-arrow"
          onClick={() => setWeekOffset(weekOffset + 1)}
          aria-label="Næste uge"
        >
          &#9654;
        </button>
      </div>

      <div className="weekly-calendar-wrapper">
        <div className="weekly-calendar">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`day-column ${date.toDateString() === currentDay.toDateString() ? 'current-day' : ''}`}
              role="region"
              aria-labelledby={`day-${index}`}
            >
              <div className="day-header" id={`day-${index}`}>
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
                      tabIndex={0}
                      role="button"
                      aria-label={`Opgave: ${task.title}, Kategori: ${task.category}, Prioritet: ${task.priority}`}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleTaskClick(task, e as unknown as React.MouseEvent<HTMLDivElement>);
  }
}}
                    >
                      <div>
                        {task.time ? <small className="task-time">{task.time}</small> : null}
                        <h4>{task.title}</h4>
                        <p>{task.category}</p>
                      </div>
                      <div className="task-actions" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                        <button
                          className="task-delete"
                          onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                          aria-label="Slet opgave"
                        >
                          <img src="src/assets/delete-button.png" alt="Slet" />
                        </button>
                        <button
                          className="task-complete"
                          onClick={(e) => { e.stopPropagation(); handleToggleCompleteTask(task.id); }}
                          aria-label={task.isComplete ? "Markér som ikke fuldført" : "Markér som fuldført"}
                        >
                          <img
                            src={task.isComplete ? "src/assets/done-button-active.png" : "src/assets/done-button-not-active.png"}
                            alt={task.isComplete ? "Fuldført" : "Ikke fuldført"}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="add-task-button" onClick={(e) => handleAddTaskButtonClick(date.toISOString().split('T')[0], e)}>
                <img src="src/assets/add-task-icon.png" alt="Tilføj Opgave" className="add-task-icon" />
                <p>Tilføj Task</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isFocusModeOpen && (
        <div className="focus-mode-panel-wrapper">
          <FocusModePanel
            tasks={userData.tasks}
            closePanel={toggleFocusMode}
            currentDay={new Date()}
            onDeleteTask={handleDeleteTask}
            onToggleCompleteTask={handleToggleCompleteTask}
          />
        </div>
      )}

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
              onDelete={() => handleDeleteTask(selectedTask.id)}
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
