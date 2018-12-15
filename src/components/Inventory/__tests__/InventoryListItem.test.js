import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InventoryListItem from '../InventoryListItem'


test('it renders a div with class matching the type of the item', () => {
  const renderer = new ShallowRenderer()
  const item = {
    type: 'ruby'
  }

  renderer.render(<InventoryListItem item={item}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children.props.className).toEqual('ruby');
})
