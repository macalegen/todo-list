import styles from "./app.module.css";
import { useState } from "react";
import debounce from "lodash/debounce";
import {
  useRequestGetTodos,
  useRequestAddTodo,
  useRequestUpdateTodo,
  useRequestDeleteTodo,
} from "./hooks";

export const App = () => {
  const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

  const { isLoading, todos } = useRequestGetTodos();
  const { isCreating, requestAddTodo, newTodo, setNewTodo } =
    useRequestAddTodo(refreshTodos);
  const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);
  const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [sorted, setSorted] = useState(false);

  const debouncedSearch = debounce((searchText) => {
    setSearchPhrase(searchText);
  }, 300);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    debouncedSearch(searchText);
  };

  const handleSortToggle = () => {
    setSorted(!sorted);
  };

  let sortedTodos = [...todos];

  if (sorted) {
    sortedTodos = sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  const filteredTodos = sortedTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search in todos"
          value={searchPhrase}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchChange}>Search</button>
        <button onClick={handleSortToggle}>
          {sorted ? "Sorting off" : "A - Z Sorting"}
        </button>
      </div>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        Object.entries(filteredTodos).map(([id, { title }]) => (
          <div key={id} className={styles.todos}>
            {title}
          </div>
        ))
      )}
      <input
        type="text"
        placeholder="New todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button disabled={isCreating} onClick={requestAddTodo}>
        Add Todo
      </button>
      <button disabled={isUpdating} onClick={requestUpdateTodo}>
        Update Todo
      </button>
      <button disabled={isDeleting} onClick={requestDeleteTodo}>
        Delete Todo
      </button>
    </div>
  );
};
