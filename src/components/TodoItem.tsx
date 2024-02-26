import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

interface Todo {
  id: number;
  title: string;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  setEditingId: (id: number | null) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
  isEditing,
  setEditingId,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (!newTitle.trim()) {
      toast.error("Title should not be empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setNewTitle(todo.title);
      return;
    }
    onUpdate(todo.id, newTitle);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-2 bg-white shadow-sm rounded mb-2">
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
        />
      ) : (
        <span className="text-sm text-gray-800 w-full mb-2 sm:mb-0 sm:w-auto">
          {todo.title}
        </span>
      )}
      <div className="flex justify-end gap-2 pl-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditingId(todo.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
