import React from 'react'
import renderer from 'react-test-renderer';

import {GamePage} from '../GamePage'


test('renders correctly', () => {

  const props = {
    players: ['player']
  }

  const gamePage = renderer.create(<GamePage {...props}/>).toJSON();
  expect(gamePage).toMatchSnapshot();
});
