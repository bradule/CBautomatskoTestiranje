// import Helper from "./dusanBrankovicHelper";
// const helper = new Helper();
// describe("Logging in", () => {
//   // //Before each - ulogovati se na checker
//   // 1.1 Happy path
//   //   1.1.1. Visit Checker
//   //   1.1.2. Click on Username field
//   //   1.1.3. Enter correct username (my username)
//   //   1.1.4. Click on Password field
//   //   1.1.5. Enter password for entered username
//   //   1.1.6. Click on "Log in" button
//   //   1.1.7. Assert if correct user is logged in
//   beforeEach(() => {
//     cy.LOGIN_CHECKER();
//   });
//   //Automated test that is checking if user is logged in but not already checked in
//   //1. Check if user is logged in - botom left login icon should - Dusan Brankovic... - previous test
//   //2. Check if Check in button is displaying "Check in"
//   //3. Check if user is existing (implicit) on who is online page and that user is not loged in
//   it("Check if logged in", () => {
//     cy.get("button")
//       .contains(/Check In/)
//       .should("exist");
//     cy.visit("http://10.15.1.102/active/who-is-online");
//     cy.getDivTitle("Dušan Branković is not checked in")
//       .should("exist")
//       .and("be.visible")
//       .and("not.have.css", "background-color", "rgb(51, 204, 153)");
//     cy.get('img[alt="itk"]').click();
//   });
//   //Automated test for check in
//   //1. Click on Check in button
//   //2. Assert if user is checked in
//   //3. Assert if check in < 60 seconds exist
//   it("CheckIn", () => {
//     cy.intercept({
//       method: "POST",
//       url: "http://10.15.1.102/api/sessions/",
//     }).as("user");
//     cy.get("button")
//       .contains(/Check In/)
//       .click();
//     cy.wait("@user")
//       .its("response.body[user][username]")
//       .should("eq", Cypress.env("username"));
//     cy.get("svg")
//       .contains(
//         "You can stop counter in first 60 seconds without entering checkout entries."
//       )
//       .should("exist");
//     helper.stopInSixtySeconds();
//   });
//   //Automation test for check in - checking if user is active and user location
//   // 2.1. Visit checker
//   // 2.2. Log in
//   // 2.3. Click on Check in button
//   // 2.4. Assert if user is checked in
//   //     2.4.1. Assert if user is active
//   //     2.4.2. Assett if Office / Remote icons have changed state (turned on)
//   //     2.4.3. Assert if "You can stop counter in first 60 seconds without entering checkout entries." button has appeared
//   //     2.4.4. Assert if User has appeard on "Who is online page" as checked in (green)
//   //     2.4.5. Assert if User on "Who is online" page has gotten icon for Office / Remote
//   it("Location", () => {
//     helper.checkHomeRemote();
//   });
//   //Automation test for check in - checking if Option to checkout without entering checkout entries is not available after 60 seconds
//   // 2.1. Visit checker
//   // 2.2. Log in
//   // 2.3. Click on Check in button
//   //     2.4.1. Assert if "You can stop counter in first 60 seconds without entering checkout entries." button has appeared
//   //     2.4.2. Assert if checkout without entering checkout entries is not available after 60 seconds
//   //     2.4.3. Check X and Cancel buttons
//   //     2.4.4. Check Project - contains right items, can select items and Activity match
//   //     2.4.5. Check Activity - contains right items, can select items
//   //     2.4.6. Check Times - times match
//   //     2.4.7. Check Description - description is not empty, 1-500 characters
//   //     2.4.8. Enter Project, Activity, Description
//   //     2.4.9. Check out
//   //     2.4.10. Assert if data entered has appeared in table

