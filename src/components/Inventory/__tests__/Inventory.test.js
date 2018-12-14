import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {Inventory} from '../Inventory'
import InventoryList from '../InventoryList'
import InventoryMessage from '../InventoryMessage'

test('it renders with an InventoryList and InventoryMessage', () => {
  const player = {
    inventory: {
      ruby: [],
      bean: [],
      key: [],
    }
  }
  const renderer = new ShallowRenderer()
  renderer.render(<Inventory player={player}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[0].type).toEqual(InventoryList)
  expect(result.props.children[1].type).toEqual(InventoryMessage)
})
