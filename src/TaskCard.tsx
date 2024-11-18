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
    <div className="task-card">
      <img
        src="src/assets/close-icon.png" // Replace with the actual path to your PNG image
        alt="Close"
        className="close-icon"
        onClick={onDelete}
      />
      <h2>Tilføj Task</h2>
      <div className="task-card-content">
        <div className="task-field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </div>
        <div className="task-field">
          <label>Kategori</label>
          <input
            type="text"
            value={category}
            onChange={(e) => onChange('category', e.target.value)}
          />
        </div>
        <div className="task-field">
          <label>Dato</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onChange('date', e.target.value)}
          />
        </div>
        <div className="task-field">
          <label>Tid</label>
          <input
            type="time"
            value={time || ''} // Handle optional time
            onChange={(e) => onChange('time', e.target.value)}
          />
        </div>
        <div className="task-field">
          <label>Prioritering</label>
          <select className='priority'
            value={priority}
            onChange={(e) => onChange('priority', e.target.value)}
          >
            <option value="lav">Lav</option>
            <option value="medium">Medium</option>
            <option value="høj">Høj</option>
          </select>
        </div>
        <div className="task-field">
          <label>Vælg Farve</label>
          <div className="color-circle-container" style={{ display: 'flex', gap: '10px' }}>
            {['pink', 'coral', 'lavender', 'teal', 'yellow', 'mint'].map(
              (colorOption) => (
                <div
                  key={colorOption}
                  className={`color-circle ${color === colorOption ? 'selected' : ''}`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => onColorChange(colorOption as 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint')}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className='add-button' onClick={onComplete}>Tilføj</button>
        <button className='close-button' onClick={onDelete}>Annuller</button>
      </div>
    </div>
  );
};

export default TaskCard;
