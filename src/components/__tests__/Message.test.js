import React from 'react'
import InformationMessage from '../InformationMessage'
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';


test('renders correctly', () => {
  const wrapper = renderer.create(<InformationMessage message={'message'} />)
  expect(wrapper).toMatchSnapshot()
});

test('renders with a message prop', () => {

  const renderer = new ShallowRenderer()
  renderer.render(<InformationMessage message={'message'} />)
  const result = renderer.getRenderOutput()
  console.log(result.props);
  expect(result.props.children).toEqual("message")

})
