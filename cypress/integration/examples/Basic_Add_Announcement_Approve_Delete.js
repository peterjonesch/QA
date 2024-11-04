/// <reference types="Cypress" />


describe('Test Announcement Creation on QA Calendar', () => {



  // create a new Announceement
  it.only('Create an event', () => {

    cy.visit('https://qa.communityhubqa.cloud/calendar/')

    const testData = {
      email: 'qa.communityhub@gmail.com',
      contactEmail: 'qa.communityhub@gmail.com',
      phone: '1234567890',
      website: 'https://communityhub.cloud',
      // use a random string in title to avoid conflicts with an existing event
      title: `${Math.random().toString(36).substring(2, 15)} Test Announcement`,
      description: 'Test Announcement Description',
      extendedDescription: 'Test Announcement  Extended Description',

    }

    let startDate;
    let endDate;
 

    //click on Post button
    cy.wait(2000);
    cy.get(':nth-child(2) > a > .MuiButtonBase-root').click();

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
    cy.get('li[data-value="City Government"]').click();
    cy.get('body').type('{esc}');

    //select start date
    cy.get('input[name="sessions[0].startTime"]').invoke('attr', 'value').then((val) => {


     
      startDate = Date.parse(val) ;
      cy.log(startDate);

  

    //select end date
    cy.get('input[name="sessions[0].endTime"]').invoke('attr', 'value').then((val) => {

      
      endDate =  Date.parse(val);
      cy.log(endDate);

  
    //Announcement date verification
 
let difference=Math.abs(endDate-startDate);
let days=difference/(1000*60*60*24);
cy.log(days);

  if(29>days<= 30){
    cy.log('The date for announcement is correct');
  }
  else{
 cy.log('Error').then(()=>{
  assert.fail('The announcement date function is not working as expected, gap is more than 30 days');
 });
    
  }
});
});
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

