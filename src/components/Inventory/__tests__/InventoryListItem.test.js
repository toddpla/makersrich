import React from 'react';
import { shallow } from 'enzyme'
import InventoryListItem from '../InventoryListItem'
import player from '../../../test/fixtures/playerWithInventory'

let wrapper, item, handleMessage

beforeEach(function() {
  handleMessage = jest.fn();
  item = player.inventory.bean[0]
  wrapper = shallow(
    <InventoryListItem item={item} handleMessage={handleMessage}/>
  )
});

test('it renders InventoryListItem', () => {
  expect(wrapper).toMatchSnapshot()
})

test('#changeMessage changes message in inventory with item messsage', () => {
  item = player.inventory.bean[0]
  wrapper = shallow(
    <InventoryListItem item={item} handleMessage={handleMessage}/>
  )
  wrapper.find('.inventory-list-item').simulate('click')
  expect(handleMessage).toHaveBeenLastCalledWith("This is a bean")
})

test('#changeMessage shows type of item when item has no message', () => {
  item = player.inventory.key[0]
  wrapper = shallow(
    <InventoryListItem item={item} handleMessage={handleMessage}/>
  )
  wrapper.find('.inventory-list-item').simulate('click')
  expect(handleMessage).toHaveBeenLastCalledWith("This is a key")
})
