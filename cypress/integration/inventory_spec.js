describe('inventory', () => {

  beforeEach(() => {
    cy.visit('/game')
  })

  it('opens inventory popup', () => {
    cy.get('#player').trigger('keydown', {
      keyCode: 73
    })
    cy.get('#inventory-item-message')
    cy.get('#inventory-list-box')
    cy.get('#inventory-box')
  })

  it('has a bean into the inventory', () => {
    for(var i = 0; i<14;i++){
      cy.get('#player').trigger('keydown', {
        keyCode: 39
      })
    }
    for(var i = 0; i<19;i++){
      cy.get('#player').trigger('keydown', {
        keyCode: 40
      })
    }
      cy.get('#player').trigger('keydown', {
        keyCode: 39
      })
      cy.get('#player').trigger('keydown', {
        keyCode: 69
      })
      cy.get('#player').trigger('keydown', {
        keyCode: 73
      })
      cy.get('.bean').click()
      cy.contains('#inventory-item-message', "Javascript was initially developed under the working title 'Mocha'")

  })
})
