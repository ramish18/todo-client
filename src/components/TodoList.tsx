import React from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const isEmpty = todos.length === 0;

  return (
    <div className="max-w-md mx-auto w-full ">
      <h1 className="text-xl mb-2 mt-2">Todo List</h1>
      {isEmpty ? (
        <div className="text-center py-4">
          <p className="text-gray-600">
            Your todo list is currently empty. Start by adding a new task.
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
