// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',(email,password) =>{

    cy.visit('https://qa.communityhubqa.cloud/calendar/');
    cy.get('a[href="#!"]').contains('Sign in').click();

    cy.origin('https://communityhub-auth.us.auth0.com', { args: { email,password } }, ({ email,password })=>{

// Fill out the email input with a valid email
cy.get('#username').click().type(email);

// Fill out the password input with a valid password
cy.get('#password').click().type(password);

// Submit the form
cy.get('button[ data-action-button-primary="true"]').click();
})

})

Cypress.Commands.add('loginjobs',(email,password) =>{
    cy.visit('https://qa.communityhubqa.cloud/calendar/jobs');
    cy.get('a[href="#!"]').contains('Sign in').click();

    cy.origin('https://communityhub-auth.us.auth0.com', { args: { email,password } }, ({ email,password })=>{

// Fill out the email input with a valid email
cy.get('#username').click().type(email);

// Fill out the password input with a valid password
cy.get('#password').click().type(password);

// Submit the form
cy.get('button[ data-action-button-primary="true"]').click();
})
})