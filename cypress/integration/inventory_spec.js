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
    cy.get('#player').trigger('keydown', {
      keyCode: 73
    })
  })
})
