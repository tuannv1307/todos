import { memo, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { btnCheckbox, deleteTodo, editTodo } from "../../store/todoReducer";
import { st, classes } from "./Todo.st.css";

export type TodoProps = {
  id?: any;
  name?: string;
  completed?: boolean;
};

const Todo = ({ id, name, completed }: TodoProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [valueEdit, setValueEdit] = useState<string | undefined>(name);

  const dispatch = useDispatch();

  const handleOnClickBtnCheckbox = (id: string) => {
    const isChecked = !completed;
    dispatch(btnCheckbox({ id, isChecked }));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleDoubleClickEdit = () => {
    setIsEdit(true);
  };

  const handleOnBlueIsEdit = (id: string) => {
    const name = valueEdit;
    if (!name) {
      dispatch(deleteTodo({ id }));
    }
    dispatch(editTodo({ name, id }));
    setIsEdit(false);
  };

  const handleEditTodo = (
    id: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const name = valueEdit;

    if (e.key === "Enter") {
      dispatch(editTodo({ name, id }));
      if (!name) {
        handleDeleteTodo(id);
      }
      setIsEdit(false);
    } else if (e.key === "Escape") {
      setIsEdit(false);
    }
  };

  const handleOnChangeEdit = (e: React.FormEvent<HTMLInputElement>) => {
    setValueEdit(e.currentTarget.value);
  };
  return (
    <div className={st(classes.root, { isEdit })} key={id} data-hook="todo">
      {isEdit ? (
        <input
          type="text"
          className={st(classes.edit)}
          value={valueEdit}
          onBlur={() => handleOnBlueIsEdit(id)}
          onChange={handleOnChangeEdit}
          onKeyDown={(e) => handleEditTodo(id, e)}
          autoFocus
          data-hook="edit"
        />
      ) : (
        <>
          <div
            onClick={() => handleOnClickBtnCheckbox(id)}
            className={st(classes.toggle, { checked: completed })}
            style={{}}
            data-hook="toggle"
          />

          <label
            className={st(classes.complete, { completed })}
            onDoubleClick={handleDoubleClickEdit}
            data-hook="complete"
          >
            {name}
          </label>

          <button
            data-hook="destroy"
            className={st(classes.destroy)}
            onClick={() => handleDeleteTodo(id)}
          ></button>
        </>
      )}
    </div>
  );
};

export default memo(Todo);
