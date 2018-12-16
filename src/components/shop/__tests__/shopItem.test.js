import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopItem from '../ShopItem'

test('it displays all info when item selected', () => {
  const renderer = new ShallowRenderer()

  const item = {
    type: 'miscellaneous',
    properties: {
      message: 'Message!',
      price: 10,
      name: 'Cheese',
      type: 'cheese'
    }
  }

  renderer.render(<ShopItem item={item}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children.props.className).toEqual('shop-item cheese')

})
