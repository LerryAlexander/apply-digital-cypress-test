class cartPage {
    commentTextBox() {
      return cy.get('[name="message"]');
    }
  
    placeOrderButton() {
      return cy.get('a[href="/payment" and class="btn btn-default check_out"]');
    }

    productRow() {
        return cy.get('[id^=product-]').first();
    }

    getProductQuantity() {
        return this.productRow().find('[class="cart_quantity"]').children('button').invoke("text")
            .then(text => text.trim());
    }

    getProductDescription() {
        return this.productRow().find('[class="cart_description"]').children('p').invoke("text");
    }

    proceedToCheckout(statusLogin){
        cy.get('a[class="btn btn-default check_out"]').should('be.visible').click();
        if(statusLogin=='no-logged'){
            cy.get('[class="modal-content"]')
                .should('be.visible')
                .contains('Checkout')
        }          
    }

    selectRegisterLogin(){
        cy.get('[class="text-center"]')
            .find('a')
            .contains("Register / Login")
            .click();
    }
  
  }
  
  export default cartPage;