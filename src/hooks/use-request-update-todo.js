import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export const useRequestUpdateTodo = (setIsLoading) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdateTodo = () => {
    setIsLoading(true);
    setIsUpdating(true);

    const todoDbRef = ref(db, "todos/1");

    set(todoDbRef, {
      title: "New todo updated",
    })
      .then((response) => {
        console.log("Todo updated, server responce:", response);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(false);
      });
  };

  return { requestUpdateTodo, isUpdating };
};
