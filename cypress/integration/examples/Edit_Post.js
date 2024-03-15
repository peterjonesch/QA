///<reference types= "Cypress"/>

describe('Edit posts', () => {

    it('Edit and save event', () => {


        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')

        const testData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: 'qa.communityhub@gmail.com',
            phone: '1234567890',
            website: 'https://communityhub.cloud',
            // use a random string in title to avoid conflicts with an existing event
            title: `Edit post test`,
            description: 'Test Event Description',
            extendedDescription: 'Test Event  Extended Description',

        }
        const editData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: '1peter@communityhub.cloud',
            phone: '9515257859',
            website: 'www.test.com',
            // use a random string in title to avoid conflicts with an existing event
            title: `Edited test`,
            description: 'Test Event Description is edited',
            extendedDescription: 'Test Event  Extended Description edited',
            sponsor:'peter',
            url: 'www.communityhub.com'

        }
       
        // fill in email
        cy.get('input[data-cy="your-email"]').type(testData.email)

        // fill in contact email
        cy.get('input[data-cy="contact-email"]').type(testData.contactEmail)

        // fill in phone
        cy.get('input[data-cy="phone"]').type(testData.phone)

        // fill in website
        cy.get('input[data-cy="website"]').type(testData.website)

        // fill in a title
        cy.get('input[data-cy="title"]').type(testData.title)

        // select sponsor
        cy.get('select[data-cy="sponsor1"]').select('Jones')

        // select post type
        cy.get('.css-hlgwow').eq(0).click();                           //needs a data cy attribute
        cy.get('#react-select-3-option-0').click();

        //select start date
        cy.get('input[placeholder="Start Date"]').click();            //needs a data cy attribute
        cy.get('td[class="rdtDay rdtToday"]').eq(0).click();

        //select end date
        cy.get('input[placeholder="End Date"]').click();              //needs a data cy attribute

        cy.get('td[class="rdtDay rdtToday"]+td').eq(0).click();
        cy.get('.rdtTimeToggle').eq(1).click();
        cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(0).click();

        //controls in calendar

        cy.get('label[for="date"]').eq(1).click();

        // select event location
        cy.get('label[for="online"]').click(); //data-cy needs to be added to the label because 

        //add url
        cy.get('input[data-cy="location-online"]').type(editData.url);

        // add register button


        // fill in description
        cy.get('textarea[data-cy="short-description"]').type(testData.description)

        // fill in extended description
        cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)

        // set event location

        // upload image

        // click submit event button
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(20000);

        //  check that the event was created
        cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text', testData.title);

        //Approve post
        cy.login('qa.communityhub@gmail.com', 'Oberlin123!');
        cy.wait(10000);
        cy.get('#unapproved-tab').click();
        let count = 0;
        let number = 0;
        cy.wait(6000);

        cy.get('.card-body').each(($el, index, $list) => {
            const event = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(event);
            number = count;
            count = count + 1;
            if (event === testData.title) {

                cy.log(number);
                cy.wait(5000);
                cy.get('button[class="btn btn-success mb-2"]').eq(number).click();
            }
        })

        //Edit the post

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();
        cy.wait(20000);
       cy.get('span[class="MuiTypography-root MuiTypography-button sc-iBAaJG cDHvQl css-124qbkz"]').eq(2).click();

       cy.wait(5000);
      

// edit in contact email
cy.get('input[data-cy="contact-email"]').type('{selectAll}{del}').type(editData.contactEmail);

  // fill in phone
  cy.get('input[data-cy="phone"]').type('{selectAll}{del}').type(editData.phone)

  // fill in website
  cy.get('input[data-cy="website"]').type('{selectAll}{del}').type(editData.website)

  // fill in a title
  cy.get('input[data-cy="title"]').type('{selectAll}{del}').type(editData.title)

  // select sponsor
  cy.get('select[data-cy="sponsor1"]').select(editData.sponsor)


  // select post type
  cy.get('*[aria-label*="Remove "]').click(); 
  cy.wait(3000);
  cy.get('.css-hlgwow').eq(0).click(); 
  cy.wait(2000); 
  cy.get('#react-select-3-option-11').click();

  //select start date
  cy.get('input[placeholder="Start Date"]').click();            //needs a data cy attribute
  cy.get('td[class="rdtDay rdtActive rdtToday"]').eq(0).click();

  //select end date
  cy.get('input[placeholder="End Date"]').click();              //needs a data cy attribute

  cy.get('td[class="rdtDay rdtToday"]+td').eq(0).click();
  cy.get('.rdtTimeToggle').eq(1).click();
  cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(0).click();

  //controls in calendar

  cy.get('label[for="date"]').eq(1).click();

  // select event location
  cy.get('label[for="online"]').click(); //data-cy needs to be added to the label because 

  //add url
  cy.get('input[data-cy="location-online"]').type('{selectAll}{del}').type(editData.url);

  // add register button


  // fill in description
  cy.get('textarea[data-cy="short-description"]').type('{selectAll}{del}').type(testData.description)

  // fill in extended description
  cy.get('textarea[data-cy="extended-description"]').type('{selectAll}{del}').type(testData.extendedDescription)

  // set event location

  // upload image

  // click submit event button
  cy.get('button[data-cy="submit-btn"]').click();
  cy.wait(20000);

  //  check that the event was created
  cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text', testData.title);

  //Approve post
  cy.login('qa.communityhub@gmail.com', 'Oberlin123!');
  cy.wait(10000);
  cy.get('#unapproved-tab').click();
  let count1 = 0;
  let number1 = 0;
  cy.wait(6000);

  cy.get('.card-body').each(($el, index, $list) => {
      const event = $el.find('h4[class="card-title mb-1"]').text();
      cy.log(event);
      number1 = count;
      count1 = count + 1;
      if (event === testData.title) {

          cy.log(number1);
          cy.wait(5000);
          cy.get('button[class="btn btn-success mb-2"]').eq(number1).click();
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
            const event = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(event);
            number2 = count2;
            count2 = count2 + 1;
            cy.log(number2);
            if (event === testData.title) {
                cy.wait(5000);

                cy.get("button[class='btn btn-danger mb-2']").eq(number2).click();
            }
        })

    })


})





