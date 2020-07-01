// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("seedAndVisit", () => {
  cy.server();
  cy.route("GET", "http://localhost:3000/product", "fixture:products");
  cy.visit("/");
});

Cypress.Commands.add("addProductsAndGoToCheckout", (goToCheckout = true) => {
  cy.get("app-select-quantity > div > button:nth-child(3)").eq(1).click();
  cy.get(".add-to-cart").eq(1).click();

  cy.get("app-select-quantity > div > button:nth-child(3)").eq(2).click();
  cy.get(".add-to-cart").eq(2).click();

  cy.get("#showCartModal").click({ force: true });

  if (goToCheckout) {
    cy.get("#routeToCheckout").click();
  }
});
