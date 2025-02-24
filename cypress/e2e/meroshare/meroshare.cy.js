describe('Meroshare Automation', () => {
  const result = {
    username: Cypress.env('USER_NAME'),
    password: Cypress.env('PASSWORD'),
    dp: Cypress.env('DP'),
    maximum_share_price: Cypress.env('MAX_IPO_PRICE'),
    kitta: Cypress.env('KITTA'),
    crn: Cypress.env('CRN'),
    transactionPin: Cypress.env('TRANSACTION_PIN'),
    bankName: Cypress.env("BANK_NAME")
  }

  let resppp = [];

  before(() => {
    cy.intercept("POST", "https://webbackend.cdsc.com.np/api/meroShare/companyShare/applicableIssue/", 
    // {
    //   statusCode: 200,
    //     body:{
    //         "object": [
    //             {
    //                 "companyShareId": 614,
    //                 "subGroup": "For General Public",
    //                 "scrip": "NABILD2087",
    //                 "companyName": "Nabil Debenture 2087",
    //                 "shareTypeName": "IPO",
    //                 "shareGroupName": "Debentures",
    //                 "statusName": "CREATE_APPROVE",
    //                 "issueOpenDate": "Dec 15, 2023 9:30:00 AM",
    //                 "issueCloseDate": "Dec 19, 2023 5:00:00 PM"
    //             },
    //             {
    //                 "companyShareId": 615,
    //                 "subGroup": "For General Public",
    //                 "scrip": "HREL",
    //                 "companyName": "Himalayan Re-insurance Limited",
    //                 "shareTypeName": "IPO",
    //                 "shareGroupName": "Ordinary Shares",
    //                 "statusName": "CREATE_APPROVE",
    //                 "issueOpenDate": "Dec 13, 2023 10:00:00 AM",
    //                 "issueCloseDate": "Dec 17, 2023 5:00:00 PM"
    //             },
    //             {
    //               "companyShareId": 616,
    //               "subGroup": "For General Public",
    //               "scrip": "HREL",
    //               "companyName": "Rajeet Mangrati",
    //               "shareTypeName": "IPO",
    //               "shareGroupName": "Ordinary Shares",
    //               "statusName": "CREATE_APPROVE",
    //               "issueOpenDate": "Dec 13, 2023 10:00:00 AM",
    //               "issueCloseDate": "Dec 17, 2023 5:00:00 PM"
    //           }
    //         ],
    //         "totalCount": 0
    //     }
    // }
    ).as("applicableshare");


    cy.intercept({
      url: "https://webbackend.cdsc.com.np/api/meroShare/active/**"
    }).as("active");

    cy.intercept({
      url: "https://webbackend.cdsc.com.np/api/meroShare/applicantForm/share/apply"
    }).as('apply_share');

    cy.visit('/');
    cy.login(result.password, result.username, result.dp);

    cy.get('li.nav-item').contains("My ASBA", {
      matchCase: false
    }).click();
    cy.wait("@applicableshare").then((resp) => {
      const response = resp.response.body.object;
      console.log(response);
      let filtered_response = response.filter((data) => {
        if (!data.action && data.shareTypeName === "IPO" && data.shareGroupName === "Ordinary Shares" && data.subGroup === "For General Public") {
          return data;
        }
      })
      resppp.push(filtered_response);
    });


  });


  it('Apply for Share', () => {
    resppp.map((dat) => {
      dat.map((data) => {
        cy.visit('/');
        cy.get('li.nav-item').contains("My ASBA", {
          matchCase: false
        }).click();



        cy.get(".company-list .company-name span[tooltip='Company Name']").contains(data.companyName).should('be.visible');
        cy.get(".company-list").contains(data.companyName).parents('.company-list').within(() => {
          cy.get(".action-buttons button").click()
        });

        // select the bank and confirm for buy.
        if (result.bankName == "" || !result.bankName) {
          cy.get("#selectBank").select(1);
        } else {
          cy.get("#selectBank").select(result.bankName.toUpperCase(), {matchCase: false}).should('contain.text', result.bankName.toUpperCase());
        }

        // Wait for account number dropdown to be visible and select the second option
        cy.get('#accountNumber').should('be.visible')
          .find('option')
          .eq(1) // This selects the second option (index 1)
          .then($option => {
            cy.get('#accountNumber').select($option.val());
          });

        // select kitta
        cy.get('#appliedKitta').type(result.kitta).should("have.value", result.kitta);


        // type crn number 
        cy.get("#crnNumber").type(result.crn, {
          log: false
        });

        // agree terms
        cy.get('#disclaimer').check().should("be.checked");

        // click proceed button
        cy.get('button').contains("proceed", {
          matchCase: false
        }).click();

        // input transaction pin
        cy.get("#transactionPIN").type(result.transactionPin, {
          log: false
        })
        cy.get("button").contains("Apply").click();

        cy.wait('@apply_share').then((resp) => {
          expect(resp.response.statusCode).to.be.eq(201);
        })
      })
    })
  });


  // it('Apply for share', () => {
  //   // intercept the request for check
  //   cy.log(resppp)

  //   // intercept end.





  //   // after login goto my asba page 
  //   cy.get('li.nav-item').contains("My ASBA", {
  //     matchCase: false
  //   }).click();
  //   cy.wait("@applicableshare").then((resp) => {
  //     const response = resp.response.body.object;
  //     response.map((data) => {
  //       console.log(data)
  //       if (!data.action) {
  //         cy.get(".company-list .company-name span[tooltip='Company Name']").contains(data.companyName).should('be.visible');
  //         cy.get(".company-list").contains(data.companyName).get(".action-buttons button").click();
  //         cy.wait("@active").then((resp) => {
  //           const response = resp.response.body;
  //           console.log(response);
  //           if (response.shareTypeName === "IPO" && response.shareGroupName === "Ordinary Shares" && response.subGroup === "For General Public" && response.sharePerUnit <= result.maximum_share_price) {
  //             console.log("ready to buy");

  //             cy.visit('/');

  //             // after login goto my asba page 
  //             cy.get('li.nav-item').contains("My ASBA", {
  //               matchCase: false
  //             }).click();

  //             cy.get(".company-list .company-name span[tooltip='Company Name']").contains(data.companyName).should('be.visible');
  //             cy.get(".company-list").contains(data.companyName).get(".action-buttons button").click();

  //             // select the bank and confirm for buy.
  //             if (result.bankName == "" || !result.bankName) {
  //               cy.get("#selectBank").select(1);
  //             } else {
  //               cy.get("#selectBank").select(result.bankName).should('contain.text', result.bankName);
  //             }

  //             // select kitta
  //             cy.get('#appliedKitta').type(result.kitta).should("have.value", result.kitta);


  //             // type crn number 
  //             cy.get("#crnNumber").type(result.crn, {
  //               log: false
  //             });

  //             // agree terms
  //             cy.get('#disclaimer').check().should("be.checked");

  //             // click proceed button
  //             cy.get('button').contains("proceed", {
  //               matchCase: false
  //             }).click();

  //             // input transaction pin
  //             cy.get("#transactionPIN").type(result.transactionPin, {
  //               log: false
  //             })
  //             cy.get("button").contains("Apply").click();

  //             cy.wait('@apply_share').then((resp) => {
  //               expect(resp.response.statusCode).to.be.eq(201);
  //             })

  //           } else {
  //             console.log("not ready to buy");
  //           }
  //         })

  //       } else {
  //         console.log("Already Applied")
  //       }
  //     })
  //   })

  // });
});