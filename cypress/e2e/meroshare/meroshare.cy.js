describe('Meroshare Automation', () => {
  const data = require("../../fixtures/data.json")
  describe('Meroshare automation', () => {
    data.map((result) => {
      it('Buy new share from automation', () => {
        cy.log(result)
        cy.visit('/');
        cy.get('#username').clear().type(result.username).should('have.value', result.username);
        cy.get('#password').clear().type(result.password).should('have.value', result.password);
        // select the DP
        cy.get("#selectBranch").click();
        cy.get('ul li').contains(result.dp).click();

      // click login button 
      cy.get('button').contains("Login").click();


        // goto asba page 
        cy.get('li.nav-item').contains("My ASBA").click();


        // get the share to purchase 
        cy.get('company-list').contains("test").click();


      });
    });
  });
});