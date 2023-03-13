class HomePage {

    navigationBar() {
        return cy.get('[class="nav navbar-nav"]');
      }

    contactUs() {
        return cy.get('[href="/contact_us"]');
    }

    logout() {
        return cy.get('a[href="/logout"]');
    }

    cart() {
        return cy.get('a[href="/view_cart"]');
    }

    selectRandomProduct() {
        return cy.get('div.choose')
        .should('have.length.greaterThan', 0)
        .then((divChooseList) => {
            const numProducts = divChooseList.length;
            const randomIndex = Cypress._.random(0, numProducts - 1);
            return cy.get('[class="productinfo text-center"]').find('p').eq(randomIndex).invoke('text')
                .then((text) => {
                    const selectedProduct = text.trim();
                    return cy.get('div.choose').eq(randomIndex).click().then(() => selectedProduct);
                })
                .then((selectedProduct) => {
                    return selectedProduct;
                });
        });
    }
  
  }
  
  export default HomePage;