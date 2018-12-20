describe('inventory', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('#player').trigger('keydown', {
      keyCode: 73
    })
  })

  it('opens inventory popup', () => {
    cy.get('.inventory-item-message')
    cy.get('#inventory-list-box')
    cy.get('#inventory-box')
  })

  it('has beans', () => {
      cy.get('.bean').click({multiple:true, force:true})
      cy.contains('.inventory-item-message', "bean")

  })

  it('has rubies', () => {
      cy.get('.ruby').click({multiple:true, force:true})
      cy.contains('.inventory-item-message', "ruby")

  })
  it("has an apple", () => {
      cy.get('.apple.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Apple")

  })
  it("has a blue potion", () => {
      cy.get('.bluepotion.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Blue Potion")

  })
  it("has a red potion", () => {
      cy.get('.redpotion.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Red Potion")

  })
  it("has a green potion", () => {
      cy.get('.greenpotion.miscellaneous-item').click({force:true, multiple:true})
      cy.contains('.inventory-item-message', "Green Potion")

  })
  it("has a yellow potion", () => {
      cy.get('.yellowpotion.miscellaneous-item').click({force:true, multiple:true})
      cy.contains('.inventory-item-message', "Yellow Potion")

  })
  it("has a boomerang", () => {
      cy.get('.boomerang.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Boomerang")

  })
  it("has a blue ring", () => {
      cy.get('.bluering.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Blue Ring")

  })
  it("has a red ring", () => {
      cy.get('.redring.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Red Ring")

  })
  it("has butter", () => {
      cy.get('.butter.miscellaneous-item').click({multiple:true, force:true})
      cy.contains('.inventory-item-message', "Butter")

  })
  it("doesn't break everything when you click on a cookie", () => {
      cy.get('.cookie.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Cookie")

  })
  it("has a nice looking pick", () => {
      cy.get('.pengpick.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Pick")

  })
  it("has a lemon", () => {
      cy.get('.lemon.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Lemon")

  })
  it("has cherries", () => {
      cy.get('.cherry.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Cherry")

  })
  it("has eggs", () => {
      cy.get('.eggs.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Eggs")

  })
  it("has cheese", () => {
      cy.get('.cheese.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Cheese")

  })
  it("has grapes", () => {
      cy.get('.grape.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Grapes")

  })
  it("has mittens or gloves or whatever you prefer to call them", () => {
      cy.get('.gloves.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Gloves")

  })
  it("has jambon for the meat-eaters", () => {
      cy.get('.jambon.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Jambon")
  })
  it("has a juicy strawberry", () => {
      cy.get('.strawberry.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Strawberry")
  })
  it("allows you to wield a shield", () => {
      cy.get('.shield.miscellaneous-item').click({force:true})
      cy.contains('.inventory-item-message', "Shield")
  })
})
