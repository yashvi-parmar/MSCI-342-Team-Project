describe('Finds Directions', () => {
  it('finds the directions', () => {
    cy.visit('http://localhost:3000/Map')
    cy.get('[id="destination"]').type('200 University Ave W, Waterloo, ON N2L 3G1, Canada')
    cy.contains('Go').click()
  })
})

describe('Signs In', () => {
  it('Signs the user in', () => {
    cy.visit('http://localhost:3000/SignIn')
    cy.get('[id="username"]').type('bobisgreat')
    cy.get('[id="password"]').type('bobisawesome!')
    cy.contains("LOGIN").click()
  })
})