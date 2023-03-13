import { faker } from '@faker-js/faker';
class SignUpPage {
    
    genderRadioButton(){
        const gender = faker.name.sex();
        switch(gender){
            case 'male':
                return cy.get('#uniform-id_gender1');
                break;
            case 'female':
                return cy.get('#uniform-id_gender2');
                break;
            default: 
                return cy.get('#uniform-id_gender1');
                break;
        }
        
    }

    nameField(){
        return cy.get('[data-qa="name"]');
    }

    passwordField(){
        return cy.get('[data-qa="password"]');
    }

    firstNameField(){
        return cy.get('[data-qa="first_name"]');
    }

    lastNameField(){
        return cy.get('[data-qa="last_name"]');
    }

    addressField(){
        return cy.get('[data-qa="address"]');
    }

    selectCountry(){
        cy.get('#country').then(($select) => {
            const optionsCount = $select.find('option').length
            const randomIndex = Math.floor(Math.random() * optionsCount)
            cy.wrap($select).select($select.find('option').eq(randomIndex).val())
          })
    }

    stateField(){
        return cy.get('[data-qa="state"]');
    }

    cityField(){
        return cy.get('[data-qa="city"]');
    }

    zipCodeField(){
        return cy.get('[data-qa="zipcode"]');
    }

    mobileNumberField(){
        return cy.get('[data-qa="mobile_number"]');
    }

    createAccountButton(){
        return cy.get('[data-qa="create-account"]');
    }

    successMessage(){
        return cy.get('[class=container]');
    }

    enterAccountInformation(password){
        this.genderRadioButton().click();
        this.passwordField().type(password);
    }

    enterAddressInformation(){
        this.firstNameField().type(faker.name.firstName());
        this.lastNameField().type(faker.name.lastName());
        this.addressField().type(faker.address.streetAddress());
        this.selectCountry();
        this.stateField().type(faker.address.state());
        this.cityField().type(faker.address.city());
        this.zipCodeField().type(faker.address.zipCode());
        this.mobileNumberField().type(faker.phone.number());
    }
  
  }
  
  export default SignUpPage;