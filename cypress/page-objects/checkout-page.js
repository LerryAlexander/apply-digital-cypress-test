class CheckOutPage {
    commentTextBox() {
      return cy.get('[name="message"]');
    }
  
    placeOrderButton() {
      return cy.get('a[href="/payment"');
    }
  
  }
  
  export default CheckOutPage;