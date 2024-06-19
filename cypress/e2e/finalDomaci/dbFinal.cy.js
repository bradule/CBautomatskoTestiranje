import Helper from "./dusanBrankovicHelper";
const helper = new Helper();
describe("Logging in", () => {
  beforeEach(() => {
    cy.LOGIN_CHECKER();
  });

  it("Check if logged in not active", () => {
    cy.get("button")
      .contains(/Check In/)
      .should("exist")
      .and("be.visible");
    cy.visit("http://10.15.1.102/active/who-is-online");
    cy.getDivTitle("Dušan Branković is not checked in")
      .should("exist")
      .and("be.visible")
      .and("not.have.css", "background-color", "rgb(51, 204, 153)");
    cy.get('img[alt="itk"]').click(); //Back to Check in page
    cy.get("button")
      .contains(/Check In/)
      .should("exist");
  });

  it("CheckIn", () => {
    cy.intercept({
      method: "POST",
      url: "http://10.15.1.102/api/sessions/",
    }).as("user");
    cy.get("button")
      .contains(/Check In/)
      .click();
    cy.wait("@user")
      .its("response.body[user][username]")
      .should("eq", Cypress.env("username"));
    cy.get("svg")
      .contains(
        "You can stop counter in first 60 seconds without entering checkout entries."
      )
      .should("exist");
    helper.stopInSixtySeconds();
  });

  it("Location", () => {
    helper.checkHomeRemote();
  });

  it("Check in > 60s", () => {
    //CODE TO TEST WHEN LOGGED IN
    // cy.visit("http://10.15.1.102/login");
    // cy.get('input[name="username"]').type(Cypress.env("username"));
    // cy.get('input[name="password"]').type(Cypress.env("password"));
    // cy.get('button[type="submit"]').click();
    // OBRISI OVO IZNAD
    helper.checkedLongetThanSixty();
    helper.cancelXCheck();
    helper.addEntry();
    helper.addLastEntry("#project", 0);
    helper.addLastEntry("#activity", 1);
    helper.addLastEntry("textarea", 3);
    cy.get("div").contains("Checkout").parent().click({ force: true });
    helper.clearEntry();
    cy.get('path[d="M7 10l5 5 5-5z"]').eq(0).click();
    // helper.projectActivityCheck("project", "activity", 0, 5, 5, 0);
    helper.projectActivityCheck("project", "activity", 5, 6, 5, 1);
    // helper.projectActivityCheck("project", "activity", 6, 28, 5, 0);
    // helper.projectActivityCheck("project", "activity", 28, 29, 5, 1);
    // helper.projectActivityCheck("project", "activity", 29, 30, 7, 2);
    // helper.projectActivityCheck("project", "activity", 30, 31, 6, 3);
    // helper.projectActivityCheck("project", "activity", 31, 32, 1, 4);
    // helper.projectActivityCheck("project", "activity", 32, 33, 3, 5);
    helper.enterDropdown("project");
    cy.get('path[d="M7 10l5 5 5-5z"]').eq(1).click();
    helper.enterDropdown("activity");
    helper.timesMatch();
    cy.get("p").contains("Required").should("exist").and("be.visible");
    helper.enterString(501);
    cy.get("p")
      .contains("Must be less than 500 characters")
      .should("exist")
      .and("be.visible");
    helper.clearDescription();
    helper.enterString(1);
    cy.get("p")
      .contains("Must be less than 500 characters")
      .should("not.exist");
    helper.clearDescription();
    cy.get("button[title=Clear]").eq(1).click({ force: true });
    cy.get("button[title=Clear]").eq(0).click({ force: true });
    cy.get('path[d="M7 10l5 5 5-5z"]').eq(0).click();
    helper.enterDropdown("project");
    cy.get('path[d="M7 10l5 5 5-5z"]').eq(1).click();
    helper.enterDropdown("activity");
    helper.checkTableEntries();
  });

  it("Number of days, Remote & Office", () => {
    cy.wait(3000);
    cy.get("table").then(($table) => {
      let dates = [];
      $table
        .find("tbody")
        .find("tr")
        .each((_, row) => {
          cy.wrap(row)
            .find("td")
            .eq(0)
            .invoke("text")
            .then((text) => {
              text = text.slice(0, text.length - 8);
              dates.push(text);
            });
        });
      // console.log(dates);
      cy.get(dates).then(() => {
        let days = new Set(dates.filter((x) => x != ""));
        // console.log(days.size);
        cy.get("p")
          .contains("Total days:")
          .next("p")
          .as("totalDays")
          .then(() => {
            cy.get("@totalDays")
              .invoke("text")
              .should("equal", "" + days.size);
            cy.get("p")
              .contains("Office | Remote:")
              .next("p")
              .as("remoteOffice")
              .then(() => {
                cy.get("@remoteOffice")
                  .invoke("text")
                  .then((text) => {
                    let newText = [...text].filter((x) => x !== " ");
                    let a = Number(newText[0]);
                    let b = Number(newText[2]);
                    newText = "" + (a + b);
                    cy.wrap(newText).as("newText");
                    expect(newText).to.equal("" + days.size);
                  });
              });
          });
      });
    });
  });
  it("Check if logged in, not active", () => {
    cy.get("button")
      .contains(/Check In/)
      .should("exist");
    cy.visit("http://10.15.1.102/active/who-is-online");
    cy.getDivTitle("Dušan Branković is not checked in")
      .should("exist")
      .and("be.visible")
      .and("not.have.css", "background-color", "rgb(51, 204, 153)");
    cy.get('img[alt="itk"]').click();
    console.log("Logged in, not active");
  });
});
