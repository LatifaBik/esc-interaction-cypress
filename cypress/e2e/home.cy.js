describe("Cypress E2E test - Hacker Escape Rooms", () => {
 
it("Sidan är uppe och visar korrekt H1", () => {
  cy.visit("/");

  const expectedHost = new URL(Cypress.config("baseUrl")).hostname;
  cy.location("hostname").should("eq", expectedHost);

  cy.get("h1").should("be.visible");
  cy.get("h1").should("contain.text", "Hacker Escape Room"); 
});
});

