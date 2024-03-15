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
            cy.get('input[data-cy="website"]').type(testdata[i]);

            cy.get('label[for="online"]').click();
            cy.wait(2000);
            cy.get('input[data-cy="location-online"]').type(testdata[i]);
            cy.wait(2000);
            cy.get('button[data-cy="submit-btn"]').click();

            //verification of error message

            cy.get("#alert-danger-text>ul>li").eq(1).contains('Website URL is invalid.');

            //refreshpage
            cy.reload();
            cy.wait(3000);

        }
    })



});