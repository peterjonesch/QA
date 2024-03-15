///<reference types="Cypress"/>



describe('Short description validation', () => {

    beforeEach("Got the new post route", () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');


    });
    it('Short description at minimum length(10 characters)', () => {

        cy.get('#description').type("1234567890");
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);
        cy.get('#alert-danger-text>ul>li').should(($li) => {
            let len = $li.length;
            for (let i = 0; i < len; i++) {
                expect($li.eq(i)).to.not.contain('Event Description must be between 10 and 200 characters.');
            }



        })


    })

    it('Short description at lesser than minimum length(9 characters)', () => {
        
                cy.get('#description').type("012345678");
           
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);
        cy.get('#alert-danger-text>ul>li').then(($li) => {
            let len = $li.length;
            let num= 0;
            for (let i = 0; i < len; i++) {
                const error = $li.eq(i).text();
                cy.log(error);
                if( error === 'Event Description must be between 10 and 200 characters.'){

                    num=i;
                    cy.log(num);
                }
               
                
            }
                expect($li.eq(num)).to.contain('Event Description must be between 10 and 200 characters.');
            



        })
    })
});