import App from "./App";

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(2000);
  // });

  it("is true", () => {
    cy.viewport(1000, 1000);
    expect(true).to.be.true; // yup, fine
  });

  it("show mount with h1 in Header", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="title"]').should("have.text", "todos");
  });
  it("show mount with background-color h1 in header", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="App"]').should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
  });
  it("sets onkeydown", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="new-todo"]')
      .type("{enter}abc")
      .focus()
      .trigger("keydown", { key: "Enter" });

    cy.get('[data-hook="todo"]').should("have.text", "abc");

    cy.wait(2000);
  });

  it("show mount with toggle-all in Todos", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="new-todo"]')
      .type("{enter}bcd")
      .focus()
      .trigger("keydown", { key: "Enter" });

    cy.wait(2000);

    cy.get('[data-hook="toggle-all"]').click();

    cy.wait(2000);
  });

  it("show mount with check in todo", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="new-todo"]')
      .type("{enter}cde")
      .focus()
      .trigger("keydown", { key: "Enter" });

    cy.wait(2000);

    cy.get('[data-hook="todo"]')
      .first()
      .get('[data-hook="toggle"]')
      .click({ multiple: true });
    cy.wait(2000);
  });

  it("show mount with delete todo in Todo", () => {
    cy.viewport(1000, 1000);

    cy.mount(<App />);

    cy.get('[data-hook="new-todo"]')
      .type("{enter}def")
      .focus()
      .trigger("keydown", { key: "Enter" });

    cy.wait(2000);

    cy.get('[data-hook="todo"]')
      .first()
      .get('[data-hook="destroy"]')
      .first()
      .invoke("show")
      .wait(2000)
      .click({ multiple: true });
    cy.wait(2000);
  });

  it("show mount with edit input in Todo", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="new-todo"]')
      .type("efg")
      .focus()
      .trigger("keydown", { key: "Enter" });

    cy.wait(2000);

    cy.get('[data-hook="complete"]').dblclick();

    cy.wait(2000);
    cy.get('[data-hook="edit"]')
      .type("200000")
      .wait(2000)
      .blur({ force: true });
    cy.wait(2000);
  });

  it("show mount with toggle-all in Todos", () => {
    cy.viewport(1000, 1000);

    cy.mount(<App />);

    cy.get('[data-hook="toggle-all"]').wait(2000).click();

    cy.wait(2000);
  });

  it("show mount with toggle-all in Todos", () => {
    cy.viewport(1000, 1000);

    cy.mount(<App />);

    cy.get('[data-hook="toggle-all"]').wait(2000).click();
    cy.wait(2000);
  });

  it("show mount with change item left in Footer", () => {
    cy.viewport(1000, 1000);

    cy.mount(<App />);

    cy.get('[data-hook="length-item-left"]')
      .invoke("show")
      .should("have.text", 4);
  });

  it("show mount with filters status in Footer", () => {
    cy.viewport(1000, 1000);

    cy.mount(<App />);

    cy.wait(2000);

    cy.get('[data-hook="filter-all"]')
      .invoke("show")
      .should("have.text", "All")
      .click();

    cy.wait(5000);

    cy.get('[data-hook="filter-active"]')
      .invoke("show")
      .should("have.text", "Active")
      .click();

    cy.wait(5000);

    cy.get('[data-hook="filter-completed"]')
      .invoke("show")
      .should("have.text", "Completed")
      .click();

    cy.wait(5000);
  });

  it("show mount with check in todo", () => {
    cy.viewport(1000, 1000);
    cy.mount(<App />);

    cy.get('[data-hook="new-todo"]')
      .type("{enter}c")
      .focus()
      .trigger("keydown", { key: "Enter" });

    cy.wait(2000);

    cy.get('[data-hook="todo"]')
      .first()
      .get('[data-hook="toggle"]')
      .first()
      .click({ multiple: true });
    cy.wait(2000);
  });

  it("show mount with clear completed status in Footer", () => {
    cy.viewport(1000, 1000);

    cy.mount(<App />);

    cy.get('[data-hook="clear-completed"]')
      .invoke("show")
      .click({ multiple: true });
  });
});
