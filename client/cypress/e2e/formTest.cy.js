describe('Submit message form', () => {
  it('records the message', () => {
    cy.visit('http://localhost:3000/Dashboard')
    cy.get('[id="alert-location"]').type('Ring Road')
    cy.get('[id="alert-message"]').type('There is a wild goose on the loose')
    cy.contains('Submit').click()
  })
})