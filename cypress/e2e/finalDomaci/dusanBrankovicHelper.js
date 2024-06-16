class Helper {
  buttonClick(text) {
    cy.get("button").contains(text).click();
  }
  stopInSixtySeconds() {
    cy.get('path[fill="#C8102E"]').parent().click();
  }
  checkHomeRemote() {
    cy.intercept({
      method: "GET",
      url: "http://10.15.1.102/api/ips/where-am-i/",
    }).as("location");
    cy.get("button")
      .contains(/Check In/)
      .click();
    cy.wait("@location")
      .its("response.body[office]")
      .then((data) => {
        if (data === true) {
          cy.get(
            'path[d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"]'
          )
            .eq(0)
            .as("office");
          cy.get("@office").should("have.css", "fill", "rgb(51, 204, 153)");
          cy.get("@office").then(() => {
            cy.visit("http://10.15.1.102/active/who-is-online");
            cy.get("div")
              .contains("Dušan Branković")
              .parent()
              .parent()
              .find(
                'path[d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"]'
              )
              .should("exist");
            cy.get('img[alt="itk"]').click();
          });
        } else {
          cy.get(
            'path[d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"]'
          )
            .eq(0)
            .as("remote");
          cy.get("@remote").should("have.css", "fill", "rgb(51, 204, 153)");
          cy.get("@remote").then(() => {
            cy.visit("http://10.15.1.102/active/who-is-online");
            cy.get("div")
              .contains("Dušan Branković")
              .parent()
              .parent()
              .find(
                'path[d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"]'
              )
              .should("exist");
            cy.get('img[alt="itk"]').click();
          });
        }
      });

    this.stopInSixtySeconds();
  }
  checkedLongetThanSixty() {
    cy.get("button")
      .contains(/Check In/)
      .click();
    cy.get("svg")
      .contains(
        "You can stop counter in first 60 seconds without entering checkout entries."
      )
      .should("exist");
    // helper.stopInSixtySeconds();
    cy.wait(60000).then(() => {
      cy.get("svg")
        .contains(
          "You can stop counter in first 60 seconds without entering checkout entries."
        )
        .should("not.exist");
    });
  }
  cancelXCheck() {
    cy.get("div").contains("Checkout").parent().click();
    cy.get("button").contains("Cancel").click();
    cy.get("div").contains("Checkout").parent().click();
    cy.get("div").contains("Session checkout").parent().find("button").click();
    // cy.get("div").contains("Checkout").parent().click();
  }

  addEntry() {
    cy.get("div").contains("Checkout").parent().click();
    for (let i = 0; i < 4; i++) {
      if (i > 1) {
        cy.get('div[role="dialog"]')
          .should("be.visible")
          .find(".MuiDialogContent-root")
          .scrollTo("bottom", { force: true });
        cy.get(
          'svg path[d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 4c.513 0 .936.386.993.883L13 8v3h3c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L16 13h-3v3c0 .552-.448 1-1 1-.513 0-.936-.386-.993-.883L11 16v-3H8c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L8 11h3V8c0-.552.448-1 1-1z"]'
        ).as("add");
        cy.get("@add").should("exist").click({ force: true });
        // cy.get("svg")
        //   .find(
        //     'path[d="M14 1c1.598 0 2.904 1.249 2.995 2.824L17 4v1h4c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L21 7h-1v13c0 1.598-1.249 2.904-2.824 2.995L17 23H7c-1.598 0-2.904-1.249-2.995-2.824L4 20V7H3c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L3 5h4V4c0-1.598 1.249-2.904 2.824-2.995L10 1h4zM6 7v13c0 .513.386.936.883.993L7 21h10c.513 0 .936-.386.993-.883L18 20V7H6zm8-4h-4c-.513 0-.936.386-.993.883L9 4v1h6V4c0-.513-.386-.936-.883-.993L14 3z"]'
        //   )
        //   .should("have.length", i + 2);
      } else {
        cy.get("svg title").contains("Add entry").as("add");
        cy.get("@add").should("exist").click({ force: true });
        // cy.get("svg")
        //   .find(
        //     'path[d="M14 1c1.598 0 2.904 1.249 2.995 2.824L17 4v1h4c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L21 7h-1v13c0 1.598-1.249 2.904-2.824 2.995L17 23H7c-1.598 0-2.904-1.249-2.995-2.824L4 20V7H3c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L3 5h4V4c0-1.598 1.249-2.904 2.824-2.995L10 1h4zM6 7v13c0 .513.386.936.883.993L7 21h10c.513 0 .936-.386.993-.883L18 20V7H6zm8-4h-4c-.513 0-.936.386-.993.883L9 4v1h6V4c0-.513-.386-.936-.883-.993L14 3z"]'
        //   )
        //   .should("have.length", i + 2);
      }
    }

    for (let i = 4; i > 1; i--) {
      cy.get("svg")
        .find(
          'path[d="M14 1c1.598 0 2.904 1.249 2.995 2.824L17 4v1h4c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L21 7h-1v13c0 1.598-1.249 2.904-2.824 2.995L17 23H7c-1.598 0-2.904-1.249-2.995-2.824L4 20V7H3c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L3 5h4V4c0-1.598 1.249-2.904 2.824-2.995L10 1h4zM6 7v13c0 .513.386.936.883.993L7 21h10c.513 0 .936-.386.993-.883L18 20V7H6zm8-4h-4c-.513 0-.936.386-.993.883L9 4v1h6V4c0-.513-.386-.936-.883-.993L14 3z"]'
        )
        .eq(i)
        .click({ force: true });
      cy.get("svg")
        .find(
          ' path[d="M14 1c1.598 0 2.904 1.249 2.995 2.824L17 4v1h4c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L21 7h-1v13c0 1.598-1.249 2.904-2.824 2.995L17 23H7c-1.598 0-2.904-1.249-2.995-2.824L4 20V7H3c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L3 5h4V4c0-1.598 1.249-2.904 2.824-2.995L10 1h4zM6 7v13c0 .513.386.936.883.993L7 21h10c.513 0 .936-.386.993-.883L18 20V7H6zm8-4h-4c-.513 0-.936.386-.993.883L9 4v1h6V4c0-.513-.386-.936-.883-.993L14 3z"]'
        )
        .should("have.length", i);
    }
    cy.get("svg")
      .find(
        'path[d="M14 1c1.598 0 2.904 1.249 2.995 2.824L17 4v1h4c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L21 7h-1v13c0 1.598-1.249 2.904-2.824 2.995L17 23H7c-1.598 0-2.904-1.249-2.995-2.824L4 20V7H3c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L3 5h4V4c0-1.598 1.249-2.904 2.824-2.995L10 1h4zM6 7v13c0 .513.386.936.883.993L7 21h10c.513 0 .936-.386.993-.883L18 20V7H6zm8-4h-4c-.513 0-.936.386-.993.883L9 4v1h6V4c0-.513-.386-.936-.883-.993L14 3z"]'
      )
      .eq(1)
      .click({ force: true });
    cy.get("svg")
      .find(
        ' path[d="M14 1c1.598 0 2.904 1.249 2.995 2.824L17 4v1h4c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L21 7h-1v13c0 1.598-1.249 2.904-2.824 2.995L17 23H7c-1.598 0-2.904-1.249-2.995-2.824L4 20V7H3c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L3 5h4V4c0-1.598 1.249-2.904 2.824-2.995L10 1h4zM6 7v13c0 .513.386.936.883.993L7 21h10c.513 0 .936-.386.993-.883L18 20V7H6zm8-4h-4c-.513 0-.936.386-.993.883L9 4v1h6V4c0-.513-.386-.936-.883-.993L14 3z"]'
      )
      .should("not.exist");
    cy.get("button").contains("Cancel").click({ force: true });
  }

  addLastEntry(selector, n) {
    cy.get("div").contains("Checkout").parent().click();
    cy.get("button").contains("Cancel").click({ force: true });
    cy.get("table svg").eq(3).click();
    cy.get("tbody")
      .eq(1)
      .find("td")
      .eq(n)
      .invoke("text")
      .then((value) => {
        cy.get("div").contains("Checkout").parent().click();
        cy.get("svg title")
          .contains("Use entries from the previous session")
          .click({ force: true });
        cy.get(`${selector}`).eq(0).invoke("val").should("eq", value);
        cy.get("button").contains("Cancel").click({ force: true });
      });
  }

  projectActivityCheck(projectSelector, activitySelector, x, y, n, m) {
    cy.fixture("dbfinal").then((data) => {
      cy.get(`#${projectSelector}`)
        .wrap(`#${projectSelector}`)
        .then(() => {
          for (let i = x; i < y; i++) {
            cy.get(`#${projectSelector}-option-${i}`).click();
            cy.get(`#${activitySelector}`)
              .wrap(`#${activitySelector}`)
              .then(() => {
                cy.get('path[d="M7 10l5 5 5-5z"]').eq(1).click();
                for (let i = 0; i < n; i++) {
                  cy.get(`#${activitySelector}`).wrap(`#${activitySelector}`);
                  cy.get(`#${activitySelector}-option-${i}`)
                    .should("exist")
                    .contains(data[`${activitySelector}${m}`][i]);
                }
              });
            cy.get('path[d="M7 10l5 5 5-5z"]').eq(0).click();
          }
        });
    });
  }
  enterDropdown(selector) {
    cy.get(`#${selector}`)
      .wrap(`#${selector}`)
      .then(() => {
        cy.get(`#${selector}-option-1`).click();
      });
  }
  timesMatch() {
    cy.get("div")
      .contains("Session checkout")
      .parent()
      .next()
      .find("div")
      .eq(0)
      .invoke("text")
      .then((text) => {
        cy.get("div")
          .contains("Hours")
          .parent()
          .find("input")
          .invoke("attr", "value")
          .then((elh) => {
            cy.get("div")
              .contains("Minutes")
              .parent()
              .find("input")
              .invoke("attr", "value")
              .then((elm) => {
                console.log(elm.length);
                if (elh === "0") {
                  elh = "";
                }
                if (elm.length === 1) {
                  elm = "0" + elm;
                }
                let time = elh + elm;
                expect(time).to.equal(text);
              });
          });
        text = text.match(/[0-9]/g).join("");
      });
  }
  enterString(length) {
    cy.get("div")
      .contains("Description")
      .parent()
      .find("textarea")
      .eq(0)
      .then((el) => {
        cy.wrap(el).type(this.createString(length), { delay: 0 });
      });
  }
  clearDescription() {
    cy.get("div")
      .contains("Description")
      .parent()
      .find("textarea")
      .eq(0)
      .clear();
  }
  createTestString() {
    let string = "bradule" + Date.now();
    return string;
  }
  createString(length) {
    const character =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi jklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
  }

  setTotalDays(text) {
    cy.get("p").contains("Total days:").next("p");
    cy.readFile("cypress/fixtures/dbfinal.json").then((data) => {
      data.totalDays[0] = text;
      cy.writeFile("cypress/fixtures/dbfinal.json", JSON.stringify(data));
    });
  }

  setOfficeRemote(number) {
    cy.get("p").contains("Office | Remote:").next("p");
    cy.readFile("cypress/fixtures/dbfinal.json").then((data) => {
      data.officeRemote[0] = "" + number;
      cy.writeFile("cypress/fixtures/dbfinal.json", JSON.stringify(data));
    });
  }

  setData() {
    cy.get("p")
      .contains("Total days:")
      .next("p")
      .invoke("text")
      .as("totalDays")
      .then((text) => {
        this.setTotalDays(text);
      });
    cy.get("p")
      .contains("Office | Remote:")
      .next("p")
      .invoke("text")
      .as("remoteOffice")
      .then((text) => {
        let newText = [...text].filter((x) => x !== " ");
        // newText = newText.filter((x) => x !== " ")
        let a = Number(newText[0].trim());
        let b = Number(newText[2].trim());
        newText = a + b;
        cy.wrap(newText).as("newText");
        console.log("" + newText);
        this.setOfficeRemote("" + newText);
      });
  }
  clearTotalDays() {
    cy.readFile("cypress/fixtures/dbfinal.json").then((data) => {
      data.totalDays[0] = "";
      cy.writeFile("cypress/fixtures/dbfinal.json", JSON.stringify(data));
    });
  }
  clearOfficeRemote() {
    cy.readFile("cypress/fixtures/dbfinal.json").then((data) => {
      data.officeRemote[0] = "";
      cy.writeFile("cypress/fixtures/dbfinal.json", JSON.stringify(data));
    });
  }

  checkTableEntries() {
    cy.get("div")
      .contains("Description")
      .parent()
      .find("textarea")
      .eq(0)
      .then(() => {
        let string = this.createTestString();
        cy.get("div")
          .contains("Description")
          .parent()
          .find("textarea")
          .eq(0)
          .type(string);
        cy.get("button").contains("Checkout").click();
        cy.wait(3000);
        cy.get("button")
          .find(
            'path[d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]'
          )
          .eq(0)
          .click({ force: true });
        cy.get("tbody")
          .eq(1)
          .find("td")
          .eq(0)
          .should("have.text", "Kryptovert");
        cy.get("button")
          .find(
            'path[d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]'
          )
          .eq(0)
          .click({ force: true });
        cy.get("tbody").eq(1).find("td").eq(1).should("have.text", "DevOps");
        cy.get("button")
          .find(
            'path[d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]'
          )
          .eq(0)
          .click({ force: true });
        cy.get("tbody").eq(1).find("td").eq(3).should("have.text", string);
      });
  }
}
export default Helper;
