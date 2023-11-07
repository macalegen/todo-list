import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useRequestDeleteTodo = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDeleteTodo = (id) => {
    setIsDeleting(true);

    const todosDbRef = ref(db, `todos/${id}`);

    remove(todosDbRef)
      .then((response) => {
        console.log("Todo deleted, server pesponse:", response);
      })
      .finally(() => setIsDeleting(false));
  };
  return {
    isDeleting,
    requestDeleteTodo,
  };
};
