import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopMessage from '../ShopMessage'

test('it displays all info when item selected and buy button when player has money', () => {
  const renderer = new ShallowRenderer()
  const selected = {
    type: 'miscellaneous',
    properties: [{
      message: 'Message!',
      price: 10,
      name: 'Cheese',
      type: 'cheese'
    }]
  }

  renderer.render(<ShopMessage item={selected} cash={20}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[0].props.children).toEqual('Cheese')
  expect(result.props.children[1].props.className).toEqual('shop-selected-item cheese')
  expect(result.props.children[2].props.id).toEqual('muxworthys-opinion')
  expect(result.props.children[3].props.children[1]).toEqual(10)
  expect(result.props.children[4].props.children).toEqual('BUY')

})

test('it displays all info when item selected and buy button when player has money', () => {
  const renderer = new ShallowRenderer()
  const selected = {
    type: 'miscellaneous',
    properties: [{
      message: 'Message!',
      price: 10,
      name: 'Cheese',
      type: 'cheese'
    }]
  }

  renderer.render(<ShopMessage item={selected} cash={0}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[4].props.children).toEqual("YOU GOT NO MONEY, BETTER GO DIGGIN'")

})

test('it displays a welcome message when item is not selected', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<ShopMessage item={undefined}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children.props.children).toEqual('Welcome to my shop! Take a look at my fineee as wares')

})
