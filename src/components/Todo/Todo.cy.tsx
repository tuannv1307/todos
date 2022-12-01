import Todo from "./Todo";
import { Provider } from "react-redux";
import store from "../../store/store";
describe("Todo.cy.tsx", () => {
  it("show mount", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
      </Provider>
    );
  });

  it("show mount with doubleClick edit", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
      </Provider>
    );
    cy.get('[data-hook="complete"]').dblclick();
  });

  it("show mount with check text", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
      </Provider>
    );
    cy.get('[data-hook="complete"]').should("have.text", "dawdad");
  });

  it("show mount with click toggle", () => {
    const is = true;
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={is} />
      </Provider>
    );
    cy.get('[data-hook="toggle"]').click();
  });

  it("show mount with destroy", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
      </Provider>
    );

    cy.get('[data-hook="destroy"]').invoke("show").click();
  });

  it("show mount with blur", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
        <Todo id="2" name="222233" completed={true} />
      </Provider>
    );
    // cy.clock();
    cy.get('[data-hook="complete"]').dblclick();
    // cy.tick(50000000);
    cy.get('[data-hook="edit"]').blur();
  });

  it("show mount with focus", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
        <Todo id="2" name="222233" completed={true} />
      </Provider>
    );
    // cy.clock();
    cy.get('[data-hook="complete"]').last().dblclick();
    // cy.tick(50000000);
    cy.get('[data-hook="edit"]').focus();
  });

  it("show mount with length", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
        <Todo id="2" name="222233" completed={true} />
      </Provider>
    );

    cy.get('[data-hook="todo"]').should(($div) => {
      expect($div).to.have.length(2);
      expect($div.eq(0)).to.contain("dawdad");
      expect($div.eq(1)).to.contain("222233");
    });
  });

  it("show mount with filter first last", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
        <Todo id="2" name="222233" completed={true} />
      </Provider>
    );
    cy.get('[data-hook="todo"]').first();
    cy.get('[data-hook="todo"]').filter(':contains("222233")');
    cy.get('[data-hook="todo"]').last();
  });

  it("show mount with should value", () => {
    cy.mount(
      <Provider store={store}>
        <Todo id="1" name="dawdad" completed={false} />
        <Todo id="2" name="222233" completed={true} />
      </Provider>
    );

    cy.get('[data-hook="complete"]').first().dblclick();
    cy.get('[data-hook="edit"]').focus().should("have.value", "dawdad");
  });
});
