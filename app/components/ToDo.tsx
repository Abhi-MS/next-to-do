"use client";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const ToDo = () => {
  useEffect(() => {
    getTasks();
  }, []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // CREATE
  function addTask() {
    if (newTask.trim() !== "") {
      const updatedTasks = [
        ...tasks,
        { id: Date.now(), text: newTask, done: false },
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasksToDo", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  }

  // READ
  function getTasks() {
    const storedTasks = localStorage.getItem("tasksToDo");
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(parsedTasks);
  }

  // UPDATE
  function toggleTask(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasksToDo", JSON.stringify(updatedTasks));
  }

  // DELETE
  function deleteTasks() {
    const updatedTasks = tasks.filter((task) => !task.done);
    setTasks(updatedTasks);
    localStorage.setItem("tasksToDo", JSON.stringify(updatedTasks));
  }

  return (
    <div className="p-5">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Add a new task"
          className="border p-2 w-[300px] rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Add
        </button>
      </form>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="w-[300px] border p-2 mb-2">
            <span>{task.text}</span>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="ml-2"
            />
          </li>
        ))}
      </ul>
      <button
        className="bg-red-500 text-white p-2 rounded mt-4"
        onClick={() => deleteTasks()}
      >
        Delete Completed Task
      </button>
    </div>
  );
};

export default ToDo;
