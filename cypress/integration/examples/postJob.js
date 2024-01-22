/// <reference types="Cypress" />


describe('Test Event Creation on QA Calendar', () => {

  

    // create a new job
    it.only('Create a job', () => {
  
      cy.visit('https://qa.communityhubqa.cloud/calendar/jobs')
  
      const testData = {
        email: 'qa.communityhub@gmail.com',
        contactEmail: 'qa.communityhub@gmail.com',
        phone: '1234567890',
        website: 'https://communityhub.cloud',
        // use a random string in title to avoid conflicts with an existing event
        title: `${Math.random().toString(36).substring(2, 15)} Test Job`,
        description: 'Test Event Description',
        extendedDescription: 'Test Event  Extended Description',
        start: '2020-01-01',
        end: '2020-01-01',
      }
  //click on Post button
  cy.wait(2000);
  cy.get(':nth-child(2) > a > .MuiButtonBase-root').click();

  //choose announcement
  cy.get('label[for="job_post"]').click();
  
   
  
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
  
      // select employer
      cy.get('select[data-cy="sponsor1"]').select('Jones')
  
       // select employment type 
       cy.get('select[data-cy="employment-type"]').select('Full-time'); //data-cy needs to be added to the label because

       // select workplace type 
       cy.get('label[for="workplace_type_1"]').click();

        // select event location
    cy.get('a[data-cy="button-online-application"]').click(); //data-cy needs to be added to the label because 

    //add url
    cy.get('input[data-cy="button-text"]').type('https://www.google.com/');
  
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
      
      cy.get('label[for="date"]').eq(0).click();

      // add register button
   
       
       // fill in description
       cy.get('textarea[data-cy="short-description"]').type(testData.description)
  
       // fill in extended description
       cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)
  
      // set event location
  
      // upload image
  
      // click submit announcement button
          cy.get('button[data-cy="submit-btn"]').click();
          cy.wait(20000);
  
      //  check that the announcement was created
      cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text',testData.title);
      
      //Approve post
      cy.loginjobs('qa.communityhub@gmail.com','Oberlin123!');
      cy.wait(10000);
      cy.visit('https://qa.communityhubqa.cloud/calendar/jobs');
      cy.wait(10000);
      cy.get('#unapproved-tab').click();
  
      let count=0;
      let number=0;
      cy.wait(6000);
  
      cy.get('.card-body').each(($el,index,$list)=>{
          const event=$el.find('h4[class="card-title mb-1"]').text();
          cy.log(event);
          number=count;
          count=count+1;
          if(event===testData.title){
           
              cy.log(number);
              cy.wait(5000);
              cy.get('button[class="btn btn-success mb-2"]').eq(number).click();
          }
      })
    
      
  
  
        // delete the job to cleanup
     
  
       cy.get('#main-feed-tab').click();
       cy.get('#unapproved-tab').click();
       cy.get('#main-feed-tab').click();
  
       cy.wait(10000);
       let count2=0;
       let number2=0;
       cy.get('.card-body').each(($el,index,$list)=>{
        const event=$el.find('h4[class="card-title mb-1"]').text();
        cy.log(event);
        number2=count2;
        count2=count2+1;
        cy.log(number2);
        if(event===testData.title){
           cy.wait(5000);
            
            cy.get("button[class='btn btn-danger mb-2']").eq(number2).click();
        }
    })
    
  })
  
  
    })
  
