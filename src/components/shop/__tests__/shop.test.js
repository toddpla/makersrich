import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {Shop} from '../Shop'
import ShopList from '../ShopList'
import ShopMessage from '../ShopMessage'

import { mapDispatchToProps, mapStateToProps } from '../Shop'

import { shallow } from 'enzyme'

  let startAddInventoryItem = jest.fn()
  let startDebitPlayer = jest.fn()

  const player = {
    inventory: {
      ruby: [],
      bean: [],
      key: [],
      miscellaneous: []
    }
  }

  const item = {
    type: 'miscellaneous',
    properties: {
      price: 10,
      name: 'item'
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

test('it renders with an ShopList and ShopMessage', () => {

  const renderer = new ShallowRenderer()
  renderer.render(<Shop player={player} shop={shop}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children[0].props.children).toEqual("Welcome to Muxworthy's General Store!")
  expect(result.props.children[1].type).toEqual(ShopList)
  expect(result.props.children[2].type).toEqual(ShopMessage)
})

test('#handleSelect changes selected state', () => {

  let wrapper = shallow(
    <Shop
      player={player}
      shop={shop}
      startAddInventoryItem={startAddInventoryItem}
      startDebitPlayer={startDebitPlayer}
    />
  )

  const instance = wrapper.instance()
  expect(wrapper.state.selected).toEqual(undefined)
  instance.handleSelect(item)
  expect(instance.state.selected).toEqual(item)
})

test('#handlePurchase calls action to change player state', () => {

  let wrapper = shallow(
    <Shop
      player={player}
      shop={shop}
      startAddInventoryItem={startAddInventoryItem}
      startDebitPlayer={startDebitPlayer}
    />
  )

  const instance = wrapper.instance()
  instance.handleSelect(item)
  instance.handlePurchase()
  expect(startAddInventoryItem).toHaveBeenLastCalledWith('miscellaneous', item)
  expect(startDebitPlayer).toHaveBeenLastCalledWith(item.properties.price)
})

test('mapStateToProps', () => {

  let state = {
    auth: 'fake auth state',
    shop: 'fake shop state'
  }
  expect(mapStateToProps(state).player).toEqual('fake auth state')
  expect(mapStateToProps(state).shop).toEqual('fake shop state')
})

test('mapDispatchToProps', () => {

  const dispatch = jest.fn()
  const addInventoryItem = jest.fn()
  const startUpdatePlayer = jest.fn()

  expect(mapDispatchToProps(dispatch).startAddInventoryItem(0,0))
  expect(mapDispatchToProps(dispatch).startDebitPlayer(0))
  console.log(mapDispatchToProps(dispatch.mock.calls));

  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function))
  expect(dispatch.mock.calls[1][0]).toEqual(expect.any(Function))

})
