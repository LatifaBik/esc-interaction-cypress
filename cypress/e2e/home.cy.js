describe("Cypress E2E test - Hacker Escape Rooms", () => {
  it("Sidan är uppe på localhost och visar korrekt H1", () => {
    cy.visit("/");                 
    cy.location("hostname").should("eq", "localhost");

    // Kontrollerar statisk text i H1 
    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain.text", "Hacker Escape Room");
  });
});