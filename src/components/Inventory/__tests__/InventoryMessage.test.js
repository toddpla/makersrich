import React from 'react';
import { shallow } from 'enzyme'
import InventoryMessage from '../InventoryMessage'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <InventoryMessage selected={'item'}/>
  )
});

test('it renders InventoryMessage', () => {
  expect(wrapper).toMatchSnapshot()
})
