import LoginPage from 'page-objects/login-page';
import { URLS } from './constants';

const loginPage = new LoginPage();

const BASE_URL = Cypress.env('APP_URL');

describe('Login Tests', () => {

    beforeEach('Open the website', () => {
      /** Opening login page */
      cy.intercept(BASE_URL+URLS.login).as('login');
      cy.visit(BASE_URL+URLS.login);
      cy.wait('@login');
      });
  
    it('Shows error message when credentials are incorrect', () => {
        /** Validate the error message when entering wrong credentials */
        cy.fixture("loginData").then((loginData) => {
            loginData.wrongCredentials.forEach((wrongCredential) => {
                loginPage.login(wrongCredential.email, wrongCredential.password);
                cy.get('[action="/login"]').find('p').contains(wrongCredential.expectedOutput);
            });
        });
    });

    it('Shows error message when email or password are empty', () => {
        cy.fixture("loginData").then((loginData) => {
            loginData.emptyInputs.forEach((emptyInputs) => {

            emptyInputs.email == '' ? loginPage.loginEmailField().clear() : loginPage.loginEmailField().type(emptyInputs.email);
            emptyInputs.password == '' ? loginPage.loginPasswordField().clear() : loginPage.loginPasswordField().type(emptyInputs.password);
            loginPage.loginButton().click();

            if(emptyInputs.email==''){
                loginPage.loginEmailField().then(($input) => {
                    expect($input[0].validationMessage).to.eq(emptyInputs.expectedMessage);
                });
            }else if(emptyInputs.password==''){
                loginPage.loginPasswordField().then(($input) => {
                    expect($input[0].validationMessage).to.eq(emptyInputs.expectedMessage);
                });
            }        
            })
        })
      });

    it('Shows error message when email has invalid format', () => {
        cy.fixture("loginData").then((loginData) => {
            loginData.invalidInputs.forEach((invalidInput) => {
                loginPage.loginEmailField().clear().type(invalidInput.email);
                loginPage.loginPasswordField().clear().type(invalidInput.password);
                loginPage.loginButton().click();
                loginPage.loginEmailField().then(($input) => {
                    expect($input[0].validationMessage).to.contain(invalidInput.expectedMessage);
                });
            });
        });
    })
  
  });