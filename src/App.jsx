import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      setTask([]);
    }
  }, [tasks]);

  const handleAdd = () => {
    setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
    setTask("");
  };

  const handleEdit = (id) => {
    let t = tasks.filter((items) => items.id === id);
    setTask(t[0].task);
    let newTasks = tasks.filter((items) => {
      return items.id !== id;
    });
    setTasks(newTasks);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleDelete = (id) => {
    let newTasks = tasks.filter((items) => {
      return items.id !== id;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };
  const handleChecked = (e) => {
    let id = e.target.id;
    let index = tasks.findIndex((items) => {
      return items.id === id;
    });
    let newsTasks = [...tasks];
    newsTasks[index].isCompleted = !newsTasks[index].isCompleted;
    setTasks(newsTasks);
  };

  return (
    <>
      <div className="container h-screen w-screen flex justify-center items-center">
        <div className="todo-card flex border border-green-500 rounded-lg w-[60vw] h-[80vh] p-8 items-center shadow-lg flex-col gap-2  max-sm:w-[95vw] max-sm:h-[85vh] max-sm:mt-5 max-md:w-[70vw] max-md:h-[70vh] absolute overflow-x-hidden overflow-y-hidden top-5 max-sm:top-0">
          <div className="todobar text-center">
            <h1 className="font-bold">ADD YOUR TASKS</h1>
            <input
              onChange={handleChange}
              value={task}
              type="text"
              placeholder="Set Up A Task"
              className="border p-1 border-green-500 w-80 rounded-md m-10 font-medium"
            />
          </div>
          <div className="gap-2 flex font-medium">
            <input
              type="checkbox"
              onChange={toggleFinished}
              checked={showFinished}
            />
            Show Finished Tasks
          </div>
          <div>
            <h2 className="font-bold">YOUR TASKS</h2>
          </div>
          <div
            className={`tasks-container flex flex-col w-[98%]  h-[100%] ${
              tasks.length > 0 ? "overflow-y-auto" : ""
            }`}
          >
            {tasks.map((items) => {
              return (
                (showFinished || !items.isCompleted) && (
                  <div
                    key={items.id}
                    className="tasks flex flex-row justify-between items-center w-[96%] gap-4 m-1"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="checkbox"
                        id={items.id}
                        checked={items.isCompleted}
                        onChange={handleChecked}
                      />
                      <p
                        className={`${
                          items.isCompleted
                            ? "line-through text-gray-500"
                            : "text-black"
                        } break-words overflow-wrap w-full`}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {items.task}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="flex justify-center items-center h-7 w-7 border border-green-500 rounded-md bg-green-500 p-1 m-1 text-sm"
                        onClick={() => handleEdit(items.id)}
                      >
                        <FaEdit className="invert" />
                      </button>
                      <button
                        className="flex justify-center items-center h-7 w-7 border border-green-500 rounded-md bg-green-500 text-sm p-1"
                        onClick={() => handleDelete(items.id)}
                      >
                        <MdDeleteForever className="invert" />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>

          <button
            className="flex border border-green-500 rounded-full h-20 w-20 fixed bottom-[10%] max-sm:bottom-4 bg-green-500 shadow-md items-center justify-center"
            onClick={handleAdd}
            disabled={task.length < 3}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus invert"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        </div>
    </>
  );
}

export default App;
