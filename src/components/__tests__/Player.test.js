import React from 'react';
import { Player } from '../Player'
import { shallow } from 'enzyme'
import { SPRITE_SIZE } from '../../constants'

let wrapper, player, handleMovement

beforeEach(function() {
  handleMovement = jest.fn()
  player = {
    top: 336,
    left: 400
  }
  wrapper = shallow(
    <Player
      player={player}
      handleMovement={handleMovement}
    />
  )
});

describe('Player', function() {
  it('renders', function() {
    expect(wrapper).toMatchSnapshot();
  });

  describe('movement', function() {
    let instance

    beforeEach(function() {
      instance = wrapper.instance()
    });

    it('responds to left', function() {
      const leftEvent = {
        keyCode: 37,
      }
      instance.handleKeyDown(leftEvent)
      expect(handleMovement).toHaveBeenLastCalledWith({
        left: player.left - SPRITE_SIZE,
        top: player.top
      })
    });
  });
});
