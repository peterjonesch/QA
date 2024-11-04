///<reference types="Cypress"/>



describe('Short description validation', () => {

    beforeEach("Got the new post route", () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');
        cy.get('p').contains('4. Event Description').click();


    });
    it('Short description at minimum length(10 characters)', () => {

        cy.get('#description').type("1234567890");
        cy.get('button[data-cy="next-btn"]').eq(3).click();
        cy.wait(2000);
        cy.get('*[data-cy="description"]>p').eq(1).should('not.have.text', '❗Description must be between 10 to 200 characters');


    })

    it('Short description at lesser than minimum length(9 characters)', () => {
        
                cy.get('#description').type("012345678");
                cy.get('button[data-cy="next-btn"]').eq(3).click();
        cy.wait(2000);
        cy.get('*[data-cy="description"]>p').eq(1).should('have.text', '❗Description must be between 10 to 200 characters');
    })
});