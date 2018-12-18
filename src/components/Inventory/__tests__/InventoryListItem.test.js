import React from 'react';
import { shallow } from 'enzyme'
import InventoryListItem from '../InventoryListItem'
import player from '../../../test/fixtures/playerWithInventory'

let wrapper, item, handleSelect

beforeEach(function() {
  handleSelect = jest.fn();
  item = player.inventory.bean[0]
  wrapper = shallow(
    <InventoryListItem item={item} handleSelect={handleSelect}/>
  )
});

test('it renders InventoryListItem', () => {
  expect(wrapper).toMatchSnapshot()
})

test('#changeSelect changes message in inventory with item messsage', () => {
  item = player.inventory.bean[0]
  wrapper = shallow(
    <InventoryListItem item={item} handleSelect={handleSelect}/>
  )
  wrapper.find('.inventory-list-item').simulate('click')
  expect(handleSelect).toHaveBeenLastCalledWith(item)
})

test('#changeSelect shows type of item when item has no message', () => {
  item = player.inventory.key[0]
  wrapper = shallow(
    <InventoryListItem item={item} handleSelect={handleSelect}/>
  )
  wrapper.find('.inventory-list-item').simulate('click')
  expect(handleSelect).toHaveBeenLastCalledWith(item)
})
