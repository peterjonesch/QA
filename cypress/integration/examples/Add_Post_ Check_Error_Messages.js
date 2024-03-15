/// <reference types ="Cypress" />

describe('Add Event Check Error Messages',() =>{

 //Verify event error messages 
    it.only('Add an event and check for errors',() =>{

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');

        cy.wait(2000);
        
        const filepath = "cypress/fixtures/test_image_above_16mb.jpg";
        cy.get('input[data-cy="image"]').selectFile(filepath);
        cy.wait(5000);

        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);

       
  
cy.get("#alert-danger-text>ul>li").eq(0).contains('Please provide a valid Email address.');
cy.get("#alert-danger-text>ul>li").eq(1).contains('Event title is empty.');
cy.get("#alert-danger-text>ul>li").eq(2).contains('Please select an Post Type.');
cy.get("#alert-danger-text>ul>li").eq(3).contains('Please make sure all session start and end times are set.');
cy.get("#alert-danger-text>ul>li").eq(4).contains('Event Description must be between 10 and 200 characters.');
cy.get("#alert-danger-text>ul>li").eq(5).contains('Please select location type.');
cy.get("#alert-danger-text>ul>li").eq(6).contains('Session start and end times cannot be the same.');
cy.get("#alert-danger-text>ul>li").eq(7).contains('Image size should be less than 16 MB');

//Verify announcement error messages
cy.get('label[for="is_announcement"]').click();

cy.get('button[data-cy="submit-btn"]').click();
cy.wait(2000);



cy.get("#alert-danger-text>ul>li").eq(0).contains('Please provide a valid Email address.');
cy.get("#alert-danger-text>ul>li").eq(1).contains('Announcement title is empty.');
cy.get("#alert-danger-text>ul>li").eq(2).contains('Please select an Post Type.');
cy.get("#alert-danger-text>ul>li").eq(3).contains('Please make sure all session start and end times are set.');
cy.get("#alert-danger-text>ul>li").eq(4).contains('Announcement Description must be between 10 and 200 characters.');
cy.get("#alert-danger-text>ul>li").eq(5).contains('Please select location type.');
cy.get("#alert-danger-text>ul>li").eq(6).contains('Session start and end times cannot be the same.');
cy.get("#alert-danger-text>ul>li").eq(7).contains('Image size should be less than 16 MB');

//Verify job error messages

cy.get('label[for="job_post"]').click();

cy.get('button[data-cy="submit-btn"]').click();
cy.wait(2000);



cy.get("#alert-danger-text>ul>li").eq(0).contains('Please provide a valid Email address.');
cy.get("#alert-danger-text>ul>li").eq(1).contains('Job title is empty.');
cy.get("#alert-danger-text>ul>li").eq(2).contains('Please select a Job Category.');
cy.get("#alert-danger-text>ul>li").eq(3).contains('Please select Employment Type.');
cy.get("#alert-danger-text>ul>li").eq(4).contains('Job Description must be between 10 and 200 characters.');
cy.get("#alert-danger-text>ul>li").eq(5).contains('Please select both start and end date for display.');
cy.get("#alert-danger-text>ul>li").eq(6).contains('Session start and end times cannot be the same.');
cy.get("#alert-danger-text>ul>li").eq(7).contains('Please provide the Employer.');
cy.get("#alert-danger-text>ul>li").eq(8).contains('Please add either Online Application button or Additional Instructions.');
cy.get("#alert-danger-text>ul>li").eq(9).contains('Please select Workplace Type.');
cy.get("#alert-danger-text>ul>li").eq(10).contains('Image size should be less than 16 MB');

})

})