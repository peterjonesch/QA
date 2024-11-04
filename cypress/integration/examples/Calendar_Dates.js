///<reference types="Cypress"/>

const { expect } = require("chai");

describe('Calendar dates testing', () => {

    beforeEach("Got the new post route", () => {

        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new');


    });

    const testData = {
        email: 'qa.communityhub@gmail.com',
        contactEmail: 'qa.communityhub@gmail.com',
        phone: '1234567890',
        website: 'https://communityhub.cloud',
        // use a random string in title to avoid conflicts with an existing event
        title: `Overlapping Events`,
        title_2: 'timezone',
        description: 'Test Event Description',
        extendedDescription: 'Test Event  Extended Description',

    }

    it('Start Date and time  greater than end date', () => {
        cy.get('p').contains('2. Event Details').click();
        //Start Date and time
        cy.get('input[name="sessions[0].startTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('30').click();
        cy.wait(2000);
        //select time (12:00=top;11=topleft;1:00=top right; 3:00=right;5:00=bottomRight; 6:00=Bottom ;7:00=BottomLeft;9:00=left)

        cy.get('*[class="MuiClock-clock css-eziifo"]').invoke('attr', 'style', 'pointer-events: auto ');
        cy.get('.MuiClock-squareMask').eq(0).click('right', { force: true });
        cy.get('.MuiClock-squareMask').click('bottom', { force: true });
        cy.get('button').contains('OK').click();
        //End Date and time
        cy.get('input[name="sessions[0].endTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('30').click();
        cy.get('.MuiClock-squareMask').eq(0).click('right', { force: true });

        if (cy.get('span[class*="Mui-disabled"]').contains(/^25$/).should('have.class', 'Mui-disabled')) {
            cy.log('success');
        }
        else {
            assert.fail('start grater than end date can be selected');
        }

    });

    it('Start Date and time  greater than end date by force', () => {
        cy.get('p').contains('2. Event Details').click();
        //Start Date and time
        cy.get('input[name="sessions[0].startTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('26').click();
        cy.wait(2000);
        //select time (12:00=top;11=topleft;1:00=top right; 3:00=right;5:00=bottomRight; 6:00=Bottom ;7:00=BottomLeft;9:00=left)

        cy.get('*[class="MuiClock-clock css-eziifo"]').invoke('attr', 'style', 'pointer-events: auto ');
        cy.get('.MuiClock-squareMask').eq(0).click('top', { force: true });
        cy.get('.MuiClock-squareMask').click('top', { force: true });
        cy.get('button').contains('OK').click();
        //End Date and time
        cy.get('input[name="sessions[0].endTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('28').click();
        cy.get('.MuiClock-squareMask').eq(0).click('top', { force: true });
        cy.get('.MuiClock-squareMask').click('top', { force: true });
        cy.get('button').contains('OK').click();
        //Start Date and time
        cy.get('input[name="sessions[0].startTime"]').click();            //needs a data cy attribute
        cy.get('button').contains('30').click();
        cy.wait(2000);

        cy.get('.MuiClock-squareMask').eq(0).click('top', { force: true });
        cy.get('.MuiClock-squareMask').click('top', { force: true });
        cy.get('button').contains('OK').click();

        if (cy.get('p.Mui-error').contains("End time must be after start time").should('have.text', 'End time must be after start time')) {
            cy.log('success');
        }
        else {
            assert.fail('start grater than end date can be selected');
        }


    });


    it('To submit an event with overlapping dates', () => {

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

        //FIRST EVENT
        let startDate = '1';
        let endDate = '';
        let startDate1 = '15';
        let endDate1 = '28';

        let todayDate = new Date();
        let day = todayDate.toISOString().split('T')[0];
        day = day.split('-')[2];

        //select start date
        cy.get('input[name="sessions[0].startTime"]').click();            //needs a data cy attribute
        cy.get('button').contains(startDate).click();
        cy.wait(2000);
        cy.get('*[class="MuiClock-clock css-eziifo"]').invoke('attr', 'style', 'pointer-events: auto ');

        //select time (12:00=top;11=topleft;1:00=top right; 3:00=right;5:00=bottomRight; 6:00=Bottom ;7:00=BottomLeft;9:00=left)
        cy.get('.MuiClock-squareMask').eq(0).click('right', { force: true });
        cy.get('.MuiClock-squareMask').click('right', { force: true });
        cy.get('button').contains('OK').click();

        //select end date
        cy.get('input[name="sessions[0].endTime"]').click();            //needs a data cy attribute
        if (cy.get('button').contains('31')) {
            endDate = '31';
        }
        else if (cy.get('button').contains('30')) {
            endDate = '30';
        }
        else if (cy.get('button').contains('29')) {
            endDate = '29';
        }
        else if (cy.get('button').contains('28')) {
            endDate = '28';
        }
        cy.get('button').contains(endDate).click();
        cy.get('.MuiClock-squareMask').eq(0).click('left', { force: true });
        cy.get('.MuiClock-squareMask').click('right', { force: true });
        cy.get('button').contains('OK').click();
        cy.get('*[data-cy="yes-repeat"]').click();

        //SECOND EVENT 
        //select start date
        cy.get('input[name="startTime"]').click();            //needs a data cy attribute
        cy.get('button').contains(startDate1).click();
        cy.wait(2000);
        cy.get('*[class="MuiClock-clock css-eziifo"]').invoke('attr', 'style', 'pointer-events: auto ');

        //select time (12:00=top;11=topleft;1:00=top right; 3:00=right;5:00=bottomRight; 6:00=Bottom ;7:00=BottomLeft;9:00=left)
        cy.get('.MuiClock-squareMask').eq(0).click('top', { force: true });
        cy.get('.MuiClock-squareMask').click('top', { force: true });
        cy.get('button').contains('OK').click();
        //select end date
        cy.get('input[name="endTime"]').click();            //needs a data cy attribute
        cy.get('button').contains(endDate1).click();
        cy.get('.MuiClock-squareMask').eq(0).click('left', { force: true });
        cy.get('.MuiClock-squareMask').click('right', { force: true });
        cy.get('button').contains('OK').click();


        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(1).click();

        //SECTION-3-Event Location
        // select event location
        cy.get('*[data-cy="location-options-both"]').click(); //data-cy needs to be added to the label because 

        //add physical location
        cy.get('#location').type('cal').wait(1000).type('{downArrow}').type('{enter}').should('have.value', 'California, USA');
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
        cy.wait(15000);

        //Verification setup
        startDate = Number(startDate);
        startDate1 = Number(startDate1);
        endDate = Number(endDate);

        day = Number(day);
        cy.log(day);

        let startDifference = Math.abs(day - startDate);
        let startDifference1 = Math.abs(day - startDate1);
        let endDifference = Math.abs(day - endDate);
        let endDifference1 = Math.abs(day - endDate1);

        let postDate;
        let actualPostDate;
        let closeDate;
        let closeDate1;

        if (day <= endDate && day <= endDate1) {
            if (startDifference <= endDifference) {
                closeDate = startDifference;
            }
            else {
                closeDate = endDifference;
            }
            if (startDifference1 <= endDifference1) {
                closeDate1 = startDifference1;
            }
            else {
                closeDate1 = endDifference1;
            }
            if (closeDate <= closeDate1) {
                postDate = startDate;
            }
            else {
                postDate = startDate1;
            }

            //VERIFICATION
            cy.get('.cQqFOQ').invoke('text').then((text) => {
                actualPostDate = Number(text.split(" ")[2]);
                if (actualPostDate == postDate) {
                    cy.log('Success!');
                }
                else {
                    assert.fail('TestFailed,Wrong date selection');
                }
            });

        }
        else {
            cy.get('.cQqFOQ').invoke('text').then((text) => {
                actualPostDate = text.split(" ")[2];
                actualPostDate = Number(actualPostDate.split("0")[1]);
                cy.log(actualPostDate);
                cy.log(startDate);
                if (actualPostDate == startDate) {
                    cy.log('Success!');
                }
                else {
                    assert.fail('TestFailed, Wrong date selection');
                }
            });
        }

        // delete the event to cleanup
        cy.login('qa.communityhub@gmail.com', 'Oberlin123!');

        cy.get('#unapproved-tab').click();

        cy.wait(25000);
        let count2 = 0;
        let number2 = 0;
        cy.get('.card-body').each(($el, index, $list) => {
            const event = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(event);
            number2 = count2;
            count2 = count2 + 1;
            cy.log(number2);
            if (event === testData.title) {
                cy.wait(5000);

                cy.get('button[data-cy="delete-btn"]').eq(number2).click()
            }
        })
        cy.get('button').contains(/^Confirm$/).click();
    })
})
