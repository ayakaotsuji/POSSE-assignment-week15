import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
  const [input, setInput] = useState("");

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = (event) => {
  event.preventDefault();

  const text = input.trim();

  if (text === "") return;

  setTasks([
    ...tasks,
    {
      id: Date.now(),
      text,
      done: false,
    },
  ]);

  setInput("");
};

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
};

  return (
    <main className="p-4">
  <h1 className="text-2xl font-bold">タスク管理</h1>

  <form onSubmit={addTask} className="flex gap-2 mt-4">
    
    <input
      className="border rounded px-3 py-2 flex-1"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      placeholder="新しいタスクを入力..."
    />
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      追加
    </button>
  </form>
  
  <ul className="space-y-2 mt-4">
  {tasks.map((task) => (
    <li
  key={task.id}
  className="flex items-center gap-2"
>
  <span
    onClick={() => toggleTask(task.id)}
    className={`flex-1 cursor-pointer ${
      task.done ? "line-through text-gray-400" : ""
    }`}
  >
    {task.text}
  </span>

  <button
    onClick={() => deleteTask(task.id)}
    className="text-red-400 hover:text-red-600 text-sm"
  >
    削除
  </button>
</li>

  ))}
</ul>

</main>
  );
}

export default App;