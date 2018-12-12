describe('passing a successful quiz', () => {
  it('should pass quiz and redirect to game with sucess', () => {
    cy.addPlayer()
    cy.visit('/quiz')
  })
})
