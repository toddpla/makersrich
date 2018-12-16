import React from 'react';
import { shallow } from 'enzyme'
import { Inventory } from '../Inventory'
import player from '../../../test/fixtures/playerWithInventory'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <Inventory
      player={player}
    />
  )
});

test('it renders Inventory', () => {
  expect(wrapper).toMatchSnapshot()
})

test('#handleMessage changes message state', () => {
  const instance = wrapper.instance()
  expect(wrapper.state.message).toEqual(undefined)
  instance.handleMessage("message")
  expect(instance.state.message).toEqual('message')
})
