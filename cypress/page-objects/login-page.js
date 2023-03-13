class LoginPage {
    
    loginEmailField() {
      return cy.get('[data-qa="login-email"]');
    }

    loginPasswordField() {
        return cy.get('[data-qa="login-password"]');
      }

    loginButton() {
        return cy.get('[data-qa="login-button"]');
    }

    signupNameField() {
        return cy.get('[data-qa="signup-name"]');
    }

    signupEmailField() {
        return cy.get('[data-qa="signup-email"]');
    }

    signupButton() {
        return cy.get('[data-qa="signup-button"]');
    }

    newUserSignUp(name, emailAddress){
        this.signupNameField().type(name);
        this.signupEmailField(emailAddress).type(emailAddress);
        this.signupButton().click();
    }

    login(emailAddress, password){
        this.loginEmailField().clear().type(emailAddress);
        this.loginPasswordField().clear().type(password);
        this.loginButton().click();
    }
  
  }
  
  export default LoginPage;