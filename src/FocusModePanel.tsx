import React, { useState } from 'react';
import './FocusModePanel.css';

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

interface FocusModePanelProps {
  tasks: Task[];
  closePanel: () => void;
  currentDay: Date;
}

const FocusModePanel: React.FC<FocusModePanelProps> = ({ tasks, closePanel, currentDay }) => {
  const [filterOption, setFilterOption] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');

  // Get today's tasks
  let todayTasks = tasks.filter(
    (task) => new Date(task.date).toDateString() === currentDay.toDateString()
  );

  // Apply filtering by priority
  if (filterOption) {
    todayTasks = todayTasks.filter((task) => task.priority === filterOption);
  }

  // Apply search filter by category
  if (searchCategory) {
    todayTasks = todayTasks.filter((task) =>
      task.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
  }

  return (
    <div className="focus-mode-panel">
      <button className="close-panel-button" onClick={closePanel}>
  <img
    src="src/assets/close-icon.png"  // Replace with the actual path to your icon
    alt="Close"
    className="close-icon"
  />
</button>
      <h2>Fokusmode: Dagens opgaver</h2>

      <div className="filter-sort-options">
        <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <option value="">Filtrer efter prioritet</option>
          <option value="lav">Lav</option>
          <option value="medium">Medium</option>
          <option value="høj">Høj</option>
        </select>

        <input
          type="text"
          placeholder="Søg efter kategori"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      <div className="tasks-list">
        {todayTasks.map((task) => (
          <div key={task.id} className={`task-card ${task.color}`}>
            <h3>{task.title}</h3>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            {task.time && <p>Time: {task.time}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusModePanel;
