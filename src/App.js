import styles from "./app.module.css";
import { useState } from "react";
import {
  useRequestGetTodos,
  useRequestAddTodo,
  useRequestUpdateTodo,
  useRequestDeleteTodo,
} from "./hooks";

export const App = () => {
  const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

  const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);
  const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
  const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);
  const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [sorted, setSorted] = useState(false);

  const handleSearchChange = (e) => {
    setSearchPhrase(e.target.value);
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
          placeholder="Поиск"
          value={searchPhrase}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchChange}>Поиск</button>
        <button onClick={handleSortToggle}>
          {sorted ? "Сортировка выключена" : "Сортировка по алфавиту"}
        </button>
      </div>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        filteredTodos.map(({ id, title }) => (
          <div key={id} className={styles.todos}>
            {title}
          </div>
        ))
      )}
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

// import styles from "./app.module.css";
// import { useRequestGetTodos } from "./hooks/use-request-get-todos.js";
// import { useState } from "react";

// export const App = () => {
//   const { isLoading, setTodos, todos, updateTodos } = useRequestGetTodos();
//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [sorted, setSorted] = useState(false);

//   const handleAddTodo = () => {
//     const newTodo = {
//       id: Date.now(),
//       title: "Новое дело",
//     };

//     fetch("http://localhost:3001/todos", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newTodo),
//     })
//       .then((response) => response.json())
//       .then((createdTodo) => {
//         updateTodos(createdTodo);
//       })
//       .catch((error) => {
//         console.error("Error adding todo:", error);
//       });
//   };
//   const handleUpdateTodo = (id, updatedTitle) => {
//     const updatedTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         return {
//           ...todo,
//           title: updatedTitle,
//         };
//       }
//       return todo;
//     });

//     fetch(`http://localhost:3001/todos/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title: updatedTitle }),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setTodos(updatedTodos);
//       });
//   };

//   const handleDeleteTodo = (id) => {
//     fetch(`http://localhost:3001/todos/${id}`, {
//       method: "DELETE",
//     }).then(() => {
//       const updatedTodos = todos.filter((todo) => todo.id !== id);
//       setTodos(updatedTodos);
//     });
//   };

//   const handleSearchChange = (e) => {
//     setSearchPhrase(e.target.value);
//   };

//   const handleSortToggle = () => {
//     setSorted(!sorted);
//   };

//   const filteredTodos = Array.isArray(<link>todos</link>)
//     ? (<link>todos</link>).filter(
//         (todo) =>
//           todo.title &&
//           todo.title.toLowerCase().includes(searchPhrase.toLowerCase())
//       )
//     : [];

//   const sortedTodos = sorted
//     ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
//     : filteredTodos;

//   return (
//     <div className={styles.app}>
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Поиск"
//           value={searchPhrase}
//           onChange={handleSearchChange}
//         />
//         <button onClick={handleSortToggle}>
//           {sorted ? "Сортировка выключена" : "Сортировка по алфавиту"}
//         </button>
//         <button onClick={handleAddTodo}>Добавить дело</button>
//       </div>

//       {isLoading ? (
//         <div className={styles.loader}></div>
//       ) : (
//         sortedTodos.map(({ id, title }) => (
//           <div key={id} className={styles.todos}>
//             {title}
//             <button onClick={() => handleUpdateTodo(id, "Обновленное дело")}>
//               Обновить
//             </button>
//             <button onClick={() => handleDeleteTodo(id)}>Удалить</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };
