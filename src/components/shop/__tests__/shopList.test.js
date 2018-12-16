import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopList from '../ShopList'

test('it displays all info when item selected', () => {
  const renderer = new ShallowRenderer()

  const inventory = [
    {
      type: 'item'
    }
  ]

  const handleSelect = 'handleselect'

  renderer.render(<ShopList inventory={inventory} handleSelect={handleSelect}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[0].props.item.type).toEqual('item')
  expect(result.props.children[0].props.handleSelect).toEqual('handleselect')

})
