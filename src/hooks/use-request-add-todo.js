import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useRequestAddTodo = () => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAddTodo = (title) => {
    setIsCreating(true);

    const todosDbRef = ref(db, "todos");

    push(todosDbRef, {
      title: title,
    })
      .then((response) => {
        console.log("Todo added, server pesponse:", response);
      })
      .finally(() => setIsCreating(false));
  };
  return {
    isCreating,
    requestAddTodo,
  };
};
