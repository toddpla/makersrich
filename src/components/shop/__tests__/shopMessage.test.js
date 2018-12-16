import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopMessage from '../ShopMessage'

test('it displays all info when item selected', () => {
  const renderer = new ShallowRenderer()
  const selected = {
    type: 'miscellaneous',
    properties: {
      message: 'Message!',
      price: 10,
      name: 'Cheese',
      type: 'cheese'
    }
  }

  renderer.render(<ShopMessage item={selected}/>)
  const result = renderer.getRenderOutput()
  console.log(result.props)
  expect(result.props.children[0].props.children).toEqual('Cheese')
  expect(result.props.children[1].props.className).toEqual('shop-selected-item cheese')
  expect(result.props.children[2].props.children).toEqual('Message!')
  expect(result.props.children[3].props.children[1]).toEqual(10)
  expect(result.props.children[4].props.children).toEqual('BUY')

})

test('it displays a welcome message when item is not selected', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<ShopMessage item={undefined}/>)
  const result = renderer.getRenderOutput()
  console.log(result.props)
  expect(result.props.children.props.children).toEqual('Welcome to my shop! Take a look at my fineee as wares')

})
