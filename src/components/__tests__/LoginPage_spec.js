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
