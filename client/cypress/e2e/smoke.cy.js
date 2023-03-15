<<<<<<< HEAD
describe('Smoke Test', () => {
  it('can view the home page', () => {
    cy.visit('/');
    cy.contains('Welcome!');
  });
});
=======

describe('Smoke Test', () => {
  it('can view the home page', () => {
    cy.visit('/');
    cy.contains('Welcome');
  });
});

describe('Node-React app', () => {
  it('should load the homepage successfully', () => {
    cy.visit('http://localhost:3000') 
  })

})

>>>>>>> 4e3bb1a432a42209c50881791fcf5d83555804cd
