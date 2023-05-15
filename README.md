# Website Tests

This repository contains edge cases end-to-end UI tests for a clothing store web applicaction https://automationexercise.com/
using Cypress with Javascript.

## Tools:

* [Nodejs](https://nodejs.org/en/) is an open-source, cross-platform JavaScript runtime environment.
* [Cypress](https://www.cypress.io/) is the automation framework selected. 

* [VSCode](https://code.visualstudio.com/) is the development framework used for this project because is light and suitable for development, running and debugging with javascript code.

## Test plan, design and strategy:
For this home test, I decided to use **[Functional Testing](https://www.thisdot.co/blog/functional-testing-with-cypress)** to focus on the **UI** lawyer od the application. This includes: 
1) E2E test case that performs the whole flow to **Purchace Products**. This involves: 
  * *Select product*: designed to select random products so we can validate with different items. 
  * *Adding the product to cart shooping*: and designed to validate that the product was correctly selected by validating its name
  * *Setting product quantity:* and designed to validate that the quantity entered remained the same after being selected.
  * *Create/register user information:* by entering mandatory fields using a [faker library](https://fakerjs.dev/) to generate random data.
  * *Completing checkout and payment:* by entering credit card random values with the faker library and validating expected messages after completing each step.
  * *Performing logout:* to validate that user is able to logout from his account.
  * *Logging in with created user:* by saving the user data during the test so it can be used to login into the application.
  * *Completing a "Contact Us" request:* by entering fake data and validating output message. 
  
  As part of the wait strategy and to avoid flaky tests, I decided to use cypress command [`cy.intercept()`](https://docs.cypress.io/api/commands/intercept) to intercept each url visited during the test to start performing actions only when the url was successfully intercepted.  
  
  Also, I used **page objects models** for each page visited during the test to define page salectors for easier maintenance, reading and test organizations. 
  
 2) Edge test cases for **Login** page. I desinged three types of edge tests:
  * *Validate error message when credentials are incorrect*
  * *Validate error message when email or password are empty*
  * *Validate error message when email has invalid format*
  
  Note: more test cases can be designed for this feature, these are just an example of a few of them. Also, more test cases like this can be designed for SignUp feature, Selecting products, etc. 
  
  As part of the strategy fot edge test cases I decided to use [fixtures](https://docs.cypress.io/api/commands/fixture) file in Cypress to use the concept of *[Data Driven Testing](https://www.browserstack.com/guide/data-driven-testing-using-cypress)*, so I can pass different input values to the test by using a Json file. 
  
 ## Environment Setup:
 
 For running this project locally you need to have installed the following tools:

* #### [Nodejs](https://nodejs.org/en/download/): Please install node according to your system requirements and make sure that the installation comes with [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  * Validate you have npm installed by running following command: 

    ``
    npm -v
    ``

## Running Tests:

1) Clone this repo:

  ```
  git clone https://github.com/LerryAlexander/apply-digital-cypress-test.git
  ```
  Move to the root folder by running: `cd apply-digital-cypress-test/`
  
2) Install dependencies:

  ```
  npm install 
  ```
  
3) Run cypress tests. There are two ways:
    * Run cypress headless mode (no browser interaction):
    
      ```
      npm run cypress:run
      ``` 
      
      OR
    
    * Run cypress open mode (User Interface):
      
      ```
      npm run cypress:open
      ```
      Then, select E2E Testing --> Choose a browser --> Select from E2E specs the spec to run.

## Watch test video:
  After running test with command: `npm run cypress:run`, you can watch video executions stored at path: 
  
  ```
  cypress/videos
  ```
  
## Generate consolidated report:
  After running test with command: `npm run cypress:run`, you can generate [mochawesome](https://www.npmjs.com/package/mochawesome) report by running:
  
  ```
  npm run cypress:report
  ```
  Generated report in HTML format can be found at: `cypress/report/output.html`
  


