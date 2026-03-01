
describe("Navigation - flera moment (start -> The story -> tillbaka)", () => {
  it("navigerar från startsidan till The story och tillbaka", () => {
    cy.visit("/");

    cy.get("h1").should("contain.text", "Hacker Escape Room");

    cy.contains("a", /the story/i).click();

    cy.location("pathname").should("match", /aboutUs\.html$/);

    cy.get("body").should("be.visible");
    cy.get("h1").should("contain.text", "About us");

    cy.go("back");

    cy.location("pathname").should("match", /(\/|index\.html)$/);
    cy.get("h1").should("contain.text", "Hacker Escape Room");
  });
});