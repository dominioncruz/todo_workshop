import { useState, useEffect } from "react";
import { TodoProps } from "../components/Todo";
import axios from "axios";

const useTodos = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todo");
      setTodos(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (_id: string) => {
    try {
      await axios.delete(`/api/todo/${_id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Update a todo
  const updateTodo = async (_id: string, updatedFields: Partial<TodoProps>) => {
    try {
      const response = await axios.patch(`/api/todo/${_id}`, updatedFields);

      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === _id ? { ...todo, ...updatedFields } : todo
          )
        );
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Update a todo
  const createTodo = async (field: Partial<TodoProps>) => {
    try {
      const response = await axios.post("/api/todo", field);

      if (response.status === 201) {
        setTodos((prevTodos) => [...prevTodos, response.data]);
      } else {
        throw new Error("Failed to create todo");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, createTodo, deleteTodo, updateTodo };
};

export default useTodos;
