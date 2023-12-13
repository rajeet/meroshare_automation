describe('Meroshare Automation', () => {
  const result = require("../../fixtures/data.json")
  describe('Meroshare automation', () => {
      it.only('Apply for share', () => {

        cy.intercept({
          url: "https://webbackend.cdsc.com.np/api/meroShare/companyShare/applicableIssue/"
        }).as("applicableshare");


        cy.intercept({
          url: "https://webbackend.cdsc.com.np/api/meroShare/active/**"
        }).as("active");




        cy.visit('/');
        cy.get('#password').clear().type(result.password).should('have.value', result.password);
        cy.get('#username').clear().type(result.username).should('have.value', result.username);

        // select the DP
        cy.get("#selectBranch").click();
        cy.get('ul li').contains(result.dp, {
          matchCase: false
        }).click();

        // click login button 
        cy.get('button').contains("Login").click();



        // after login goto my asba page 
        cy.get('li.nav-item').contains("My ASBA", {
          matchCase: false
        }).click();
        cy.wait("@applicableshare").then((resp) => {
          const response = resp.response.body.object;
          response.map((data) => {
            if (!data.action) {
              cy.get(".company-list .company-name span[tooltip='Company Name']").contains(data.companyName).should('be.visible');
              cy.get(".company-list").contains(data.companyName).get(".action-buttons button").click();
              cy.wait("@active").then((resp) => {
                const response = resp.response.body;
                console.log(response);
                if (response.shareTypeName === "IPO" && response.shareGroupName === "Ordinary Shares" && response.subGroup === "For General Public") {
                  console.log("ready to buy");
                  // select the bank and confirm for buy.
                  cy.get("#selectBank").select(result.bankName).should('contain.text', result.bankName);

                  // select kitta
                  cy.get('#appliedKitta').type(result.kitta).should("have.value", result.kitta);


                  // type crn number 
                  cy.get("#crnNumber").type(result.crn).should("have.value", result.crn);

                  // agree terms
                  cy.get('#disclaimer').check().should("be.checked");

                  // click proceed button
                  // cy.get('button').contains("proceed", {
                  //   matchCase: false
                  // }).click();
                } else {
                  console.log("not ready to buy");
                }
              })

            } else {
              console.log("data not found")
            }
          })
        })

      });
    });
  });