import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./OverAllToDo.css";

type Priority = "High" | "Medium" | "Low";

interface Task {
  id: number;
  title: string;
  category: string;
  deadline: string;
  priority: Priority;
  color: string;
  isCompleted: boolean;
}

const OverAllToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState([
    "Arbejde",
    "Fritid",
    "Sundhed",
    "Hjemmet",
  ]);
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [color, setColor] = useState("#FFCFDA"); // Default color
  const [filter, setFilter] = useState("Priority");

  const addTask = () => {
    if (!title || !deadline || (!category && !customCategory)) {
      alert("Please fill out all fields.");
      return;
    }

    const selectedCategory = customCategory || category;

    const newTask: Task = {
      id: Date.now(),
      title,
      category: selectedCategory,
      deadline,
      priority,
      color,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);

    // Save the custom category for future use
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
    }

    // Reset form fields
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setDeadline("");
    setPriority("Medium");
    setColor("#FFCFDA");
    setIsFormVisible(false);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const markComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const sortTasks = () => {
    const priorityOrder: Record<Priority, number> = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    switch (filter) {
      case "Priority":
        return [...tasks].sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      case "Deadline":
        return [...tasks].sort(
          (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
      case "Category":
        return [...tasks].sort((a, b) =>
          a.category.localeCompare(b.category)
        );
      default:
        return tasks;
    }
  };

  const filteredTasks = sortTasks();

  return (
    <div className="OverAllToDo">
        <div className="sectionone">
      <h1>Vigtigste mål</h1>

      {/* Add Task Button */}
      <button className="add-button" onClick={() => setIsFormVisible(true)}>
        Tilføj task
      </button>
      </div>

      {/* Modal Form */}
      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tilføj</h2>
            <label>Title</label>
            <input
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Kategori</label>
            <select className='priority'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value !== "Other") {
                  setCustomCategory("");
                }
              }}
            >
              <option value="">Kategori</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="Other">Andet</option>
            </select><label>Deadline</label>
            {category === "Other" && (
              <input
                type="text"
                placeholder="Custom Category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <label>Prioritering</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="High">Høj</option>
              <option value="Medium">Medium</option>
              <option value="Low">Lav</option>
            </select>

            {/* Color Picker */}
            <div className="color-picker">
              <label>Vælg Farve</label>
              <div className="color-options">
                {["#FFCFDA", "#FF8B5A", "#FAF9FF", "#307F80", "#FFFF55"].map(
                  (c) => (
                    <button
                      key={c}
                      className={`color-swatch ${color === c ? "selected" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  )
                )}
              </div>
            </div>

            <div className="modal-buttons">
              <button onClick={addTask}>Tilføj</button>
              <button onClick={() => setIsFormVisible(false)}>Anullere</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Box */}
      <div className="filter-box">
        <label>Priotere efter</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Priority">Vigtighed (Høj til Lav)</option>
          <option value="Deadline">Deadline (Snarest først)</option>
          <option value="Category">Kategori (A-Z)</option>
        </select>
      </div>

      {/* Task List - Horizontal Scroll */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.isCompleted ? "completed" : ""}`}
            style={{ backgroundColor: task.color }}
          >
            <h3>{task.title}</h3>
            <p>Kategori: {task.category}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Vigtighed: {task.priority}</p>
            <div className="task-buttons">
              {!task.isCompleted && (
                <button
                  className="complete-button"
                  onClick={() => markComplete(task.id)}
                >
                  <img
                            src={task.isCompleted ? "src/assets/done-button-active.png" : "src/assets/done-button-not-active.png"}
                            alt={task.isCompleted ? "Complete" : "Incomplete"}
                          />
                </button>
              )}
              <button className="delete-button" onClick={() => deleteTask(task.id)}>
              <img src="src/assets/delete-button.png" alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverAllToDo;
