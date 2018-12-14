import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InventoryMessage from '../InventoryMessage'

test('it displays a message if the item contains a message', () => {
  const renderer = new ShallowRenderer()
  const message = 'This is a message'

  renderer.render(<InventoryMessage message={message}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[0].props.children).toEqual('Information')
  expect(result.props.children[1].props.children).toEqual(message)
})
