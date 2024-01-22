///<reference types="Cypress"/>



describe('Test Login Form of Calendar', () => {
    

    beforeEach(() => {

        // Visit the page or load the forms

        cy.visit('https://qa.communityhubqa.cloud/calendar/');
        cy.get('a[href="#!"]').contains('Sign in').click();
            
       
    });

    it('Handles successful login', () => {
       
         
            cy.origin('https://communityhub-auth.us.auth0.com', () =>{

                const validEmail = 'qa.communityhub@gmail.com';
                const validPassword = 'Oberlin123!';
        // Fill out the email input with a valid email
        cy.get('#username').click().type(validEmail);

        // Fill out the password input with a valid password
        cy.get('#password').click().type(validPassword);

        // Submit the form
        cy.get('button[ data-action-button-primary="true"]').click();
       
       
   
    })
  

    });

    it('Handles invalid email', () => {
        const invalidEmail = 'invalid@example.com';

        // Fill out the email input with an invalid email
        cy.get('#username').type(invalidEmail);

        // Fill out the password input with an invalid password
        cy.get('#password').type('invalidpassword');

        // Submit the form
        cy.get('button[ data-action-button-primary="true"]').click();

       
        cy.get('#error-element-password')
            .should('be.visible')
            .should('contain', 'Wrong email or password');
    });

    it('Handles invalid password', () => {
        const email = 'test@example.com';

        // Fill out the email input
        cy.get('#username').type(email).should('have.value', email);

        // Fill out the password input with an invalid password
        cy.get('#password').type('short'); // Correct password - test1234

        cy.get('button[ data-action-button-primary="true"]').click();

        cy.get('#error-element-password')
            .should('be.visible')
            .should('contain', 'Wrong email or password');
    });
});
