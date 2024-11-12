import React from 'react';
import './TaskCard.css';

interface TaskCardProps {
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  color: 'pink' | 'coral' | 'lavender' | 'teal' | 'yellow' | 'mint';
  date: string;
  onComplete: () => void;
  onDelete: () => void;
  onChange: (field: string, value: string) => void;
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
}) => {
  return (
    <div className={`task-card ${priority} ${color}`}>
      <div className="task-card-header">
        <h4>Tilføj Task</h4>
        <button className="close-button" onClick={onDelete}>
          ✖
        </button>
      </div>
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
          <label>Color</label>
          <select
            value={color}
            onChange={(e) => onChange('color', e.target.value)}
          >
            <option value="pink">Pink</option>
            <option value="coral">Coral</option>
            <option value="lavender">Lavender</option>
            <option value="teal">Teal</option>
            <option value="yellow">Yellow</option>
            <option value="mint">Mint</option>
          </select>
        </div>
        <div className="task-field">
          <label>Noter / Mikro task</label>
          <textarea onChange={(e) => onChange('notes', e.target.value)} />
        </div>
      </div>
      <button className="add-button" onClick={onComplete}>
        Tilføj
      </button>
    </div>
  );
};

export default TaskCard;
