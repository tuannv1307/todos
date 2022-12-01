import Todos from "./Todos";
import { Provider } from "react-redux";
import store from "../../store/store";
describe("Todos.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport(1000, 500);
    cy.mount(
      <Provider store={store}>
        <Todos
          todos={[
            { id: "1", name: "tuasn", completed: false },
            { id: "2", name: "dawda", completed: true },
          ]}
        />
      </Provider>
    );

    cy.get('[data-hook="todo"]').first().should("have.text", "tuasn");
  });
});
