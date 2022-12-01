import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import store, { type AppDispatch } from "./store/store";
import { TodoLists, TodoItem, setCurrentTodo } from "./store/todoReducer";
import Header from "./components/Header";
import Todos from "./components/Todos";
import Footer from "./components/Footer";
import { st, classes } from "./App.st.css";
import "./globals.st.css";
import _ from "lodash";

const showTypeTodo = (todoLists?: [], type?: string) => {
  switch (type) {
    case "ACTIVE":
      return todoLists?.filter((todo: TodoItem) => todo.completed === false);
    case "COMPLETED":
      return todoLists?.filter((todo: TodoItem) => todo.completed === true);
    default:
      return todoLists;
  }
};

function App() {
  const todos: TodoLists = useSelector(
    (state: { todo: TodoLists }) => state.todo
  );

  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let todoLists;
    const local: any = localStorage.getItem("TODOS");
    todoLists = JSON.parse(local);
    if (todoLists) {
      dispatch(setCurrentTodo(todoLists));
    }
  }, []);

  const todoList = todos?.TodoList;

  const lengthTodoList: number | undefined = todoList?.length;
  return (
    <div className={st(classes.root)} data-hook="App">
      <Header />

      <Todos
        todos={showTypeTodo(todoList, status)}
        lengthTodoList={lengthTodoList}
      />
      {lengthTodoList && lengthTodoList > 0 ? (
        <Footer
          status={status}
          todos={todoList}
          {...todoList}
          setStatus={(type) => !_.isUndefined(type) && setStatus(type)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function AppProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppProvider;
