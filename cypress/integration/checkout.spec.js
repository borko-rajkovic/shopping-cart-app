/// <reference types="Cypress" />

describe("Checkout", () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it("should give error if form invalid", () => {
    cy.addProductsAndGoToCheckout();

    cy.get("#firstName").type("Invalid1", { delay: 100 });
    cy.get("#secondName").type("Valid", { delay: 100 });
    cy.get("#address").type("Valid", { delay: 100 });
    cy.get("#telephoneNumber").type("+1234567890", { delay: 100 });

    cy.get("#shippingLabel").should("contain", "(NOT OK)");
    cy.get("#firstNameInvalidFeedback").should("exist");
  });

  it("should not give error if form is valid", () => {
    cy.addProductsAndGoToCheckout();

    cy.get("#firstName").type("Valid", { delay: 100 });
    cy.get("#secondName").type("Valid", { delay: 100 });
    cy.get("#address").type("Valid", { delay: 100 });
    cy.get("#telephoneNumber").type("+1234567890", { delay: 100 });

    cy.get("#shippingLabel").should("contain", "(OK)");
    cy.get("#firstNameInvalidFeedback").should("not.exist");
  });
});
