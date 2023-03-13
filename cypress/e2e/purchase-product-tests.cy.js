import HomePage from 'page-objects/home-page';
import CartPage from 'page-objects/cart-summary-page';
import CheckOutPage from 'page-objects/checkout-page';
import SignUpPage from 'page-objects/signup-page';
import ProductDetailsPage from 'page-objects/product-details-page';
import PaymentPage from 'page-objects/payment-page';
import LoginPage from 'page-objects/login-page';
import ContactUsPage from 'page-objects/contact-us-page';

import { faker } from '@faker-js/faker';
import { URLS } from './constants';

const homePage = new HomePage();
const cartPage = new CartPage();
const checkOutPage = new CheckOutPage();
const signUpPage = new SignUpPage();
const productDetailsPage = new ProductDetailsPage();
const paymentPage = new PaymentPage();
const loginPage = new LoginPage();
const contactUsPage = new ContactUsPage();

const BASE_URL = Cypress.env('APP_URL');
const username = faker.random.word();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Purchase Product Test', () => {
  before('Open the website', () => {
    /** Opening the shipping website */
    cy.intercept(BASE_URL).as('baseUrl');
    cy.visit(BASE_URL);
    cy.wait('@baseUrl');
    homePage.navigationBar().should('be.visible')
    });

  it('Purchase a product [E2E Test]', () => {
    /** Selecting the product */
    const productQuantity = '30';
    let selectedProduct;
    cy.intercept('GET', URLS.productDetails).as('productDetails');
    homePage.selectRandomProduct().then((product) => { selectedProduct = product });
    cy.wait('@productDetails');
    productDetailsPage.getProductName().then((currentProduct) => {
      expect(currentProduct).equal(selectedProduct);
    })
    cy.intercept('GET', URLS.viewCart).as('viewCart');

    /** Setting product quantity */
    productDetailsPage.quantityField().clear().type(productQuantity);

    /** Adding the product to cart shooping and validating that it's correctly added */
    productDetailsPage.addToCartButton().click();
    productDetailsPage.proceedToViewCart();
    cy.wait('@viewCart'); 
    cartPage.getProductQuantity().then((currentQuantity) => {
      expect(currentQuantity).to.equal(productQuantity);
    });

    /** Proceeding to checkout and create/register user information for the first time */    
    cartPage.proceedToCheckout('no-logged');
    cy.intercept('GET', URLS.login).as('login');
    cartPage.selectRegisterLogin();
    cy.wait('@login');
    cy.intercept('POST', URLS.signUp).as('signUp');
    loginPage.newUserSignUp(username, email);
    cy.wait('@signUp');
    signUpPage.enterAccountInformation(password);
    signUpPage.enterAddressInformation();
    cy.intercept(URLS.accountCreated).as('accountCreated');
    signUpPage.createAccountButton().click();
    cy.wait('@accountCreated');
    signUpPage.successMessage().contains('Account Created!');

    /** Proceeding to checkout and complete the payment */
    homePage.cart().click();
    cy.wait('@viewCart');
    cy.intercept(URLS.checkout).as('checkout');
    cartPage.proceedToCheckout('logged');
    cy.wait('@checkout');
    cy.intercept(URLS.payment).as('payment');
    checkOutPage.placeOrderButton().click();
    cy.wait('@payment');
    paymentPage.enterCreditCardInfo();
    cy.intercept(URLS.paymentDone).as('paymentDone');
    paymentPage.payConfirmOrderButton().click();
    cy.wait('@paymentDone');
    paymentPage.orderConfirmationMsg().contains('Order Placed!');
    paymentPage.continueButton().click();
    cy.wait('@baseUrl');

    /** logging out */
    homePage.logout().click();
    cy.wait('@login');

    /** logging in with the previously created user */
    loginPage.login(email, password);
    homePage.navigationBar().contains(' Logged in as '+username);

    /** Submitting a "contact us" request */
    cy.intercept(URLS.contactUs).as('contactUs');
    homePage.contactUs().click();
    cy.wait('@contactUs');
    contactUsPage.enterContactInfo(username,email);
    contactUsPage.submitButton().click();
    contactUsPage.successMessage().contains('Success! Your details have been submitted successfully.');
  });

  after(() => {
    /** Logging out */
    homePage.navigationBar().should('be.visible');
    homePage.logout().click();
    cy.wait('@login');
  })

});
