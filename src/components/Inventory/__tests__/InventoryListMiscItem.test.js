import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InventoryListMiscItem from '../InventoryListMiscItem'


test('it renders a div with class matching the type of the item', () => {
  const renderer = new ShallowRenderer()
  const item = {
    type: 'miscellaneous',
    properties: {
      type: 'cheese'
    }
  }

  renderer.render(<InventoryListMiscItem item={item}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children.props.className).toEqual('miscellaneous-item cheese');
})
