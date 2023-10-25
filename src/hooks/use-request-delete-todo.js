import { useState } from "react";

export const useRequestDeleteTodo = (refreshTodos) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDeleteTodo = () => {
    setIsDeleting(true);

    fetch("http://localhost:3001/todos/1", {
      method: "DELETE",
    })
      .then((rawResponce) => rawResponce.json())
      .then((response) => {
        console.log("Todo deleted, server pesponse:", response);
        refreshTodos();
      })
      .finally(() => setIsDeleting(false));
  };
  return {
    isDeleting,
    requestDeleteTodo,
  };
};
