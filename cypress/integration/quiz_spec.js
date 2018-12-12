describe('quiz', () => {
  it('player can click an answer', () => {
    cy.visit('/quiz')
    cy.get('#1').click()
    cy.get('#2').click()
    cy.get('#3').click()
    cy.get('#0').click()
    cy.get('#0').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/game')
    })
  })
})
