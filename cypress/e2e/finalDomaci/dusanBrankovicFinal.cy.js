import Helper from "./dusanBrankovicHelper";
const helper = new Helper();
describe("Logging in", () => {
  // //Before each - ulogovati se na checker Happy path
  //   1.1.1. Visit Checker
  //   1.1.2. Click on Username field
  //   1.1.3. Enter correct username (my username)
  //   1.1.4. Click on Password field
  //   1.1.5. Enter password for entered username
  //   1.1.6. Click on "Log in" button
  //   1.1.7. Assert if correct user is logged in
  beforeEach(() => {
    cy.LOGIN_CHECKER();
  });
  it.only("Intercept", () => {
    cy.visit("http://10.15.1.102/");
    cy.intercept({
      method: "GET",
      url: "http://10.15.1.102/api/sessions/me/times/?status=inactive&start_at_after=2024-05-31T22:00:00.000Z&start_at_before=2024-06-30T21:59:59.999Z",
    }).as("user");
    // cy.reload()
    cy.wait("@user")
      .its("response")
      .then((response) => {
        cy.get('p').contains('Total days').next('p').invoke('text').should('equal', '' + response.body["days_total"]);
        console.log(response.body["days_total"]);
      });
  });

  //Automated test that is checking if user is logged in but not already checked in
  // 1. Assert that Check in button exists, is visible and "Check in" is displayed
  // 2. Assert if user is on Who is online page but not active, checked in
  // 3. Assert if user is logged in but not checked in
  it("Check if logged in not active", () => {
    cy.visit("http://10.15.1.102/");
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
  //Automated test for check in
  //1. Click on Check in button
  //2. Assert if user is checked in
  //3. Assert if check in < 60 seconds option exist
  it("CheckIn", () => {
    cy.visit("http://10.15.1.102/");
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
  //Automation test for check in - checking if user is active and user location
  // 2.1. Visit checker
  // 2.2. Log in
  // 2.3. Click on Check in button
  // 2.4. Assert if user is checked in
  //     2.4.1. Assert if user is active
  //     2.4.2. Assett if Office / Remote icons have changed state (turned on)
  //     2.4.3. Assert if "You can stop counter in first 60 seconds without entering checkout entries." button has appeared
  //     2.4.4. Assert if User has appeard on "Who is online page" as checked in (green)
  //     2.4.5. Assert if User on "Who is online" page has gotten icon for Office / Remote
  it("Location", () => {
    cy.visit("http://10.15.1.102/");
    helper.checkHomeRemote();
  });
  //Automation test for check out - checking out after 60 seconds
  // 2.1. Visit checker
  // 2.2. Log in
  // 2.3. Click on Check in button
  //     2.4.1. Assert if "You can stop counter in first 60 seconds without entering checkout entries." button has appeared
  //     2.4.2. Assert if checkout without entering checkout entries is not available after 60 seconds
  //     2.4.3. Check X and Cancel buttons on Session Checkout modal
  //     2.4.4. Check Project - contains right items, can select items and Activity items match
  //     2.4.5. Check Activity - contains right items, can select items
  //     2.4.6. Check Times - times match
  //     2.4.7. Check Description - description is not empty (Required message is displayed), 1-500 characters (Description must be between 1 and 500 characters)
  //     2.4.8. Enter Project, Activity, Description
  //     2.4.9. Check out
  //     2.4.10. Assert if data entered has appeared in table

  it("Check in > 60s", () => {
    // cy.visit("http://10.15.1.102/login");
    // cy.get('input[name="username"]').type(Cypress.env("username"));
    // cy.get('input[name="password"]').type(Cypress.env("password"));
    // cy.get('button[type="submit"]').click();
    // OBRISI OVO IZNAD
    cy.visit("http://10.15.1.102/");
    helper.checkedLongetThanSixty();
    helper.cancelXCheck();
    helper.addEntry();
    helper.addLastEntry("#project", 0);
    helper.addLastEntry("#activity", 1);
    helper.addLastEntry("textarea", 3);
    //uraditi i brisanje
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
  //Automation test to check if correct number of days is displayed
  // 1. Get number of days from table (number of unique dates
  // 2. Assert if number of days displayed in Total days is correct and mathces number of unique dates
  // 3. Assert if number of days displayed in Office | Remote add up to Total days, is correct and mathces number of unique dates
  it("Number of days, Remote & Office", () => {
    cy.visit("http://10.15.1.102/");
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
    cy.visit("http://10.15.1.102/");
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

  it("Request absence", () => {
    cy.visit("http://10.15.1.102/");
  });
});
