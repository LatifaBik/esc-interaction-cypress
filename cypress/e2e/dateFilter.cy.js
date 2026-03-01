describe("Datumfilter (rätt/fel) - UI-respons", () => {
  /**
   * ÄNDRA HÄR så det matchar ditt filter.html
   * Öppna filter.html och välj rätt selectors för:
   * - datum input (type="date" eller text)
   * - knapp för att applicera/filtrera
   * - elementet där felmeddelande/validering syns (om du har)
   * - listan med resultat (#all-list eller liknande)
   * - text för "inga resultat" (om du visar sådan)
   */

  const selectors = {
    openFilterBtn: ".filterBtn",
    filterRoot: ".filters",

    // EXEMPEL - byt till din riktiga date input selector:
    dateInput: 'input[type="date"]', // eller t.ex. "#date" / ".filter__date"

    // EXEMPEL - byt till knappen som kör filter:
    applyBtn: 'button[type="submit"]', // eller t.ex. ".filters__apply"

    // Resultatlistan på all.html:
    resultsList: "#all-list",

    // Någon plats där ni visar feltext eller "inga resultat":
    // (byt till din riktiga container om du har en)
    messageArea: "#all-status", // eller ".filters__error" / ".filters__message"
  };

  beforeEach(() => {
    cy.visit("/all.html");
    cy.get(selectors.openFilterBtn).should("be.visible").click();
    cy.get(selectors.filterRoot).should("be.visible");
  });

  it("Giltigt datum: visar relevant respons (träffar eller 'inga resultat')", () => {
    // välj ett datum som är giltigt format för input[type=date]
    const validDate = "2026-03-01";

    cy.get(selectors.dateInput).should("exist").clear().type(validDate);

    // Om ni har en apply-knapp:
    cy.get(selectors.applyBtn).click({ force: true });

    // UI-responsen vi testar:
    // Antingen: listan har >= 1 item
    // Eller: UI visar en tydlig 'inga resultat'-text
    cy.get("body").then(($body) => {
      const hasListItems = $body.find(`${selectors.resultsList} > *`).length > 0;

      if (hasListItems) {
        cy.get(selectors.resultsList).children().should("have.length.at.least", 1);
      } else {
        // Om inga items, vill vi ändå se en relevant respons
        cy.get(selectors.messageArea)
          .should("be.visible")
          .invoke("text")
          .then((t) => {
            expect(t.toLowerCase()).to.match(/inga|no results|not found|hittade inget|0/);
          });
      }
    });
  });

  it("Ogiltigt datum: visar felmeddelande/validering i UI", () => {
    // För input[type=date] kan browser blocka ogiltig text.
    // Därför sätter vi value med invoke och triggar change/input.
    const invalidDate = "2026-99-99";

    cy.get(selectors.dateInput)
      .should("exist")
      .invoke("val", invalidDate)
      .trigger("input")
      .trigger("change");

    cy.get(selectors.applyBtn).click({ force: true });

    // Här testar vi responsen (feltext eller valideringsmeddelande)
    // Anpassa regex till din text (sv/en)
    cy.get(selectors.messageArea)
      .should("be.visible")
      .invoke("text")
      .then((t) => {
        expect(t.toLowerCase()).to.match(/fel|ogilt|invalid|enter a valid|vänligen|datum/);
      });
  });
});