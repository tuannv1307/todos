import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TodoLists = {
  TodoList?: [];
};

export type TodoItem = {
  id?: string;
  name?: string;
  completed?: boolean;
};

export type Actions = {
  createTodo: (state: any, action: any) => void;
  setCurrentTodo: (state: any, action: any) => void;

  btnCheckbox: (state: any, action: any) => void;
  deleteTodo: (state: any, action: any) => void;
  editTodo: (state: any, action: any) => void;
  clearCompleted: (state: any) => void;
  checkAll: (state: any, action: any) => void;
};

const initialData: TodoLists = {
  TodoList: [],
};

const todoListSlice = createSlice<TodoLists, Actions>({
  name: "todo",
  initialState: initialData as TodoLists,
  reducers: {
    createTodo: (state, action) => {
      if (action.payload) {
        state.abc = true;
        state.TodoList = [...state.TodoList, action.payload];
        localStorage.setItem("TODOS", JSON.stringify(state.TodoList));
      }
    },

    setCurrentTodo: (state, action) => {
      state.TodoList = action.payload;
    },

    deleteTodo: (state, action) => {
      const {
        payload: { id },
      } = action;

      if (id) {
        state.TodoList = state.TodoList.filter(
          (todo: TodoItem) => todo.id !== id
        );

        localStorage.setItem("TODOS", JSON.stringify(state.TodoList));
      }
    },

    editTodo: (state, action) => {
      const {
        payload: { name, id },
      } = action;
      if (id) {
        state.TodoList = state.TodoList.map((todo: TodoItem) =>
          todo.id === id ? { ...todo, name } : todo
        );

        localStorage.setItem("TODOS", JSON.stringify(state.TodoList));
      }
    },

    btnCheckbox: (state, action) => {
      const {
        payload: { id, isChecked },
      } = action;

      if (id) {
        state.TodoList = state.TodoList.map((todo: TodoItem) =>
          todo.id === id ? { ...todo, completed: isChecked } : todo
        );
        localStorage.setItem("TODOS", JSON.stringify(state.TodoList));
      }
    },

    clearCompleted: (state) => {
      state.TodoList = state.TodoList.filter(
        (todo: TodoItem) => todo.completed === false
      );
      localStorage.setItem("TODOS", JSON.stringify(state.TodoList));
    },

    checkAll: (state, action) => {
      const {
        payload: { isChecked },
      } = action;

      state.TodoList = state.TodoList.map((todo: TodoItem) => ({
        ...todo,
        completed: isChecked,
      }));

      localStorage.setItem("TODOS", JSON.stringify(state.TodoList));
    },
  },
});

export const {
  createTodo,
  btnCheckbox,
  setCurrentTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  checkAll,
} = todoListSlice.actions;

export default todoListSlice.reducer;
