Cypress.Commands.add('addPlayer', () => {
  cy.visit('/add-player')
  cy.get('#player-name').type('Frankie')
  cy.get('form').submit()
})
