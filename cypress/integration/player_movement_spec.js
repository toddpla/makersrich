describe('player movement', () => {

  beforeEach(() => {
    cy.addPlayer()
  })

  it('can move to the left', () => {
    cy.get('#Frankie').trigger('keydown', {keyCode: 37})
    cy.get('#Frankie').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '-16px')
    })
  })
  it('can move to the up', () => {
    cy.get('#Frankie').trigger('keydown', {keyCode: 38})
    cy.get('#Frankie').should(($el) => {
      expect($el).to.have.css('top', '-16px')
      expect($el).to.have.css('left', '0px')
    })
  })
  it('can move to the right', () => {
    cy.get('#Frankie').trigger('keydown', {keyCode: 39})
    cy.get('#Frankie').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '16px')
    })
  })
  it('can move to the down', () => {
    cy.get('#Frankie').trigger('keydown', {keyCode: 40})
    cy.get('#Frankie').should(($el) => {
      expect($el).to.have.css('top', '16px')
      expect($el).to.have.css('left', '0px')
    })
  })
});
