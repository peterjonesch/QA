///<reference types="Cypress"/>

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
        title_2:'timezone' ,
        description: 'Test Event Description',
        extendedDescription: 'Test Event  Extended Description',
       
      }

    it('Start Date greater than end date', () => {
        //Start Date
        cy.get('input[placeholder="Start Date"]').click();
        cy.get('td[class="rdtDay rdtToday"]+td').eq(0).click();

        //End date
        cy.get('input[placeholder="End Date"]').click();
        cy.wait(2000);
        cy.get('td[class="rdtDay rdtToday"]').eq(1).click();
        cy.get('.rdtTimeToggle').eq(1).click();
        cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(0).click();

        //submit
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(2000);

        //verify

        cy.get("#alert-danger-text>ul>li").eq(5).contains('Session end time must be after session start time.');
    })

    it('Start Date is same as End Date', () => {

 //Start Date
 cy.get('input[placeholder="Start Date"]').click();
 cy.get('td[class="rdtDay rdtToday"]').eq(0).click()

 //End date
 cy.get('input[placeholder="End Date"]').click();
 cy.wait(2000);
 cy.get('td[class="rdtDay rdtToday"]').eq(0).click();
 cy.get('.rdtTimeToggle').eq(1).click();
 cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(0).click();

 //submit
 cy.get('button[data-cy="submit-btn"]').click();
 cy.wait(2000);

 //verify

 cy.get("#alert-danger-text>ul>li").eq(5).contains('Session end time must be after session start time.');


    })



    it('To submit an event with overlapping dates', () => {

       
//fill in your email

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
    
        //add sponsor
        cy.get('a[data-cy="add-sponsor"]').click();
    
        //select sponsor2
        cy.get('select[data-cy="sponsor2"]').select('Jones')
    
        // select post type
        cy.get('.css-hlgwow').eq(0).click();                           
        cy.get('#react-select-3-option-0').click();
    
        //select start date
        cy.get('input[placeholder="Start Date"]').click();            
        cy.get('td[class="rdtDay rdtToday"]').eq(0).click();
       
        //select end date
        cy.get('input[placeholder="End Date"]').click();              
      
        cy.get('td[class="rdtDay rdtToday"]+td').eq(0).click();
        cy.get('.rdtTimeToggle').eq(1).click();
        cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(0).click();

        //Testing Delete button function for second event
        cy.get('*[data-cy="add-date-picker"]').click();
        cy.get('button[class="btn btn-danger daterange-delete-btn"]').click();

        //Second Event
        cy.get('*[data-cy="add-date-picker"]').click();      

        cy.get('input[placeholder="Start Date"]').eq(1).click();            //Start Date
        cy.get('td[class="rdtDay rdtActive rdtToday"]').eq(1).click();

        cy.get('input[placeholder="End Date"]').eq(1).click();              //End Date
        cy.get('td[class="rdtDay rdtActive rdtToday"]+td').eq(2).click();
        cy.get('.rdtTimeToggle').eq(2).click();
        cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(2).click();

    
        //controls in calendar
        
        cy.get('label[for="date"]').eq(1).click();
    
        // select event location
        cy.get('label[for="online"]').click(); 
    
        //add url
        cy.get('input[data-cy="location-online"]').type('https://www.google.com/');
    
        // add register button
     
         
         // fill in description
         cy.get('textarea[data-cy="short-description"]').type(testData.description)
    
         // fill in extended description
         cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)
    
        // set event location
    
        // upload image
    
        // click submit event button
            cy.get('button[data-cy="submit-btn"]').click();
            cy.wait(25000);
    
        //  check that the event was created
        cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text',testData.title);
        
        //Approve post
        cy.login('qa.communityhub@gmail.com','Oberlin123!');
        cy.wait(10000);
        cy.get('#unapproved-tab').click();
        let count=0;
        let number=0;
        cy.wait(10000);
    
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
      
        
    
          // delete the event to cleanup
         
         cy.get('#main-feed-tab').click();
         cy.get('#unapproved-tab').click();
         cy.get('#main-feed-tab').click();
    
         cy.wait(30000);
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

    it('Save post with a different timezone',() =>{

        cy.wait(2000);
        cy.get('input[data-cy="your-email"]').type(testData.email)

        // fill in contact email
        cy.get('input[data-cy="contact-email"]').type(testData.contactEmail)
    
        // fill in phone
        cy.get('input[data-cy="phone"]').type(testData.phone)
    
        // fill in website
        cy.get('input[data-cy="website"]').type(testData.website)
    
        // fill in a title
        cy.get('input[data-cy="title"]').type(testData.title_2)
    
        // select sponsor
        cy.get('select[data-cy="sponsor1"]').select('Jones')
    
        //add sponsor
        cy.get('a[data-cy="add-sponsor"]').click();
    
        //select sponsor2
        cy.get('select[data-cy="sponsor2"]').select('Jones')
    
        // select post type
        cy.get('.css-hlgwow').eq(0).click();                           
        cy.get('#react-select-3-option-0').click();

        //select timezone

        cy.get('#timezone').click();
        cy.get('#react-select-2-option-20').click();
    
        //select start date
       
        cy.get('input[placeholder="Start Date"]').click();  
       cy.get('th[class="rdtSwitch"]').eq(0).click();
        cy.get('th[class="rdtNext"]').eq(0).click();
        cy.get('td[class="rdtMonth" ][data-value="11"]').click();
        cy.get('td[data-value="30" ][data-month="11"]').click();

       
        //select end date
        cy.get('input[placeholder="End Date"]').click();              
      
        cy.get('th[class="rdtSwitch"]').eq(1).click();
        cy.get('th[class="rdtNext"]').eq(1).click();
        cy.get('td[class="rdtMonth" ][data-value="11"]').click();
        cy.get('td[data-value="31" ][data-month="11"]').eq(1).click();
    
        //controls in calendar
        
        cy.get('label[for="date"]').eq(1).click();
    
        // select event location
        cy.get('label[for="online"]').click(); 
    
        //add url
        cy.wait(2000);
        cy.get('input[data-cy="location-online"]').type('https://www.google.com/');
         
         // fill in description
         cy.get('textarea[data-cy="short-description"]').type(testData.description)
    
         // fill in extended description
         cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)
    
    
        // click submit event button
            cy.get('button[data-cy="submit-btn"]').click();
            cy.wait(25000);
    
        //  check that the event was created with the correct date
        cy.get('h4[style*="color"]').should('have.text','December 30, 12:00 AM to December 31, 12:00 AM');

        //cleanup
        cy.login('qa.communityhub@gmail.com','Oberlin123!');
        cy.wait(10000);
        cy.get('#unapproved-tab').click();
        let count=0;
        let number=0;
        cy.wait(10000);
    
        cy.get('.card-body').each(($el,index,$list)=>{
            const event=$el.find('h4[class="card-title mb-1"]').text();
            cy.log(event);
            number=count;
            count=count+1;
            if(event===testData.title_2){
             
                cy.log(number);
                cy.wait(5000);
                cy.get('button[class="btn btn-danger mb-2"]').eq(number).click();
            }
        })
    })
})