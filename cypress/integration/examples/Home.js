///<reference types ="Cypress"/>

describe('Tests on the home page', () =>{

   

it('Event filter and event types combination',() =>  {
cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')

const testData = {
    email: 'qa.communityhub@gmail.com',
    contactEmail: 'qa.communityhub@gmail.com',
    phone: '1234567890',
    website: 'https://communityhub.cloud',
    // use a random string in title to avoid conflicts with an existing event
    title: `Event type and filter combination`,
    description: 'Test Event Description',
    extendedDescription: 'Test Event  Extended Description',
   
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

  //add sponsor
  cy.get('a[data-cy="add-sponsor"]').click();

  //select sponsor2
  cy.get('select[data-cy="sponsor2"]').select('Jones')

  // select post type
  cy.get('.css-hlgwow').eq(0).click();                           //needs a data cy attribute
  cy.get('#react-select-3-option-0').click();

  cy.get('#react-select-3-input').click(); 
  cy.get('#react-select-3-option-11').click();

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
  cy.get('input[data-cy="location-online"]').type('https://www.google.com/');
   
   // fill in description
   cy.get('textarea[data-cy="short-description"]').type(testData.description)

   // fill in extended description
   cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)

  // click submit event button
      cy.get('button[data-cy="submit-btn"]').click();
      cy.wait(20000);

  //  check that the event was created
  cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text',testData.title);
  
  //Approve post
  cy.login('qa.communityhub@gmail.com','Oberlin123!');
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

  //Verify filter and type combination

  cy.get('#main-feed-tab').click();
   cy.get('#unapproved-tab').click();
   cy.get('#main-feed-tab').click();

  cy.get('button[data-value="events"]').click();

  cy.get('#post-type>a[data-value="Volunteer opportunities"]').click();
  cy.wait(10000);
  let numb;
  cy.get('h4[class="card-title mb-1"]').should(($li) =>{
    numb=$li.length;

    for(let i=0;i<numb;i++){
        if($li.eq(i).text()=== testData.title){

            expect($li.eq(i)).to.have.text(testData.title);
        }
    }
  })


  cy.get('#post-type>a[data-value="City government"]').click();


 
  cy.wait(10000);
  cy.get('h4[class="card-title mb-1"]').should(($li) =>{
    numb=$li.length;

    for(let i=0;i<numb;i++){
        if($li.eq(i).text()=== testData.title){

            expect($li.eq(i)).to.have.text(testData.title);
        }
    }

  });

  cy.log(numb);

    // delete the event to cleanup
   
   

   cy.wait(20000);
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

it('Announcement filter and event types combination',() =>  {
    cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')
    
    const testData = {
        email: 'qa.communityhub@gmail.com',
        contactEmail: 'qa.communityhub@gmail.com',
        phone: '1234567890',
        website: 'https://communityhub.cloud',
        // use a random string in title to avoid conflicts with an existing event
        title: `Announcement type and filter combination`,
        description: 'Test Announcement Description',
        extendedDescription: 'Test Announcement  Extended Description',
       
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
    
      //add sponsor
      cy.get('a[data-cy="add-sponsor"]').click();
    
      //select sponsor2
      cy.get('select[data-cy="sponsor2"]').select('Jones')
    
      // select post type
      cy.get('.css-hlgwow').eq(0).click();                           //needs a data cy attribute
      cy.get('#react-select-3-option-1').click();
    
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
      cy.get('input[data-cy="location-online"]').type('https://www.google.com/');
       
       // fill in description
       cy.get('textarea[data-cy="short-description"]').type(testData.description)
    
       // fill in extended description
       cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)
    
      // click submit event button
          cy.get('button[data-cy="submit-btn"]').click();
          cy.wait(20000);
    
      //  check that the event was created
      cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text',testData.title);
      
      //Approve post
      cy.login('qa.communityhub@gmail.com','Oberlin123!');
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
    
      //Verify filter and type combination
    
      cy.get('#main-feed-tab').click();
       cy.get('#unapproved-tab').click();
       cy.get('#main-feed-tab').click();
    
      cy.get('button[data-value="events"]').click();
    
      cy.get('#post-type>a[data-value="Exhibits"]').click();
      let numb;
      cy.wait(10000);
      cy.get('h4[class="card-title mb-1"]').should(($li) =>{
        numb=$li.length;
    
        for(let i=0;i<numb;i++){
            if($li.eq(i).text()=== testData.title){
    
                expect($li.eq(i)).to.have.text(testData.title);
            }
        }
    
      });
    
      cy.log(numb);
    
        // delete the event to cleanup
       
       
    
       cy.wait(20000);
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