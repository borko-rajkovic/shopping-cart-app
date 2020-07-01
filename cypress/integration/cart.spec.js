/// <reference types="Cypress" />

describe("Cart", () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('should disable button "Go to Checkout" when 0 products in cart', () => {
    cy.get("#showCartModal").click();

    cy.get("#routeToCheckout").should("be.disabled");
  });

  it('should enable button "Go to Checkout" when > 0 products in cart', () => {
    cy.addProductsAndGoToCheckout(false);

    cy.get("#routeToCheckout").should("not.be.disabled");
  });
});
