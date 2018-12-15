import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InventoryList from '../InventoryList'
import InventoryListItem from '../InventoryListItem'


test('it renders InventoryListItems', () => {
  const renderer = new ShallowRenderer()
  const inventory = {
    ruby: ['ruby1'],
    bean: [],
    key: [],
    miscellaneous: []
  }

  renderer.render(<InventoryList inventory={inventory}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[0].type).toEqual('h1');
  expect(result.props.children[1][0].type).toEqual(InventoryListItem);
})
