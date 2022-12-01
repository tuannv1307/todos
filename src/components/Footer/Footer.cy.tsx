import Footer from "./Footer";
import _ from "lodash";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("Footer.cy.tsx", () => {
  it("show mount", () => {
    cy.mount(
      <Provider store={store}>
        <Footer
          status="ALL"
          todos={[
            { id: "1", name: "tuasn", completed: false },
            { id: "2", name: "dawda", completed: true },
          ]}
        />
      </Provider>
    );
  });

  it("show mount with handleSetStatus ", () => {
    const handleSetStatus = cy.spy().as("handleSpy");

    cy.mount(
      <Provider store={store}>
        <Footer
          status="ALL"
          setStatus={handleSetStatus}
          todos={[
            { id: "1", name: "tuasn", completed: false },
            { id: "2", name: "dawda", completed: true },
          ]}
        />
      </Provider>
    );

    cy.get('[data-hook="filter-active"]').click();
    cy.get("@handleSpy").should("be.calledOnceWith", "ACTIVE");
  });

  it("show mount with button clear-completed ", () => {
    cy.mount(
      <Provider store={store}>
        <Footer
          status="ALL"
          todos={[
            { id: "1", name: "tuasn", completed: false },
            { id: "2", name: "dawda", completed: true },
          ]}
        />
      </Provider>
    );

    cy.get('[data-hook="clear-completed"]').click();
  });
});
