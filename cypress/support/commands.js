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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-real-events";

Cypress.Commands.add("LOGIN_CHECKER", () => {

cy.session('login', ()=>{
  cy.visit("http://10.15.1.102/login");
  cy.get('input[name="username"]').type(Cypress.env("username"));
  cy.get('input[name="password"]').type(Cypress.env("password"));
  cy.intercept({
    method: "POST",
    url: "http://10.15.1.102/api/auth/login/",
  }).as("loginData");
  cy.get('button[type="submit"]').click();
  cy.wait("@loginData")
    .its("response.body[username]")
    .should("eq", "dbrankovic");
})

  // cy.visit("http://10.15.1.102/login");
  // cy.get('input[name="username"]').type(Cypress.env("username"));
  // cy.get('input[name="password"]').type(Cypress.env("password"));
  // cy.intercept({
  //   method: "POST",
  //   url: "http://10.15.1.102/api/auth/login/",
  // }).as("loginData");
  // cy.get('button[type="submit"]').click();
  // cy.wait("@loginData")
  //   .its("response.body[username]")
  //   .should("eq", "dbrankovic");
  
});

Cypress.Commands.add("getInputName", (nameSelector) => {
  return cy.get(`input[name="${nameSelector}"]`);
});
Cypress.Commands.add("getDivTitle", (titleSelector) => {
  return cy.get(`div[title="${titleSelector}"]`);
});
