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
  onDeleteTask: (taskId: number) => void;
  onToggleCompleteTask: (taskId: number) => void;
}

const FocusModePanel: React.FC<FocusModePanelProps> = ({
  tasks,
  closePanel,
  currentDay,
  onDeleteTask,
  onToggleCompleteTask,
}) => {
  // State to keep track of the selected priority filter option
  const [filterOption, setFilterOption] = useState<string>('');
  // State to keep track of the search category input
  const [searchCategory, setSearchCategory] = useState<string>('');

  // Filter the tasks for today only
  let todayTasks = tasks.filter(
    (task) => new Date(task.date).toDateString() === currentDay.toDateString()
  );

  // Apply priority filter if a filter option is selected
  if (filterOption) {
    todayTasks = todayTasks.filter((task) => task.priority === filterOption);
  }

  // Apply search filter for category if a search term is entered
  if (searchCategory) {
    todayTasks = todayTasks.filter((task) =>
      task.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
  }

  // Handle keyboard event for accessibility when closing the panel
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closePanel();
    }
  };

  return (
    <div className="focus-mode-panel">
      {/* Close button for the panel */}
      <button
        className="close-panel-button"
        onClick={closePanel}
        onKeyDown={handleKeyDown}
        aria-label="Luk panel"
      >
        <img
          src="src/assets/close-icon.png" 
          alt="Luk"
          className="close-icon"
        />
      </button>
      <h2>Fokusmode: Dagens opgaver</h2>

      <div className="filter-sort-options">
        {/* Dropdown to filter tasks by priority */}
        <label htmlFor="filter-priority" className="visually-hidden">
          Filtrer efter prioritet
        </label>
        <select
          id="filter-priority"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          aria-label="Filtrer efter prioritet"
        >
          <option value="">Filtrer efter prioritet</option>
          <option value="lav">Lav</option>
          <option value="medium">Medium</option>
          <option value="høj">Høj</option>
        </select>

        {/* Input to search tasks by category */}
        <label htmlFor="search-category" className="visually-hidden">
          Søg efter kategori
        </label>
        <input
          id="search-category"
          type="text"
          placeholder="Søg efter kategori"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          aria-label="Søg efter kategori"
        />
      </div>

      {/* Display the list of tasks for today */}
      <div className="tasks-list">
        {todayTasks.map((task) => (
          <div
            key={task.id}
            className={`task-card-focus ${task.color}`}
            tabIndex={0}
            aria-label={`Opgave: ${task.title}, Kategori: ${task.category}, Prioritet: ${task.priority}`}
          >
            <h3>{task.title}</h3>
            <p>Kategori: {task.category}</p>
            <p>Prioritet: {task.priority}</p>
            {/* Display the task time if available */}
            {task.time && <p>Tid: {task.time}</p>}

            {/* Task action buttons: delete and mark complete/incomplete */}
            <div className="task-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                className="task-delete"
                onClick={() => onDeleteTask(task.id)}
                aria-label={`Slet opgave: ${task.title}`}
              >
                <img src="src/assets/delete-button.png" alt="Slet" />
              </button>
              <button
                className="task-complete"
                onClick={() => onToggleCompleteTask(task.id)}
                aria-label={`Markér opgave som ${task.isComplete ? 'ikke fuldført' : 'fuldført'}: ${task.title}`}
              >
                <img
                  src={
                    task.isComplete
                      ? 'src/assets/done-button-active.png'
                      : 'src/assets/done-button-not-active.png'
                  }
                  alt={task.isComplete ? 'Fuldført' : 'Ikke fuldført'}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusModePanel;
