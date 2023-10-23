import styles from "./app.module.css";
import { UseRequestGetTodos } from "./hooks/use-request-get-todos";

export const App = () => {
  const { isLoading, todos } = UseRequestGetTodos();

  return (
    <div className={styles.app}>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        todos.map(({ id, title }) => (
          <ul key={id} className={styles.todos}>
            <li>{title}</li>
          </ul>
        ))
      )}
    </div>
  );
};
