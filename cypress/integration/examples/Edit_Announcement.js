///<reference types= "Cypress"/>

describe('Edit Announcement', () => {

    it('Edit and save announcement', () => {


        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')

        const testData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: 'qa.communityhub@gmail.com',
            phone: '1234567890',
            website: 'https://communityhub.cloud',
            // use a random string in title to avoid conflicts with an existing announcement
            title: `Edit Announcement test`,
            description: 'Test Announcement Description',
            extendedDescription: 'Test Announcement  Extended Description',
            url: 'www.google.com'

        }
        const editData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: '1peter@communityhub.cloud',
            phone: '9515257859',
            website: 'www.test.com',
            // use a random string in title to avoid conflicts with an existing announcement
            title: `Edited Announcement test`,
            description: 'Test Announcement Description is edited',
            extendedDescription: 'Test Announcement  Extended Description edited',
            sponsor: 'New Sponsor 2',
            url: 'www.communityhub.com',
            postType: 'Fair, Festival, or Public Celebration'

        }
        //CREATE POST

        //choose announcement
    cy.get('input[name="eventType"]').eq(1).click();
    //SECTION 1
    // fill in email
    cy.get('#email').type(testData.email);

    // fill in contact email
    cy.get('#contactEmail').type(testData.contactEmail);

    // fill in phone
    cy.get('#phone').type(testData.phone);

    // fill in website
    cy.get('#website').type(testData.website);

    //NEXT BUTTON
    cy.get('button[data-cy="next-btn"]').eq(0).click();
    // fill in a title
    cy.get('#title').type(testData.title)
    // select sponsor
    cy.get('#sponsors').click();
    cy.wait(1000);
    cy.get('#sponsors-option-0').click();

    //add sponsor
    cy.get('button').contains('Enter Sponsor name manually').click();

    //select sponsor2
    cy.get('#sponsors').type('JonesAnnouncemetTest').type('{enter}');


    // select post type
    cy.get('*[data-cy="postTypeId"]').click();                           //needs a data cy attribute
    cy.get('li[data-value="Exhibit"]').click();
    cy.get('li[data-value="City Government"]').click().type('{esc}');

    
    //controls in calendar

    //NEXT BUTTON
    cy.get('button[data-cy="next-btn"]').eq(1).click();

    // select announcement location
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
    
    //ANNOUNCEMENT DISPLAY PREFERENCES
    cy.get('input[value="all"]').click()

    // click submit event button
    cy.get('button[data-cy="submit-btn"]').click();
    cy.wait(25000);

    //  check that the announcement was created
    cy.get('p[class*="MuiTypography-root MuiTypography-body1"]').eq(1).should('have.text', testData.title);

    //Approve post
    cy.login('qa.communityhub@gmail.com', 'Oberlin123!');
    cy.wait(10000);
    cy.get('#unapproved-tab').click();
    let count = 0;
    let number = 0;
    cy.wait(6000);

    cy.get('.card-body').each(($el, index, $list) => {
      const event = $el.find('a[href*="/calendar/post"]>p').text();
      cy.log(event);
      number = count;
      count = count + 1;
      if (event === testData.title) {

        cy.log(number);
        cy.wait(5000);
        cy.get('button[data-cy="approve-btn"]').eq(number).click();
      }
    });


        //EDIT THE POST

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();
        cy.wait(8000);
        let count1 = 1;
        let number1 = 1;
        cy.get('.card-body').each(($el, index, $list) => {
            const announcement = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(announcement);
            number1 = count1;
            count1 = number1 + 1;
            if (announcement === testData.title) {

                cy.log(number1);
                cy.wait(5000);
                cy.get('button[data-cy="edit-post"]').click();
            }

        })

        cy.wait(5000);


        //  edit in contact email
        cy.get('#contactEmail').type('{selectAll}{del}').type(editData.contactEmail);

        // fill in phone
        cy.get('#phone').type('{selectAll}{del}').type(editData.phone);

        // fill in website
        cy.get('#website').type('{selectAll}{del}').type(editData.website);
        //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(0).click();

        // fill in a title
        cy.get('#title').type('{selectAll}{del}').type(editData.title)

        // select sponsor
        cy.get('#sponsors').click()
        cy.wait(1000);
        cy.get('li[id*="sponsors-option"]>div>span').contains('New Sponsor 2').click();


        // select post type
        cy.get('*[data-cy="postTypeId"]').click();  
        cy.get('li[data-value="City Government"]').click();
        cy.get('li[data-value="Ecolympics or Environmental"]').click();
        cy.get('body').type('{esc}');

     
        cy.wait(1000);
        
//select start date

      //select start date
      cy.get('input[name="sessions[0].startTime"]').click();            //needs a data cy attribute
      cy.get('button').contains(/^1$/).click();
      cy.wait(2000);
      cy.get('*[class="MuiClock-clock css-eziifo"]').invoke('attr', 'style', 'pointer-events: auto ');

      //select time (12:00=top;11=topleft;1:00=top right; 3:00=right;5:00=bottomRight; 6:00=Bottom ;7:00=BottomLeft;9:00=left)
      cy.get('.MuiClock-squareMask').eq(0).click('right', { force: true });
      cy.get('.MuiClock-squareMask').click('right', { force: true });
      cy.get('button').contains('OK').click();

      cy.get('input[name="sessions[0].startTime"]').invoke('attr','value').as('startdate1');
        
      
          //select end date
         /* cy.get('input[name="sessions[0].endTime"]').click();            //needs a data cy attribute
          cy.get('button.MuiPickersDay-root').contains('30').click();
          cy.get('.MuiClock-squareMask').eq(0).click('left', { force: true });
          cy.get('.MuiClock-squareMask').click('right', { force: true });
          cy.get('button').contains('OK').click();*/
  
          cy.get('input[name="sessions[0].endTime"]').invoke('attr','value').as('enddate1');
   
        //controls in calenda 

        //NEXT BUTTON
    cy.get('button[data-cy="next-btn"]').eq(1).click();

        // select announcement location
        cy.get('*[data-cy="location-options-online"]').click(); //data-cy needs to be added to the label because 

        //add url
        cy.get('#url_link').type('{selectAll}{del}').type(editData.url);

      //NEXT BUTTON
      cy.get('button[data-cy="next-btn"]').eq(2).click();


        // fill in description
        cy.get('textarea[data-cy="description"]').type('{selectAll}{del}').type(testData.description)

        // fill in extended description
        cy.get('textarea[data-cy="extendedDescription"]').type('{selectAll}{del}').type(testData.extendedDescription)

        // set announcement location

         //NEXT BUTTON
        cy.get('button[data-cy="next-btn"]').eq(3).click();

            //NEXT BUTTON
    cy.get('button[data-cy="next-btn"]').eq(3).click();
      //ANNOUNCEMENT DISPLAY PREFERENCES
      cy.get('input[value="ps"]').click()

        // click submit announcement button
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(25000);

        //  check that the announcement was created
        cy.get('p[class*="MuiTypography-root MuiTypography-body1"]').eq(1).should('have.text', editData.title);

        //Approve post
        cy.visit('https://qa.communityhubqa.cloud/calendar/')

        cy.wait(5000);

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();

        let number2 = 0;
        let count2 = 0;
        cy.get('.card-body').each(($el, index, $list) => {
            const announcement = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(announcement);
            number2 = count2;
            count2 = count2 + 1;
            if (announcement === editData.title) {

                cy.log(number2);
                cy.wait(5000);
                cy.get('button[data-cy="approve-btn"]').eq(number2).click();
                cy.wait(2000);
            }
        })

        //VERIFY EDITED DETAILS

        
        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();
        cy.get('button[id*="announcements"]').click();
        cy.wait(8000);

        let count4 = 1;
        let number4 = 1;
        cy.get('.card-body').each(($el, index, $list) => {
            const announcement = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(announcement);
            number4 = count4;
            count4 = number4 + 1;
            if (announcement === editData.title) {


                cy.wait(5000);

                cy.get('button[data-cy="edit-post"]').click();
            }

        })
cy. wait(5000);
        // edit in contact email
        cy.get('#contactEmail').should('have.value', editData.contactEmail);

        // fill in phone
        cy.get('#phone').should('have.value', '(951) 525-7859');

        // fill in website
        cy.get('#website').should('have.value', editData.website);

         //NEXT BUTTON
    cy.get('button[data-cy="next-btn"]').eq(0).click();

        // fill in a title
        cy.get('#title').should('have.value', editData.title);

        // select sponsor
        cy.get('#sponsors').click();
        cy.get('*[data-cy="sponsors-block"]>div>div>div>span.css-11lqbxm').contains('New Sponsor 2').should('have.text',editData.sponsor);
        cy.get('body').type('{esc}');



        // select post type
        cy.get('*[data-cy="postTypeId"]').click();  
        cy.get('*[data-value="Ecolympics or Environmental"]').invoke('attr','aria-selected').should('equal', 'true');
        cy.get('body').type('{esc}'); 

        //select start date
       
        
        cy.get('input[name="sessions[0].startTime"]').invoke('attr','value').as('startdate2');

        cy.get('@startdate1').then((startdate1) =>{
            cy.get('@startdate2').then((startdate2) => {
                expect(startdate1).to.equal(startdate2);
            })
        })
        //select end date

        
     cy.get('input[name="sessions[0].endTime"]').invoke('attr','value').as('enddate2');

     cy.get('@enddate1').then((enddate1) =>{
        cy.get('@enddate2').then((enddate2) => {
            expect(enddate1).to.equal(enddate2);
        })
    })

//NEXT BUTTON
cy.get('button[data-cy="next-btn"]').eq(1).click();

        // select announcement location
        cy.get('*[data-cy*="location-options"]>.Mui-checked+*').click(); //data-cy needs to be added to the label because 

        //add url
        cy.get('#url_link').should('have.value', editData.url);

        // add register button


        // fill in description
        cy.get('textarea[data-cy="description"]').should('have.value', testData.description)

        // fill in extended description
        cy.get('textarea[data-cy="extendedDescription"]').should('have.value', testData.extendedDescription)


        // DELETE THE announcement
cy.visit('https://qa.communityhubqa.cloud/calendar/')

cy.wait(5000);
cy.get('#unapproved-tab').click();
cy.wait(2000);
cy.get('#main-feed-tab').click();

cy.wait(12000);
        let count3 = 0;
        let number3 = 0;
        cy.get('.card-body').each(($el, index, $list) => {
            const announcement = $el.find('a[href*="/calendar/post"]>p').text();
            cy.log(announcement);
            number3 = count3;
            count3 = count3 + 1;
            cy.log(number2);
            if (announcement === editData.title) {
                cy.wait(5000);

                cy.get('button[data-cy="delete-btn"]').eq(number3).click();
            }
            cy.get('button').contains(/^Confirm$/).click();
        })

    })


})