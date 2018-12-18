import React from 'react';
import { Player } from '../Player'
import { shallow } from 'enzyme'
import { SPRITE_SIZE } from '../../constants'

let wrapper, player, handleMovement, handlePopupInstructions

beforeEach(function() {
  handleMovement = jest.fn()
  handlePopupInstructions = jest.fn()
  player = {
    top: 336,
    left: 400
  }
  wrapper = shallow(
    <Player
      player={player}
      handleMovement={handleMovement}
      handlePopupInstructions={handlePopupInstructions}
    />
  )
});

describe('Player', function() {
  let instance

  beforeEach(function() {
    instance = wrapper.instance()
  });

  it('renders', function() {
    expect(wrapper).toMatchSnapshot();
  });

  describe('movement', function() {


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

    it('responds to right', function() {
      const rightEvent = {
        keyCode: 39,
      }
      instance.handleKeyDown(rightEvent)
      expect(handleMovement).toHaveBeenLastCalledWith({
        left: player.left + SPRITE_SIZE,
        top: player.top
      })
    });

    it('responds to up', function() {
      const upEvent = {
        keyCode: 38,
      }
      instance.handleKeyDown(upEvent)
      expect(handleMovement).toHaveBeenLastCalledWith({
        left: player.left,
        top: player.top - SPRITE_SIZE
      })
    });

    it('responds to down', function() {
      const downEvent = {
        keyCode: 40,
      }
      instance.handleKeyDown(downEvent)
      expect(handleMovement).toHaveBeenLastCalledWith({
        left: player.left,
        top: player.top + SPRITE_SIZE
      })
    });
  });
  describe('Instructions', function() {
    it('opens when x is pressed', function() {
      const instructionsEvent = {
        keyCode: 88
      }
      instance.handleKeyDown(instructionsEvent)
      expect(handlePopupInstructions).toHaveBeenCalled()
    });
  });
});
