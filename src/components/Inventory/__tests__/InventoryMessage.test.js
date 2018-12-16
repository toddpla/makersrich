import React from 'react';
import { shallow } from 'enzyme'
import InventoryMessage from '../InventoryMessage'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <InventoryMessage message={'message'}/>
  )
});

test('it renders InventoryMessage', () => {
  expect(wrapper).toMatchSnapshot()
})
