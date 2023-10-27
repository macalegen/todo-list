import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useRequestAddTodo = (refreshTodos) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const requestAddTodo = () => {
    setIsCreating(true);

    const todosDbRef = ref(db, "todos");

    push(todosDbRef, {
      title: newTodo,
    })
      .then((response) => {
        console.log("Todo added, server response:", response);
        setNewTodo("");
        refreshTodos();
      })
      .finally(() => setIsCreating(false));
  };

  return { requestAddTodo, isCreating, newTodo, setNewTodo };
};
