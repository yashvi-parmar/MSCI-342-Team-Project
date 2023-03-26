describe('Submit message form', () => {
  it('records the message', () => {
    cy.visit('http://localhost:3000/Alerts')
    cy.get('[id="destination"]').type('Ring Rd, Regina, SK, Canada')
    cy.get('[id="alertMessage"]').type('There is a wild goose on the loose')
    cy.contains('Submit').click()
  })
})