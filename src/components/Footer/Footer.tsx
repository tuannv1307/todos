import { memo } from "react";
import _ from "lodash";
import { st, classes } from "./Footer.st.css";

import { clearCompleted } from "../../store/todoReducer";
import { useDispatch } from "react-redux";

export type FooterProps = {
  todos?: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  setStatus?: (type?: "ALL" | "ACTIVE" | "COMPLETED") => void;
  status?: string;
};

const Footer = ({ setStatus, todos, status }: FooterProps) => {
  const dispatch = useDispatch();

  const lengthItemLeft = todos?.filter(
    (todo) => todo?.completed === false
  ).length;

  const lengthCompleted: number | undefined = todos?.filter(
    (todo) => todo?.completed === true
  ).length;

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const handleShowTodo = (type: string) => {
    _.isFunction(setStatus) && setStatus(type);
  };

  return (
    <div className={st(classes.root)}>
      <span className={st(classes.todoCout)}>
        <strong data-hook="length-item-left">
          {lengthItemLeft ? lengthItemLeft : 0}
        </strong>
        <span>items</span>
        {`  left`}
      </span>
      <ul className={st(classes.filters)}>
        <li>
          <a
            href="#"
            data-hook="filter-all"
            className={st(`${status === "ALL" ? `${classes.selected}` : ""}`)}
            onClick={() => handleShowTodo("ALL")}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={st(
              `${status === "ACTIVE" ? `${classes.selected}` : ""}`
            )}
            data-hook="filter-active"
            onClick={() => handleShowTodo("ACTIVE")}
          >
            Active
          </a>
        </li>
        <li>
          <a
            data-hook="filter-completed"
            href="#/completed"
            className={st(
              `${status === "COMPLETED" ? `${classes.selected}` : ""}`
            )}
            onClick={() => handleShowTodo("COMPLETED")}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className={st(classes.clearCompleted)}
        onClick={handleClearCompleted}
        data-hook="clear-completed"
      >
        {lengthCompleted ? `Clear completed` : ""}
      </button>
    </div>
  );
};
export default memo(Footer);
