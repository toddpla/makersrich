describe('player movement', () => {
  it('can move to the right', () => {
    cy.visit('/game')
      .trigger('keydown', {keyCode: 38})

    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '16px')
    })
  })
});
