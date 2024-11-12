import React from 'react';
import './TaskCard.css'


interface TaskCardProps {
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
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
  onComplete,
  onDelete,
  onChange,
  onColorChange,
}) => {
  return (
    <div className="task-card">
      <h2>Tilføj Task</h2>
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
        <label>Prioritering</label>
        <select
          value={priority}
          onChange={(e) => onChange('priority', e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
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
      <div className="task-actions">
        <button className='add-button' onClick={onComplete}>Tilføj</button>
        <button className='close-button' onClick={onDelete}>Annuller</button>
      </div>
    </div>
  );
};

export default TaskCard;
