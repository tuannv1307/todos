import Header from "./Header";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("Header.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport(1500, 1000);
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  it("show mount with attr input", () => {
    cy.viewport(1500, 1000);
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    cy.get('[data-hook="new-todo"]').should("have.attr", "placeholder");
  });

  it("show mount with focus", () => {
    cy.viewport(1500, 1000);
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    cy.get('[data-hook="new-todo"]').first().focus();
  });
});
