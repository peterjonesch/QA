///<reference types="Cypress"/>

describe('Test email validation', () => {

    const testData = {
        email_1: '@gmail.com',
        email_2: 'qa.communityhub',
        email_3: 'qa.communityhub@okokok',
        email_4: 'qa.com..muni.tyhub@comm.com',
        email_5: 'qa.communityhubu@',
        email_6: 'qa@ok.com@play.com',
        email_7: '#@%^%#$@#$@#.com', //valid email
        email_8: 'email@111.222.333.44444',
        email_9: 'あいうえお@domain.com',
        email_10: 'email@domain.com (Joe Smith)'


    }

    // create a new event
    beforeEach('Open Post page', () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')


    });

    afterEach('Click on submit button', () => {
        cy.get('#email').type('{enter}');
        cy.wait(2000);
        cy.get('*[data-cy="email"]+p').should('have.text', 'Invalid email address');
    });



it('No id,only domain', () => {
    // fill in email
    cy.get('#email').type(testData.email_1);

});
it('Only id,no domain', () => {
    // fill in email
    cy.get('#email').type(testData.email_2);

});

/*it('Incorrect domain', () => {
    // fill in email
    cy.get('#email').type(testData.email_3);

});
it('consecutive dots', () => {
    // fill in email
    cy.get('#email').type(testData.email_4);

});*/

it('User id and @ and no domain after that', () => {
    // fill in email
    cy.get('#email').type(testData.email_5);

});

it('multiple domains', () => {
    // fill in email
    cy.get('#email').type(testData.email_6);

});
it('garbage mail', () => {
    // fill in email
    cy.get('#email').type(testData.email_7);

});

/* it('ip domain', () => {
     // fill in email
     cy.get('#email').type(testData.email_8);

 })*/
it('Non standard format', () => {
    // fill in email
    cy.get('#email').type(testData.email_10);
});

});