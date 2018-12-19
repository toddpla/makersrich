import React from 'react'
import { LoginPage } from '../LoginPage'
import renderer from 'react-test-renderer';
import { Header } from '../Header'
import { shallow } from 'enzyme'

let handleGithubLogin = jest.fn()
let handleGoogleLogin = jest.fn()

test('renders correctly', () => {
  const loginPage = renderer.create(<LoginPage />).toJSON();
  expect(loginPage).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  const wrapper = shallow(<LoginPage />);
  console.log(wrapper.find('button'));
  wrapper.find('#google-login').simulate('click');
  expect(handleGoogleLogin).toHaveBeenCalled();
});
