import React from 'react'
import Message from '../Message'
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';


test('renders correctly', () => {
  const wrapper = renderer.create(<Message message={'message'} />)
  expect(wrapper).toMatchSnapshot()
});

test('renders with a message prop', () => {

  const renderer = new ShallowRenderer()
  renderer.render(<Message message={'message'} />)
  const result = renderer.getRenderOutput()
  console.log(result.props);
  expect(result.props.children).toEqual("message")

})
