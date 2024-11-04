/// <reference types ="Cypress" />

describe('Add Event Check Error Messages', () => {

    //Verify event error messages 
    it.only('Add an event and check for errors', () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');

        cy.wait(2000);
        /* 
         const filepath = "cypress/fixtures/test_image_above_16mb.jpg";
         cy.get('p').contains('5. Event Artwork').click();
         cy.get('input[id="fileInput"]').selectFile(filepath);
         cy.wait(5000);
         cy.get('.action-buttons>button').eq(1).click();
         cy.get('button[data-cy="next-btn"]').eq(4).click();
         */
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);


        //EMAIL
        cy.get('*[data-cy="email-block"]>p').eq(1).should('have.text', '❗Field Email is Required');
        //TITLE BLOCK
        cy.get('*[data-cy="event-title-block"]>p').eq(1).should('have.text', '❗Field Title is Required');
        //ORGANISATIONAL SPONSORS
        cy.get('*[data-cy="sponsors-block"]>div>div>p').should('have.text', '❗At least one value must be selected');
        //POST TYPE
        cy.get('*[data-cy="post-type-block"]>div>div>p').should('have.text', '❗At least one type must be selected');
        //LOCATION TYPE
        cy.get('*[aria-label="locationType"]+p').should('have.text', '❗Select location type');
        //DESCRIPTION
        cy.get('*[data-cy="description"]>p').eq(1).should('have.text', '❗Description is required');
        //DISPLAY PREFERENCES
        cy.get('*[data-cy="display"]+p').should('have.text', '❗Select a display type');
    })

    it.only('verify anouncemet error messages', () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');

        //Verify announcement error messages
        cy.get('input[name="eventType"]').eq(1).click();

        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);
        //EMAIL
        cy.get('*[data-cy="email-block"]>p').eq(1).should('have.text', '❗Field Email is Required');
        //TITLE BLOCK
        cy.get('*[data-cy="event-title-block"]>p').eq(1).should('have.text', '❗Field Title is Required');
        //ORGANISATIONAL SPONSORS
        cy.get('*[data-cy="sponsors-block"]>div>div>p').should('have.text', '❗At least one value must be selected');
        //POST TYPE
        cy.get('*[data-cy="post-type-block"]>div>div>p').should('have.text', '❗At least one type must be selected');
        //LOCATION TYPE
        cy.get('*[aria-label="locationType"]+p').should('have.text', '❗Select location type');
        //DESCRIPTION
        cy.get('*[data-cy="description"]>p').eq(1).should('have.text', '❗Description is required');
        //DISPLAY PREFERENCES
        cy.get('*[data-cy="display"]+p').should('have.text', '❗Select a display type');

    })

    it.only('verify job error messages', () => {
        //Verify job error messages
        cy.visit('https://qa.communityhubqa.cloud/calendar/jobs/post/new');

        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);
        //EMAIL
        cy.get('*[data-cy="email-block"]>p').eq(1).should('have.text', '❗Field Email is Required');
        //TITLE BLOCK
        cy.get('*[data-cy="event-title-block"]>p').eq(1).should('have.text', '❗Field Title is Required');
        //WHO IS THE EMPLOYER ?
        cy.get('*[data-cy="sponsors-block"]>div>div>p').should('have.text', '❗At least one value must be selected');
        //JOB CATEGORY
        cy.get('*[data-cy="post-type-block"]>div>div>p').should('have.text', '❗At least one type must be selected');
        //EMPLOYMENT TYPE
        cy.get('p').contains('❗Employment Type is required').should('have.text', '❗Employment Type is required'); //Needs data cy
        //WORKPLACE  TYPE
        cy.get('*[aria-label="workplaceType"]+p').should('have.text', '❗Workplace Type is required');
        //DESCRIPTION
        cy.get('*[data-cy="description"]>p').eq(1).should('have.text', '❗Description is required');
        //DISPLAY PREFERENCES
        cy.get('*[data-cy="display"]+p').should('have.text', '❗Select a display type');

    });

})