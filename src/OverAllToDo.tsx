import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./OverAllToDo.css";

type Priority = "Høj" | "Medium" | "Lav";

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
    setColor("#FFC6D0");
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
      Høj: 1,
      Medium: 2,
      Lav: 3,
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
        <h1 className="h1OverAlle">Ekstra Mål</h1>

        {/* Add Task Button */}
        <button className="overall-add-task-button" onClick={() => setIsFormVisible(true)}>
          Tilføj task
        </button>
      </div>

      {/* Modal Form */}
      {isFormVisible && (
        <div className="overall-modal">
          <div className="overall-modal-content">
            <h2>Tilføj</h2>
            <label>Title</label>
            <input
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Kategori</label>
            <select
              className='priority'
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
            </select>
            {category === "Other" && (
              <input
                type="text"
                placeholder="Andet"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
            <label>Deadline</label>
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
              <option value="Høj">Høj</option>
              <option value="Medium">Medium</option>
              <option value="Lav">Lav</option>
            </select>

            {/* Color Picker */}
            <div className="overall-color-picker">
              <label>Vælg Farve</label>
              <div className="overall-color-options">
                {["#FFC6D0", "#BFEFD1", "#FFE781", "#D6C4EF", "#FEB192", "#90C1C9"].map(
                  (c) => (
                    <button
                      key={c}
                      className={`overall-color-swatch ${color === c ? "selected" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  )
                )}
              </div>
            </div>

            <div className="overall-modal-buttons">
              <button onClick={addTask}>Tilføj</button>
              <button onClick={() => setIsFormVisible(false)}>Anullere</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Box */}
      <div className="overall-filter-box">
        <label>Priotere efter</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Priority">Vigtighed (Høj til Lav)</option>
          <option value="Deadline">Deadline (Snarest først)</option>
          <option value="Category">Kategori (A-Z)</option>
        </select>
      </div>

      {/* Task List - Horizontal Scroll */}
      <div className="overall-task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`overall-task-item ${task.isCompleted ? "completed" : ""}`}
            style={{ backgroundColor: task.color }}
          >
            <div>
    <h3>{task.title}</h3>
    <p>{task.category}</p>
    <p>{task.deadline}</p>
    <p>{task.priority}</p>
  </div>
            <div className="overall-task-buttons">
              {!task.isCompleted && (
                <button
                  className="overall-complete-button"
                  onClick={() => markComplete(task.id)}
                >
                  <img
                    src={task.isCompleted ? "src/assets/done-button-active.png" : "src/assets/done-button-not-active.png"}
                    alt={task.isCompleted ? "Complete" : "Incomplete"}
                  />
                </button>
              )}
              <button className="overall-delete-button" onClick={() => deleteTask(task.id)}>
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
