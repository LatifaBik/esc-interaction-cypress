describe("Datumfilter / datumvalidering (rätt + fel) - UI respons", () => {
  beforeEach(() => {
    // Börja från listan där man kan boka
    cy.visit("/all.html");

    // Öppna booking-modalen genom att klicka en "Book this room"-knapp
    // (om det finns flera, ta första)
    cy.contains("button", /book this room/i).first().click();

    // Säkerställ att modal/step 1 syns
    cy.contains(/what date would you like to come/i).should("be.visible");
  });

  it("Ogiltigt/ej valt datum: visar felmeddelande i UI", () => {
    // Klicka sök utan att välja datum
    cy.contains("button", /search available times/i).click();

    // Felmeddelandet i din booking.html verkar vara:
    // <p class="booking-error" id="booking-step1-error"></p>
    cy.get("#booking-step1-error")
      .should("be.visible")
      .invoke("text")
      .then((t) => {
        expect(t.toLowerCase()).to.match(/date|required|fel|ogilt/);
      });
  });

  it("Giltigt datum: går vidare utan felmeddelande", () => {
    // Sätt ett giltigt datum (format: yyyy-mm-dd)
    cy.get("#booking-date-input").should("exist").clear().type("2026-03-01");

    cy.contains("button", /search available times/i).click();

    // Antingen: felmeddelandet ska vara tomt
    cy.get("#booking-step1-error").should("have.text", "");

    // Och/eller: du går vidare till step 2 (om UI gör det)
    // Om du har ett tydligt element på step 2, kolla det här istället:
    // cy.contains(/step 2/i).should("be.visible");
  });
});