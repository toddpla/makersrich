describe('player movement', () => {

  beforeEach(() => {
    cy.visit('/game')
  })

  it('can move to the right', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 39
    })
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '16px')
    })
  })
  it('can move to the left', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 39
    })
    cy.get('#player').trigger('keydown', {
      keyCode: 37
    })
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '0px')
    })
  })
  it('can move to the down', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 40
    })
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '16px')
      expect($el).to.have.css('left', '0px')
    })
  })
  it('can move to the up', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 40
    })
    cy.get('#player').trigger('keydown', {
      keyCode: 38
    })
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '0px')
    })
  })
  it('cannot move up due to boundaries', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 38
    })
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '0px')
    })
  })
  it('cannot move left due to boundaries', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 37
    })
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '0px')
    })
  })
  it('cannot move right due to boundaries', () => {
    for (var i = 0; i < 50; i++) {
      cy.get('#player').trigger('keydown', {
        keyCode: 39
      })
    }
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '0px')
      expect($el).to.have.css('left', '784px')
    })
  })
  it('cannot move down due to boundaries', () => {
    for (var i = 0; i < 60; i++) {
      cy.get('#player').trigger('keydown', {
        keyCode: 39
      })
    }
    for (var i = 0; i < 50; i++) {
      cy.get('#player').trigger('keydown', {
        keyCode: 40
      })
    }
    cy.get('#player').should(($el) => {
      expect($el).to.have.css('top', '624px')
      expect($el).to.have.css('left', '784px')
    })
  })
});
