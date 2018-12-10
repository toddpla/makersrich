describe('player movement', () => {
  it('can move to the right', () => {
    cy.addPlayer()
    cy.get('#Frankie').trigger('keydown', {keyCode: 38})
    cy.get('#Frankie').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '16px')
    })
  })
});
