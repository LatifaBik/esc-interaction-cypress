describe("Datumfilter / datumvalidering (rätt + fel) - UI respons", () => {
  beforeEach(() => {
    
    cy.visit("/all.html");

    // Öppna booking-modalen genom att klicka en "Book this room"-knapp
    cy.contains("button", /book this room/i).first().click();

    // Säkerställ att modal/step 1 syns
    cy.contains(/what date would you like to come/i).should("be.visible");
  });

  it("Ogiltigt/ej valt datum: visar felmeddelande i UI", () => {
    // Klicka sök utan att välja datum
    cy.contains("button", /search available times/i).click();

    // Felmeddelandet <p class="booking-error" id="booking-step1-error"></p>
    cy.get("#booking-step1-error")
      .should("be.visible")
      .invoke("text")
      .then((t) => {
        expect(t.toLowerCase()).to.match(/date|required|fel|ogilt/);
      });
  });

  it("Giltigt datum: går vidare utan felmeddelande", () => {
    // Sätt ett giltigt datum (yyyy-mm-dd)
    cy.get("#booking-date-input").should("exist").clear().type("2026-03-01");

    cy.contains("button", /search available times/i).click();

    // felmeddelandet ska vara tomt
    cy.get("#booking-step1-error").should("have.text", ""); 

    
  });
});