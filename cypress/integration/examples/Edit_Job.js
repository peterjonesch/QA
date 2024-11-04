///<reference types= "Cypress"/>

describe('Edit Job', () => {

    it('Edit and save Job', () => {


        cy.visit('https://qa.communityhubqa.cloud/calendar/post/new')

        const testData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: 'qa.communityhub@gmail.com',
            phone: '1234567890',
            website: 'https://communityhub.cloud',
            // use a random string in title to avoid conflicts with an existing Job
            title: `Edit Job test`,
            description: 'Test Job Description',
            extendedDescription: 'Test Job  Extended Description',
            url: 'www.google.com',
            employer: 'Jones',
            employmentType: 'Contract'

        }
        const editData = {
            email: 'qa.communityhub@gmail.com',
            contactEmail: '1peter@communityhub.cloud',
            phone: '9515257859',
            website: 'www.test.com',
            // use a random string in title to avoid conflicts with an existing Job
            title: `Edited Job test`,
            description: 'Test Job Description is edited',
            extendedDescription: 'Test Job  Extended Description edited',
            sponsor: 'peter',
            url: 'www.communityhub.com',
            jobCategory: 'Art Fashion & Design',
            employer: 'peter',
            employmentType: 'Full-time'

        }
        //CREATE POST

        //Switch to Job
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

        // select who is th employer
        cy.get('select[data-cy="sponsor1"]').select(testData.employer)

        // select job category
        cy.get('.css-hlgwow').eq(0).click();                           //needs a data cy attribute
        cy.get('#react-select-3-option-0').click();

        // select Employment type
        cy.get('#employment_type').select(testData.employmentType);
        cy.wait(3000);


        // select Workplace type
        cy.get('label[for="workplace_type_1"]').click();

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

        //add online link
        cy.get('a[data-cy="button-online-application"]').click();
        cy.wait(3000);
        cy.get('input[data-cy="button-text"]').type('{selectAll}{del}').type(editData.url);


        // fill in description
        cy.get('textarea[data-cy="short-description"]').type(testData.description)

        // fill in extended description
        cy.get('textarea[data-cy="extended-description"]').type(testData.extendedDescription)

        // set Job location

        // upload image

        // click submit Job button
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(20000);

        //  check that the Job was created
        cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text', testData.title);

        //Approve post
        cy.loginjobs('qa.communityhub@gmail.com', 'Oberlin123!');
        cy.wait(10000);
        cy.get('li:has(a[href^="https://qa.communityhubqa.cloud/calendar/jobs"])').click();
        cy.wait(6000);
        cy.get('#unapproved-tab').click();
        let count = 0;
        let number = 0;
        cy.wait(6000);

        cy.get('.card-body').each(($el, index, $list) => {
            const Job = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(Job);
            number = count;
            count = count + 1;
            if (Job === testData.title) {

                cy.log(number);
                cy.wait(5000);
                cy.get('button[class="btn btn-success mb-2"]').eq(number).click();
            }
        })

        //EDIT THE POST

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();
        cy.wait(5000);
        let count1 = 1;
        let number1 = 1;
        cy.get('.card-body').each(($el, index, $list) => {
            const Job = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(Job);
            number1 = count1;
            count1 = number1 + 1;
            if (Job === testData.title) {

                cy.log(number1);
                cy.wait(5000);
                cy.get('span[class*="MuiTypography-root MuiTypography-button sc-"]').eq((number1 * 4)+1).click();
            }

        })

        cy.wait(5000);


        // edit in contact email
        cy.get('input[data-cy="contact-email"]').type('{selectAll}{del}').type(editData.contactEmail);

        // fill in phone
        cy.get('input[data-cy="phone"]').type('{selectAll}{del}').type(editData.phone)

        // fill in website
        cy.get('input[data-cy="website"]').type('{selectAll}{del}').type(editData.website)

        // fill in a title
        cy.get('input[data-cy="title"]').type('{selectAll}{del}').type(editData.title)

        // select who is th employer
        cy.get('select[data-cy="sponsor1"]').select(editData.employer)

        //  select job category
        cy.get('*[aria-label="Remove Accounting & Finance"]').click();
        cy.wait(2000);
        cy.get('.css-hlgwow').eq(0).click();                         //needs a data cy attribute
        cy.get('#react-select-3-option-2').click();

        // select Employment type
        cy.get('#employment_type').select(editData.employmentType);
        cy.wait(3000);


        // select Workplace type
        cy.get('label[for="workplace_type_1"]').click();

        //Add online link
        cy.get('a[data-cy="button-online-application"]').click();
        cy.wait(3000);
        cy.get('input[data-cy="button-text"]').type(editData.url);

        //select start date
        cy.get('input[placeholder="Start Date"]').click();            //needs a data cy attribute
        cy.get('td[class="rdtDay rdtActive rdtToday"]').eq(0).click();

        cy.wait(2000);


        cy.get('input[name="session-starttime[]"]').invoke('attr', 'value').as('startdate1');



        //select end date
        cy.get('input[placeholder="End Date"]').click();              //needs a data cy attribute

        cy.get('td[class="rdtDay rdtToday"]+td').eq(0).click();
        cy.get('.rdtTimeToggle').eq(1).click();
        cy.get('div[class="rdtCounters"] > div:nth-child(1) >span').eq(0).click();
        cy.wait(2000);

        cy.get('input[name="session-endtime[]"]').invoke('attr', 'value').as('enddate1');

        //controls in calendar 

        cy.get('label[for="date"]').eq(0).click();

         

        //add online link
        cy.get('a[data-cy="button-online-application"]').click();
        cy.wait(3000);
        cy.get('input[data-cy="button-text"]').type('{selectAll}{del}').type(editData.url);

        // add register button


        // fill in description
        cy.get('textarea[data-cy="short-description"]').type('{selectAll}{del}').type(testData.description)

        // fill in extended description
        cy.get('textarea[data-cy="extended-description"]').type('{selectAll}{del}').type(testData.extendedDescription)

        // set Job location

        // upload image

        // click submit Job button
        cy.get('button[data-cy="submit-btn"]').click();
        cy.wait(20000);

        //  check that the Job was created
        cy.get('#top >div>div:nth-child(1)>div>h1').should('have.text', editData.title);

        //Approve post
        cy.visit('https://qa.communityhubqa.cloud/calendar/jobs')

        cy.wait(5000);

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.wait(5000);


        let number2 = 0;
        let count2 = 0;
        cy.get('.card-body').each(($el, index, $list) => {
            const Job = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(Job);
            number2 = count2;
            count2 = count2 + 1;
            if (Job === editData.title) {

                cy.log(number2);
                cy.wait(5000);
                cy.get('button[class="btn btn-success mb-2"]').eq(number2).click();
            }
        })
        //VERIFY EDITED DETAILS

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();
        cy.wait(5000);

        let count4 = 1;
        let number4 = 1;
        cy.get('.card-body').each(($el, index, $list) => {
            const Job = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(Job);
            number4 = count4;
            count4 = number4 + 1;
            if (Job === editData.title) {

                cy.log(number4);
                cy.wait(5000);
                cy.get('span[class*="MuiTypography-root MuiTypography-button sc-"]').eq((number4 * 5)+1).click();
            }

        })

        // edit in contact email
        cy.get('input[data-cy="contact-email"]').should('have.value', editData.contactEmail);

        // fill in phone
        cy.get('input[data-cy="phone"]').should('have.value', editData.phone);

        // fill in website
        cy.get('input[data-cy="website"]').should('have.value', editData.website);

        // fill in a title
        cy.get('input[data-cy="title"]').should('have.value', editData.title);

        // select sponsor
        cy.get('select[data-cy="sponsor1"]').should('have.value', editData.sponsor);


        // select post type
        cy.get(' .css-9jq23d').should('have.text', editData.jobCategory);

        //select start date


        cy.get('input[name="session-starttime[]"]').invoke('attr', 'value').as('startdate2');

        cy.get('@startdate1').then((startdate1) => {
            cy.get('@startdate2').then((startdate2) => {
                expect(startdate1).to.equal(startdate2);
            })
        })

        //select end date

        cy.get('input[name="session-endtime[]"]').invoke('attr', 'value').as('enddate2');

        cy.get('@enddate1').then((enddate1) => {
            cy.get('@enddate2').then((enddate2) => {
                expect(enddate1).to.equal(enddate2);
            })
        })

        //add url  
        //Enable this after this ticket is resolved https://www.notion.so/Calendar-Events-Online-register-link-not-saving-in-jobs-7824ce90587e49cfa67e78b08f38278b?pvs=4
       
       /* cy.get('a[data-cy="button-online-application"]').click();
        cy.wait(3000);
        cy.get('input[data-cy="button-text"]').should('have.value',editData.url);

*/
        // fill in description
        cy.get('textarea[data-cy="short-description"]').should('have.value', testData.description)

        // fill in extended description
        cy.get('textarea[data-cy="extended-description"]').should('have.value', testData.extendedDescription)


        // DELETE THE Job
        cy.visit('https://qa.communityhubqa.cloud/calendar/jobs')

        cy.wait(20000);

        cy.get('#main-feed-tab').click();
        cy.get('#unapproved-tab').click();
        cy.get('#main-feed-tab').click();

        cy.wait(7000);

        let count3 = 0;
        let number3 = 0;
        cy.get('.card-body').each(($el, index, $list) => {
            const Job = $el.find('h4[class="card-title mb-1"]').text();
            cy.log(Job);
            number3 = count3;
            count3 = count3 + 1;
            cy.log(number2);
            if (Job === editData.title) {
                cy.wait(5000);

                cy.get("button[class='btn btn-danger mb-2']").eq(number3).click();
            }
        })

    })


})