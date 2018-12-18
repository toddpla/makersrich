import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopItem from '../ShopItem'
import { shallow } from 'enzyme'

test('it displays all info when item selected', () => {
  const renderer = new ShallowRenderer()

  const item = {
    type: 'miscellaneous',
    properties: [{
      message: 'Message!',
      price: 10,
      name: 'Cheese',
      type: 'cheese'
    }]
  }

  renderer.render(<ShopItem item={item}/>)
  const result = renderer.getRenderOutput()
  expect(result.props.children.props.className).toEqual('shop-item cheese')

})

test('#changeSelected changes item selected', () => {

  let handleSelect = jest.fn()

  const item = {
    type: 'miscellaneous',
    properties: [{
      message: 'Message!',
      price: 10,
      name: 'Cheese',
      type: 'cheese'
    }]
  }

  let wrapper = shallow(
    <ShopItem item={item} handleSelect={handleSelect}/>
  )
  wrapper.find('.shop-item').simulate('click')
  expect(handleSelect).toHaveBeenLastCalledWith(item)
})
