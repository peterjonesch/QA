///<reference types="Cypress"/>

describe("Testing URLs for validity", () => {

    const testdata = [

        "http://../",
        "https://foo.bar?q=Spaces should be encoded",
        "h://test",
        "https://.www.foo.bar./",
        "rdar://1234",
        "https://##/",
        "ftps://foo.bar/",
        "http://.www.foo.bar/",
        "http://3628126748",
        "http://-a.b.co"

    ]

    beforeEach("Got the new post route", () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');


    });

    it('Adding urls', () => {

        for (let i = 0; i < testdata.length; i++) {
            cy.get('p').contains('3. Event Location').click();
            cy.get('*[data-cy="location-options-online"]').click();
            cy.get('#url_link').type(testdata[i]);

           
            cy.wait(2000);

            cy.get('button[data-cy="next-btn"]').eq(2).click();

            //verification of error message

            cy.get('*[data-cy="urlLink"]>div+p').should('have.text','Invalid url link');

            //refreshpage
            cy.reload();
            cy.wait(3000);

        }
    })



});