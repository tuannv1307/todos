import React, { memo, useState, ChangeEvent } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { st, classes } from "./Header.st.css";
import { useDispatch } from "react-redux";
import { createTodo } from "../../store/todoReducer";

export type ItemProps = {
  name: string;
  isShowToggle: boolean;
};

// type todos = {
//   id: string;
//   name: string;
//   completed: boolean;
//   editting: boolean;
// };

const Header = () => {
  const [valueInput, setValueInput] = useState("");

  const dispatch = useDispatch();

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const todo = {
      id: uuidv4(),
      name: valueInput,
      completed: false,
      editting: false,
    };
    if (!valueInput) {
      return;
    }
    if (e.key === "Enter") {
      dispatch(createTodo(todo));
      setValueInput("");
    } else if (e.key === "Escape") setValueInput("");
  };
  return (
    <div className={st(classes.root)}>
      <h1 className={st(classes.title)} data-hook="title">
        todos
      </h1>
      <input
        type="text"
        value={valueInput}
        className={st(classes.newTodo)}
        placeholder="What needs to be done?"
        onChange={handleOnChangeInput}
        onKeyDown={handleAddTodo}
        autoFocus
        data-hook="new-todo"
      />
    </div>
  );
};
export default memo(Header);
