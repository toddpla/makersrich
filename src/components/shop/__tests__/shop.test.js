import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {Shop} from '../Shop'
import ShopList from '../ShopList'
import ShopMessage from '../ShopMessage'

test('it renders with an ShopList and ShopMessage', () => {
  const player = {
    inventory: {
      ruby: [],
      bean: [],
      key: [],
      miscellaneous: []
    }
  }

  const shop = {
    inventory: [
      {type: 'miscellaneous',
      properties: {
        price: 10,
        name: 'item'
      }}
    ]
  }

  const renderer = new ShallowRenderer()
  renderer.render(<Shop player={player} shop={shop}/>)
  const result = renderer.getRenderOutput()
  console.log(result);
  expect(result.props.children[0].props.children).toEqual("Welcome to Muxworthy's General Store!")
  expect(result.props.children[1].type).toEqual(ShopList)
  expect(result.props.children[2].type).toEqual(ShopMessage)
})
