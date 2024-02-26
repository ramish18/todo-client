import React, { FormEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";

const AddTodoForm: React.FC<{ onAdd: (title: string) => void }> = ({
  onAdd,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
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
      return
    }
    onAdd(title);
    setTitle(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 mb-4"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
