"use client";
import { useState, useEffect } from "react";

interface item {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  done?: boolean;
}

export const ToDoList: React.FC = () => {
  const API_URL = "http://localhost:8080";

  const [toDoItems, setToDoItems] = useState<item[]>([]);
  const [input, setInput] = useState<string>("");

  const fetchItems = async () => {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok)
      throw Error("Sorry, there was a problem getting your to do items");
    const listItems = await response.json();
    if (listItems.data) {
      setToDoItems(listItems.data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    const newItem: item = {
      title: input,
    };
    setToDoItems([...toDoItems, newItem]);
    setInput("");

    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(newItem),
    });
  };

  const deleteItem = async (item: item) => {
    const { id } = item;
    const newToDoItems = toDoItems.filter((item) => item.id !== id);
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    await setToDoItems(newToDoItems);
    await fetchItems();
  };

  const updateItem = async (item: item) => {
    const { id } = item;
    const selectedItem = toDoItems.filter((item) => item.id === id);
    const newItem: item = {
      title: item.title,
      done: !item.done,
    };
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    fetchItems();
  };

  return (
    <>
      {toDoItems.map((toDoItem: item, key) => (
        <div className="flex flex-col w-1/4 bg-white min-w-min">
          <div className="flex items-center justify-center">
            <p className="m-3 text-black" key={toDoItem.id}>
              {toDoItem.title}
            </p>
          </div>
          <button
            className=" min-w-min m-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {
              deleteItem(toDoItem);
            }}
          >
            Delete
          </button>
          <button
            className="m-2 min-w-min text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              updateItem(toDoItem);
            }}
          >
            {toDoItem.done === false ? "Mark as done" : "Done"}
          </button>
        </div>
      ))}
      <form
        className="w-6/12 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <input
          type="text"
          placeholder="Enter something here"
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2"
        ></input>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </>
  );
};
