import React, { useState, useRef } from 'react';
import TaskCard from './TaskCard'; // Ensure TaskCard component is correctly imported
import './TaskList.css';

interface Task {
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
  time?: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

  const addTask = (newTask: Task) => {
    if (tasks.length < 5) {
      setTasks([...tasks, newTask]);
    } else {
      alert('You can only add up to 5 tasks.');
    }
    setIsPopupOpen(false);
  };

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleComplete = (task: Task) => {
    addTask(task);
  };

  const handleDelete = () => {
    setIsPopupOpen(false);
  };

  // Scroll functions to move the task list container
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="task-list-container">
      <h2>Most Important:</h2>
      <button className="add-task-button" onClick={handleAddClick}>Tilføj Task</button>
      
      {isPopupOpen && (
        <TaskCard
          title=""
          category=""
          priority="low"
          color="pink"
          date=""
          time=""
          onComplete={() => handleComplete({
            title: 'New Task',
            category: 'Category',
            priority: 'low',
            color: 'pink',
            date: '2024-01-01',
            time: '07:00'
          })}
          onDelete={handleDelete}
          onChange={() => {}}
          onColorChange={() => {}}
        />
      )}

      {/* Scroll arrows */}
      <button className="scroll-arrow left" onClick={scrollLeft}>‹</button>

      {/* Scrollable task list container */}
      <div className="task-list" ref={scrollRef}>
        {tasks.map((task, index) => (
          <div key={index} className={`task-card task-card-${task.color}`}>
            <p>{task.time} - {task.title}</p>
            <p>{task.category}</p>
          </div>
        ))}
        
        {/* Empty cards to ensure always 5 slots */}
        {[...Array(5 - tasks.length)].map((_, index) => (
          <div key={index + tasks.length} className="task-card empty-card"></div>
        ))}
      </div>

      <button className="scroll-arrow right" onClick={scrollRight}>›</button>
    </div>
  );
};

export default TaskList;
