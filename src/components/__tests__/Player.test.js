import React from 'react';
import { Player } from '../Player'
import { shallow } from 'enzyme'

let wrapper, player

beforeEach(function() {
  player = {
    top: 0,
    left: 0
  }
  wrapper = shallow(
    <Player
      player={player}
    />
  )
});

describe('Player', function() {
  it('renders', function() {
    expect(wrapper).toMatchSnapshot();
  });
});
