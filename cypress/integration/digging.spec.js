describe('inventory', () => {

  beforeEach(() => {
    cy.visit('/game')
  })

  it('player can dig', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 69
    })
    cy.get('.dug-up-tile')
  })
  it('player can find rubies/collectibles by digging', () => {
    for (var i = 0; i < 4; i++) {
      cy.get('#player').trigger('keydown', {
        keyCode: 40   // Move down three
      })
    }
    cy.get('#player').trigger('keydown', {
      keyCode: 69     // Then dig, there is a ruby here
    })
    cy.get('.modal-button').click() // close the modal popup

    cy.get('#player').trigger('keydown', {
      keyCode: 73    // Open inventory
    })
    cy.get('.ruby').click({multiple: true, force:true})
    cy.contains('.inventory-item-message', 'ruby')
  })
})
