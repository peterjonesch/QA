///<reference types="Cypress"/>

describe('Images testing', () => {

    beforeEach("Got the new post route", () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');


    });

    it('Images at max size', () =>{

        cy.wait(2000);
        
        const filepath = "cypress/fixtures/max.jpg";
        cy.get('input[data-cy="image"]').selectFile(filepath);
        cy.wait(5000);

        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);

        cy.get('#alert-danger-text>ul>li').should(($li) => {
            let len = $li.length;
            for (let i = 0; i < len; i++) {
                expect($li.eq(i)).to.not.contain('Image size should be less than 16 MB');
            }
    })
    })
})