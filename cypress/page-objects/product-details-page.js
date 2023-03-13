class ProductDetailsPage {
   
    quantityField() {
        return cy.get('#quantity');
    }

    addToCartButton() {
        return cy.get('button[class="btn btn-default cart"]');
    }

    proceedToViewCart() {
        cy.get('[class="modal-content"')
            .should('be.visible')
            .contains('Your product has been added to cart.')
        cy.get('[class="modal-body"')    
            .find('a')
            .contains("View Cart")
            .click();
    }

    getProductName() {
        return cy.get('[class="product-information"]').find('h2').invoke('text')
            .then((text) => {
                const productName = text.trim();
                return productName;
            });
    }
  
  }
  
  export default ProductDetailsPage;