import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [values, setValues] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5",
      );
      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodos = () => {
    let addTasks;

    addTasks = {
      title: values,
      completed: false,
    };

    values && setTasks((t) => [...t, addTasks]);
    setValues("");
  };

  const handleDelete = (id) => {
    setTasks((t) => t.filter((task) => task.id !== id));
  };

  const handleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredLists = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed === true;
    if (filter === "Not-Completed") return task.completed === false;
  });

  return (
    <div className="container mx-auto h-screen rounded bg-slate-800 lg:my-6 lg:h-max lg:w-3/5">
      <div className="flex flex-col items-center justify-center rounded py-10">
        <h1 className="text-4xl font-bold text-white lg:text-6xl">
          Todo Lists
        </h1>

        <div className="my-4 flex w-64 items-center space-x-2 lg:w-80">
          <input
            type="text"
            className="h-8 w-3/4 rounded"
            onChange={(e) => setValues(e.target.value)}
            value={values}
            placeholder="Enter Tasks"
          />
          <button
            onClick={addTodos}
            type="submit"
            className="h-8 w-1/4 rounded bg-slate-400 font-bold drop-shadow-md transition ease-in-out hover:bg-slate-600 lg:min-w-24"
          >
            <span className="block lg:hidden">➕</span>
            <span className="hidden lg:block">Add Tasks</span>
          </button>
        </div>

        <select
          className="mb-4 w-64 rounded p-2 lg:w-80"
          name="taskFilter"
          id="taskFilter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not-Completed">Not Completed</option>
        </select>

        {filteredLists.map((task) => (
          <div
            className="my-2 flex w-3/4 items-center justify-between gap-2 text-justify text-white lg:w-1/2"
            key={task.id}
          >
            <h2
              className={`text-md font-bold ${task.completed && "text-green-400 line-through"}`}
            >
              {task.title}
            </h2>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="h-4 w-4 outline outline-offset-2 outline-blue-500"
                onClick={() => handleCompleted(task.id)}
                defaultChecked={task.completed}
              />
              <button
                className="rounded bg-red-400 px-2 py-1 font-bold ring-2 ring-red-800 transition ease-in-out hover:bg-red-600"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
