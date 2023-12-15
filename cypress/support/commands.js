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


Cypress.Commands.add("login", (password, username, dp) =>{
    // username and password input
    cy.get('#password').clear().type(password, {
        log: false
      })
      cy.get('#username').clear().type(username).should('have.value', username)

      // select the DP
      cy.get("#selectBranch").click();
      cy.get('ul li').contains(dp, {
        matchCase: false
      }).click();

      // click login button 
      cy.get('button').contains("Login").click();
})