describe("Filter (Challenges)", () => {
    it("Kan öppna filter och ser viktiga filter-element", () => {
        cy.visit("/all.html");

        // öppna filter (knappen finns i kod som .filterBtn)
        cy.get(".filterBtn").should("be.visible").click();

        // filter-sektionen som laddas in från filter.html
        cy.get(".filters").should("be.visible");

        // Exempel: kolla att stäng-knapp finns
        cy.get(".filters__close").should("be.visible");

        // specifikt webbelement i filtret (ex: checkbox för online)
        cy.get(".filters #online").should("exist");
        cy.get(".filters label[for='online']").should("contain.text", "Include online");
    });
});



