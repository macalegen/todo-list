import { useState, useEffect } from "react";

export const UseRequestGetTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { todos, isLoading };
};
