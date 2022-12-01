import { memo } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import Todo from "../Todo";
import { checkAll } from "../../store/todoReducer";
import { st, classes } from "./Todos.st.css";

export type TodosProps = {
  todos?: { id: string; name: string; completed: boolean }[];
  lengthTodoList?: number;
};

const Todos = ({ todos, lengthTodoList }: TodosProps) => {
  const dispatch = useDispatch();

  const checkedAll = _.every(todos, ["completed", true]);

  const handleCheckAll = () => {
    if (checkedAll) {
      dispatch(checkAll({ isChecked: false }));
    } else {
      dispatch(checkAll({ isChecked: true }));
    }
  };

  return (
    <div className={st(classes.root)} data-hook="todos">
      {lengthTodoList && lengthTodoList > 0 ? (
        <>
          <input
            id="toggle-all"
            className={st(classes.toggleAll, { checkedAll: checkedAll })}
            onChange={() => {
              console.log("check all");
            }}
            type="checkbox"
            checked={checkedAll}
            data-hook="toggle-all-input"
          />
          <label
            htmlFor="toggle-all"
            onClick={handleCheckAll}
            data-hook="toggle-all"
          >
            Mark all as complete
          </label>
        </>
      ) : (
        ""
      )}

      <div className={st(classes.todoList)}>
        {_.map(todos, (todo, index) => (
          <Todo {...todo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default memo(Todos);
