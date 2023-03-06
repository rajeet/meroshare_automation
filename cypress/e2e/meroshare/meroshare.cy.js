describe('Meroshare Automation', () => {
  const data = require("../../fixtures/data.json")
  describe('Meroshare automation', () => {
    data.map((result) => {
      it('Buy new share from automation', () => {
        cy.log(result)
        cy.visit('/');
        cy.get('#password').clear().type(result.password).should('have.value', result.password);
        cy.get('#username').clear().type(result.username).should('have.value', result.username);
        
        // select the DP
        cy.get("#selectBranch").click();
        cy.get('ul li').contains(result.dp, { matchCase: false }).click();

      // click login button 
      cy.get('button').contains("Login").click();


        // goto asba page 
        cy.get('li.nav-item').contains("My ASBA", { matchCase: false }).click();


        // get the share to purchase and click on apply button.
        cy.get('.company-name').contains(result.shareToBuy).parents('.company-list').within(($button)=>{
          cy.get("button").click();
        })

        // select bank 
        cy.get("#selectBank").select(result.bankName).should('contain.text', result.bankName);

        // select kitta
        cy.get('#appliedKitta').type(result.kitta).should("have.value", result.kitta);


        // type crn number 
        cy.get("#crnNumber").type(result.crn).should("have.value", result.crn);

        // agree terms
        cy.get('#disclaimer').check().should("be.checked");

        // click proceed button
        cy.get('button').contains("proceed", {matchCase: false}).click();


        // input pin
        cy.get('#transactionPIN').type(result.transactionPin)


        // apply for share
        // cy.intercept("")
        cy.get('button').contains("Apply", {matchCase: false}).click();




      });
    });
  });
});