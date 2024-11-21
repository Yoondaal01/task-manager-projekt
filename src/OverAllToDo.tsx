import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./OverAllToDo.css";
// Definerer prioriteringsniveauer som en TypeScript type
type Priority = "Høj" | "Medium" | "Lav";

// Interface for at strukturere task-data
interface Task {
  id: number;
  title: string;
  category: string;
  deadline: string;
  priority: Priority;
  color: string;ba
  isCompleted: boolean;
}

const OverAllToDo: React.FC = () => {
  // States til opbevaring af opgave- og UI-relateret data
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
  ]);// Foruddefinerede kategorier
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [color, setColor] = useState("#FFCFDA"); // Default color
  const [filter, setFilter] = useState("Priority");
 // Funktion til at tilføje en ny opgave
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
   // Opdaterer task-listen og evt. tilføjer en ny kategori
    setTasks([...tasks, newTask]);

    
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
    }
// Nulstiller formularfelter
   
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setDeadline("");
    setPriority("Medium");
    setColor("#FFC6D0");
    setIsFormVisible(false);
  };
 // Funktion til at slette en opgave
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
// Funktion til at markere en opgave som fuldført
  const markComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );

   // Trigger confetti-effekt
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
// Sorteringsfunktion baseret på filtervalg
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
      {/* Header med knap til at tilføje en ny opgave */}
      <div className="sectionone">
        <h1 className="h1OverAlle">Ekstra Mål</h1>

        {/* Tilføj Task Button */}
        <button
          className="overall-add-task-button"
          onClick={() => setIsFormVisible(true)}
          aria-label="Tilføj ny opgave"
        >
          Tilføj task
        </button>
      </div>

       {/* Modal form til tilføjelse af opgaver */}
      {isFormVisible && (
        <div className="overall-modal" role="dialog" aria-labelledby="modal-title">
          <div className="overall-modal-content">
            <h2 id="modal-title">Tilføj Opgave</h2>
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-required="true"
            />
            <label htmlFor="task-category">Kategori</label>
            <select
              id="task-category"
              className='priority'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value !== "Other") {
                  setCustomCategory("");
                }
              }}
            >
              <option value="">Vælg Kategori</option>
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
            <label htmlFor="task-deadline">Deadline</label>
            <input
              id="task-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              aria-required="true"
            />
            <label htmlFor="task-priority">Prioritering</label>
            <select
              id="task-priority"
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
                      aria-label={`Vælg farve ${c}`}
                    />
                  )
                )}
              </div>
            </div>

            <div className="overall-modal-buttons">
              <button onClick={addTask} aria-label="Tilføj opgave">Tilføj</button>
              <button onClick={() => setIsFormVisible(false)} aria-label="Annuller opgave">Annullere</button>
            </div>
          </div>
        </div>
      )}

      {/* Filtreringsboks */}
      <div className="overall-filter-box">
        <label htmlFor="task-filter">Priotere efter</label>
        <select id="task-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Priority">Vigtighed (Høj til Lav)</option>
          <option value="Deadline">Deadline (Snarest først)</option>
          <option value="Category">Kategori (A-Z)</option>
        </select>
      </div>

      {/*  Scroll */}
      <div className="overall-task-list" tabIndex={0} role="list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`overall-task-item ${task.isCompleted ? "completed" : ""}`}
            style={{ backgroundColor: task.color }}
            tabIndex={0}
            aria-label={`Opgave: ${task.title}, Kategori: ${task.category}, Deadline: ${task.deadline}, Vigtighed: ${task.priority}`}
          >
            <div>
    <h3>{task.title}</h3>
    <p>{task.category}</p>
    <p>{task.deadline}</p>
    <p>{task.priority}</p>
  </div> {/* Liste over opgaver */}
            <div className="overall-task-buttons">
              {!task.isCompleted && (
                <button
                  className="overall-complete-button"
                  onClick={() => markComplete(task.id)}
                  aria-label="Markér opgave som fuldført"
                >
                  <img
                    src={task.isCompleted ? "src/assets/done-button-active.png" : "src/assets/done-button-not-active.png"}
                    alt={task.isCompleted ? "Complete" : "Incomplete"}
                  />
                </button>
              )}
              <button
                className="overall-delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label="Slet opgave"
              >
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