//   it.only("Check in > 60s", () => {
//     // helper.setData()
//     helper.checkedLongetThanSixty();
//     helper.cancelXCheck();
//     helper.projectActivityCheck("project", "activity", 0, 5, 5, 0);
//     helper.projectActivityCheck("project", "activity", 5, 6, 5, 1);
//     helper.projectActivityCheck("project", "activity", 6, 28, 5, 0);
//     helper.projectActivityCheck("project", "activity", 28, 29, 5, 1);
//     helper.projectActivityCheck("project", "activity", 29, 30, 7, 2);
//     helper.projectActivityCheck("project", "activity", 30, 31, 6, 3);
//     helper.projectActivityCheck("project", "activity", 31, 32, 1, 4);
//     helper.projectActivityCheck("project", "activity", 32, 33, 3, 5);
//     helper.enterDropdown("project");
//     cy.get('path[d="M7 10l5 5 5-5z"]').eq(1).click();
//     helper.enterDropdown("activity");
//     helper.timesMatch();
//     cy.get("p").contains("Required").should("exist").and("be.visible");
//     helper.enterString(501);
//     cy.get("p")
//       .contains("Must be less than 500 characters")
//       .should("exist")
//       .and("be.visible");
//     helper.clearDescription();
//     helper.enterString(1);
//     cy.get("p")
//       .contains("Must be less than 500 characters")
//       .should("not.exist");
//     helper.clearDescription();
//     cy.get("button[title=Clear]").eq(1).click({ force: true });
//     cy.get("button[title=Clear]").eq(0).click({ force: true });
//     cy.get('path[d="M7 10l5 5 5-5z"]').eq(0).click();
//     helper.enterDropdown("project");
//     cy.get('path[d="M7 10l5 5 5-5z"]').eq(1).click();
//     helper.enterDropdown("activity");
//     helper.checkTableEntries()
//     // cy.get("div")
//     //   .contains("Description")
//     //   .parent()
//     //   .find("textarea")
//     //   .eq(0)
//     //   .then(() => {
//     //     let string = helper.createTestString();
//     //     cy.get("div")
//     //       .contains("Description")
//     //       .parent()
//     //       .find("textarea")
//     //       .eq(0)
//     //       .type(string);
//     //     cy.get("button").contains("Checkout").click();
//     //     cy.wait(3000);
//     //     cy.get("button")
//     //       .find(
//     //         'path[d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]'
//     //       )
//     //       .eq(0)
//     //       .click({ force: true });
//     //     cy.get("tbody")
//     //       .eq(1)
//     //       .find("td")
//     //       .eq(0)
//     //       .should("have.text", "Kryptovert");
//     //     cy.get("button")
//     //       .find(
//     //         'path[d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]'
//     //       )
//     //       .eq(0)
//     //       .click({ force: true });
//     //     cy.get("tbody").eq(1).find("td").eq(1).should("have.text", "DevOps");
//     //     cy.get("button")
//     //       .find(
//     //         'path[d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]'
//     //       )
//     //       .eq(0)
//     //       .click({ force: true });
//     //     cy.get("tbody").eq(1).find("td").eq(3).should("have.text", string);
//     //   });
//     // cy.fixture("dbfinal").then((data) => {
//     //   cy.get("p")
//     //     .contains("Total days:")
//     //     .next("p")
//     //     .should("be.equalTo", "" + Number(data.totalDays[0]) + 1);
//     //   helper.clearTotalDays();
//     //   helper.clearOfficeRemote();
//     // });
//   });

//   it("total days", () => {
//     // cy.get("p")
//     //   .contains("Total days:")
//     //   .next("p")
//     //   .invoke("text")
//     //   .as("totalDays")
//     //   .then((text) => {
//     //     helper.setTotalDays(text);
//     //   });
//     // cy.get("p")
//     //   .contains("Office | Remote:")
//     //   .next("p")
//     //   .invoke("text")
//     //   .as("remoteOffice")
//     //   .then((text) => {
//     //     let newText = [...text].filter((x) => x !== " ");
//     //     // newText = newText.filter((x) => x !== " ")
//     //     let a = Number(newText[0].trim());
//     //     let b = Number(newText[2].trim());
//     //     newText = a + b;
//     //     cy.wrap(newText).as("newText");
//     //     console.log(newText, "ovde");
//     //     helper.setOfficeRemote(newText);
//     //   });
//     helper.setData().as("dani");

//     cy.fixture("dbfinal").then((data) => {
//       cy.get("p")
//         .contains("Total days:")
//         .next("p")
//         .should("have.text", data.totalDays[0]);
//     });
//     cy.fixture("dbfinal").then((data) => {
//       cy.get("p")
//         .contains("Office | Remote:")
//         .next("p")
//         .should("have.text", data.officeRemote[0]);
//     });
//     helper.clearTotalDays();
//     helper.clearOfficeRemote();
//   });
// });
