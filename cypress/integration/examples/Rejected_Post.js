///<reference types="Cypress"/>

describe('Rejected Posts', () => {

    it('Reject an event,then approve it', () => {


        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')

        const testData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: 'qa.communityhub@gmail.com',
            phone: '1234567890',
            website: 'https://communityhub.cloud',
            // use a random string in title to avoid conflicts with an existing event
            title: `Approve Rejected Post`,
            description: 'Test Event Description',
            extendedDescription: 'Test Event  Extended Description',

        }

        //SECTION 1
        // fill in email
        cy.get('#email').type(testData.email)

        // fill in contact email
        cy.get('#contactEmail').type(testData.contactEmail)

        // fill in phone
        cy.get('#phone').type(testData.phone)

        // fill in website
        cy.get('#website').type(testData.website)

        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(0).click();
        //SECTION 2-EVENT DETAILS

        // fill in a title
        cy.get('#title').type(testData.title)

        // select sponsor
        cy.get('#sponsors').click();
        cy.wait(1000);
        cy.get('#sponsors-option-0').click();

        //add sponsor
        cy.get('button').contains('Enter Sponsor name manually').click();

        //select sponsor2
        cy.get('#sponsors').type('JonesTest').type('{enter}');

        // select post type
        cy.get('*[data-cy="postTypeId"]').click();                           //needs a data cy attribute
        cy.get('li[data-value="Exhibit"]').click();
        cy.get('li[data-value="City Government"]').click().type('{esc}');



        //select start date
        cy.get('input[name="sessions[0].startTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('1').click();
        cy.wait(2000);
        cy.get('*[class="MuiClock-clock css-eziifo"]').invoke('attr', 'style', 'pointer-events: auto ');

        //select time (12:00=top;11=topleft;1:00=top right; 3:00=right;5:00=bottomRight; 6:00=Bottom ;7:00=BottomLeft;9:00=left)
        cy.get('.MuiClock-squareMask').eq(0).click('right', { force: true });
        cy.get('.MuiClock-squareMask').click('right', { force: true });
        cy.get('button').contains('OK').click();

        //select end date
        cy.get('input[name="sessions[0].endTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('30').click();
        cy.get('.MuiClock-squareMask').eq(0).click('left', { force: true });
        cy.get('.MuiClock-squareMask').click('right', { force: true });
        cy.get('button').contains('OK').click();

        //controls in calendar

        //cy.get('label[for="date"]').eq(1).click();

        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(1).click();

        //SECTION-3-Event Location
        // select event location
        cy.get('*[data-cy="location-options-both"]').click(); //data-cy needs to be added to the label because 

        //add physical location

        cy.get('#location').type('cal').wait(1000).type('{downArrow}').type('{enter}').then(($index) => {
            if ($index.val() !== 'California, USA') {

                cy.get('#location').clear().type('cali').wait(1000).type('{downArrow}').type('{enter}');
            }

        }).should('have.value', 'California, USA');

        cy.get('#url_link').type('https://www.google.com/');

        // add register button

        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(2).click();

        // fill in description
        cy.get('*[data-cy="description"]').eq(1).type(testData.description).should('have.text', testData.description);

        // fill in extended description
        cy.get('*[data-cy="extendedDescription"]').type(testData.extendedDescription).should('have.text', testData.extendedDescription);

        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(3).click();

        // UPLOAD IMAGE

        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(3).click();
        //EVENT DISPLAY PREFERENCES
        cy.get('input[value="all"]').click()

        // click submit event button
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(25000);

        //  check that the event was created
        cy.get('p[class*="MuiTypography-root MuiTypography-body1"]').eq(1).should('have.text', testData.title);


        //Reject post
        cy.login('qa.communityhub@gmail.com', 'Oberlin123!');
        cy.wait(10000);
        cy.get('#unapproved-tab').click();
        let count = 0;
        let number = 0;
        cy.wait(10000);

        cy.get('.card-body').each(($el, index, $list) => {
            const event = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(event);
            number = count;
            count = count + 1;
            if (event === testData.title) {

                cy.log(number);
                cy.wait(5000);
                cy.get('button[data-cy="reject-btn"]').eq(number).click();
                cy.get('*[name="reason"]').type("test rejected");
                cy.get('button').contains('Reject Post').click();
                cy.wait(5000);

            }
        });
        //Approve post

        cy.get('#rejected-tab').click();

        let count1 = 0;
        let number1 = 0;

        cy.wait(10000);

        cy.get('.card-body').each(($el, index, $list) => {
            const event = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(event);
            number1 = count;
            count1 = count + 1;
            if (event === testData.title) {

                cy.log(number);
                cy.wait(5000);
                cy.get('button[data-cy="approve-btn"]').eq(number).click();
            }
        })



        // delete the event to cleanup

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();

        cy.wait(20000);
        let count2 = 0;
        let number2 = 0;
        cy.get('.card-body').each(($el, index, $list) => {
            const event = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(event);
            number2 = count2;
            count2 = count2 + 1;
            cy.log(index);
            if (event === testData.title) {
                cy.wait(5000);

                cy.get('button[data-cy="delete-btn"]').eq(number2).click();

            }
            cy.get('button').contains(/^Confirm$/).click();
        })


    })

})