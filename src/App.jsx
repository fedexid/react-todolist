import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [values, setValues] = useState("");

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
      id: Date.now(),
      title: values,
      completed: false,
    };

    values && setTasks([...tasks, addTasks]);
    setValues("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="container mx-auto h-screen rounded bg-slate-800 lg:my-6 lg:h-max lg:w-3/5">
      <div className="flex flex-col items-center justify-center rounded py-10">
        <h1 className="text-4xl font-bold text-white lg:text-6xl">
          Todo Lists
        </h1>
        <input
          type="text"
          className="my-4 h-8 w-3/4 max-w-80 rounded"
          onChange={(e) => setValues(e.target.value)}
          value={values}
          placeholder="Enter Tasks"
        />
        <button
          onClick={addTodos}
          type="submit"
          className="rounded bg-slate-400 px-4 py-2 font-bold drop-shadow-md transition ease-in-out hover:bg-slate-600"
        >
          Add Tasks
        </button>

        {tasks.map((task) => (
          <div
            className="my-2 flex w-3/5 items-center justify-between gap-2 text-white md:w-3/4 lg:w-1/2"
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
