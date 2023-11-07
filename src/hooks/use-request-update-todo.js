import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export const useRequestUpdateTodo = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdateTodo = (id, updatedTitle) => {
    setIsUpdating(true);

    const todosDbRef = ref(db, `todos/${id}`);

    set(todosDbRef, {
      title: updatedTitle,
    })
      .then((response) => {
        console.log("Todo updated, server pesponse:", response);
      })
      .finally(() => setIsUpdating(false));
  };
  return {
    isUpdating,
    requestUpdateTodo,
  };
};
