import { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "./services/todosService";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getAllTodos();
      if (!response.error) {
        setTodos(response.data || []);
      } else {
        console.error(response.message);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async (title: string) => {
    const response = await createTodo(title);

    if (!response.error && response.data) {
      const newTodo = {
        id: response.data.id,
        title: title,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    } else {
      toast.error("Something went wrong, try again later", {
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
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deleteTodo(id);

    if (!response.error) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      toast(response.message);
    }
  };

  const handleUpdate = async (id: number, newTitle: string) => {
    const response = await updateTodo(id, newTitle);

    if (!response.error && response.data) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col ">
     
      <div className=" overflow-auto max-h-[50vh] p-5	flex-1  border-2 w-full border-gray-100 flex justify-center ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor
        velit sit amet diam congue, non faucibus mauris vulputate. Pellentesque
        tortor risus, posuere nec metus non, sollicitudin sagittis ligula.
        Suspendisse pretium, quam quis auctor placerat, velit ligula venenatis
        ex, id posuere erat dolor sit amet massa. Aenean nec finibus est. Nam
        imperdiet nisi leo, nec dictum velit congue in.
      </div>
      <div className="flex  max-h-[50vh] overflow-auto flex-col sm:flex-col md:flex-row lg:flex-row  flex-1  w-full ">
        <div className="flex-1 border-2 border-gray-100 flex justify-center items-center p-4">
          <AddTodoForm onAdd={handleAdd} />
        </div>
        <div className="flex-1 overflow-auto border-2 border-gray-100 flex justify-center  p-4">
          <TodoList
            todos={todos}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
