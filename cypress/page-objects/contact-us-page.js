import { faker } from '@faker-js/faker';
class ContactUsPage {
    nameField() {
      return cy.get('[data-qa="name"]');
    }
  
    emailField() {
        return cy.get('[data-qa="email"]');
    }

    subjectField() {
        return cy.get('[data-qa="subject"]');
    }

    messageField() {
        return cy.get('[data-qa="message"]');
    }

    submitButton() {
        return cy.get('[data-qa="submit-button"]');
    }

    successMessage() {
        return cy.get('#contact-page');
    }

    enterContactInfo(name, email) {
        this.nameField().type(name);
        this.emailField().type(email);
        this.subjectField().type(faker.random.words());
        this.messageField().type(faker.random.words(60));
    }
  
  }
  
  export default ContactUsPage;