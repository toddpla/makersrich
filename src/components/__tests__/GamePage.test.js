import React from 'react'
import renderer from 'react-test-renderer';

import { GamePage, AppWrapper } from '../GamePage'
import { Player } from '../Player'

test('gamepage renders correctly', () => {

  const props = {
    players: ['player'],
    opponents: []
  }

  const gamePage = renderer.create(<GamePage {...props}/>).toJSON();
  expect(gamePage).toMatchSnapshot();
});


test('AppWrapper renders correctly', () => {
  const appWrapper = renderer.create(<AppWrapper/>).toJSON();
  expect(appWrapper).toMatchSnapshot();
});
