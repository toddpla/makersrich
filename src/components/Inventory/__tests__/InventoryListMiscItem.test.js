import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InventoryListMiscItem from '../InventoryListMiscItem'
import { shallow } from 'enzyme'

const item = {
  type: 'miscellaneous',
  properties: {
    type: 'cheese',
    message: 'This is tasty'
  }
}

let handleMessage = jest.fn()

test('it renders a div with class matching the type of the item', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<InventoryListMiscItem item={item}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children.props.className).toEqual('miscellaneous-item cheese');
})

test('#changeMessage changes message in inventory with item messsage', () => {
  let wrapper = shallow(
    <InventoryListMiscItem item={item} handleMessage={handleMessage}/>
  )
  wrapper.find('.inventory-list-item').simulate('click')
  expect(handleMessage).toHaveBeenLastCalledWith("This is tasty")
})

test('matches last snapshot', () => {
  let wrapper = shallow(
    <InventoryListMiscItem item={item} handleMessage={handleMessage}/>
  )
  expect(wrapper).toMatchSnapshot()
})
