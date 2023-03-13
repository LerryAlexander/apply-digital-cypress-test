import { faker } from '@faker-js/faker';

class PaymentPage {
    cardNameTextField() {
      return cy.get('[data-qa="name-on-card"]');
    }
  
    cardNumberTextField() {
      return cy.get('[data-qa="card-number"]');
    }

    cvcTextField() {
        return cy.get('[data-qa="cvc"]');
    }

    expiresTextField() {
        return cy.get('[data-qa="expiry-month"]');
    }

    yearTextField() {   
        return cy.get('[data-qa="expiry-year"]');
    }

    payConfirmOrderButton() {
        return cy.get('[data-qa="pay-button"]');
    }

    orderConfirmationMsg() {
        return cy.get('[data-qa="order-placed"]');
    }

    continueButton() {
        return cy.get('[data-qa="continue-button"]');
    }

    enterCreditCardInfo() {
        this.cardNameTextField().type(faker.finance.creditCardIssuer());
        this.cardNumberTextField().type(faker.finance.creditCardNumber());
        this.cvcTextField().type(faker.finance.creditCardCVV());
        this.expiresTextField().type(faker.random.numeric(2));
        this.yearTextField().type(faker.random.numeric(4));
    }
  
  }
  
  export default PaymentPage;