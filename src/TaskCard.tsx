import React from 'react';
import './TaskCard.css';

interface TaskCardProps {
  title: string;
  category: string;
  priority: 'lav' | 'medium' | 'høj';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
  time?: string; // Optional time property
  onComplete: () => void;
  onDelete: () => void;
  onChange: (field: string, value: string) => void;
  onColorChange: (color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  category,
  priority,
  color,
  date,
  time,
  onComplete,
  onDelete,
  onChange,
  onColorChange,
}) => {
  return (
    <div className="task-card" role="form" aria-labelledby="task-card-title">
      {/* Close icon to delete the task */}
      <img
        src="src/assets/close-icon.png" // Replace with the actual path to your PNG image
        alt="Luk"
        className="close-icon"
        onClick={onDelete}
        tabIndex={0}
        aria-label="Slet opgave"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onDelete()}
      />
      <h2 id="task-card-title">Tilføj Task</h2>
      <div className="task-card-content">
        {/* Input field for the task title */}
        <div className="task-field">
          <label htmlFor="task-title">Titel</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
            aria-required="true"
          />
        </div>
        {/* Input field for the task category */}
        <div className="task-field">
          <label htmlFor="task-category">Kategori</label>
          <input
            id="task-category"
            type="text"
            value={category}
            onChange={(e) => onChange('category', e.target.value)}
            aria-required="true"
          />
        </div>
        {/* Input field for the task date */}
        <div className="task-field">
          <label htmlFor="task-date">Dato</label>
          <input
            id="task-date"
            type="date"
            value={date}
            onChange={(e) => onChange('date', e.target.value)}
            aria-required="true"
          />
        </div>
        {/* Input field for the task time (optional) */}
        <div className="task-field">
          <label htmlFor="task-time">Tid</label>
          <input
            id="task-time"
            type="time"
            value={time || ''} // Handle optional time
            onChange={(e) => onChange('time', e.target.value)}
          />
        </div>
        {/* Dropdown to select the task priority */}
        <div className="task-field">
          <label htmlFor="task-priority">Prioritering</label>
          <select
            id="task-priority"
            className='priority'
            value={priority}
            onChange={(e) => onChange('priority', e.target.value)}
          >
            <option value="lav">Lav</option>
            <option value="medium">Medium</option>
            <option value="høj">Høj</option>
          </select>
        </div>
        {/* Color picker to select the task color */}
        <div className="task-field">
          <label>Vælg Farve</label>
          <div className="color-circle-container" style={{ display: 'flex', gap: '10px' }}>
            {["pink", "coral", "lavender", "teal", "yellow", "mint"].map(
              (colorOption) => (
                <div
                  key={colorOption}
                  className={`color-circle ${color === colorOption ? 'selected' : ''}`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => onColorChange(colorOption as 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint')}
                  tabIndex={0}
                  role="button"
                  aria-label={`Vælg farve ${colorOption}`}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onColorChange(colorOption as 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint')}
                />
              )
            )}
          </div>
        </div>
      </div>
      {/* Action buttons for adding or canceling the task */}
      <div className="task-actions">
        <button className='add-button' onClick={onComplete} aria-label="Tilføj opgave">Tilføj</button>
        <button className='close-button' onClick={onDelete} aria-label="Annuller opgave">Annuller</button>
      </div>
    </div>
  );
};

export default TaskCard;