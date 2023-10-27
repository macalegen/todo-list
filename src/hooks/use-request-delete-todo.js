import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useRequestDeleteTodo = (setIsLoading) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDeleteTodo = () => {
    setIsLoading(true);
    setIsDeleting(true);

    const todoDbRef = ref(db, "todos/1");

    remove(todoDbRef)
      .then((response) => {
        console.log("Todo deleted, server responce", response);
      })
      .finally(() => {
        setIsLoading(false);
        setIsDeleting(false);
      });
  };

  return { requestDeleteTodo, isDeleting };
};
