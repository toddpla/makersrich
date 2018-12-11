import { addPlayer, updatePlayer } from '../players'

describe('Player Action', function() {
  describe('#addPlayer', function() {
    it('dispatches payload with the name and init position of a new player', () => {
      expect(addPlayer( { name: 'player' } )).toEqual({
        type: 'ADD_PLAYER',
        player: {
          name: 'player',
          left: 0,
          top: 0
        }
      });
    });
  });

  describe('#updatePlayer', function() {
    it('dispatches payload with updates', function() {
      expect((updatePlayer({
        name: 'player',
        top: 0,
        left: 0,
      }, {top: 16}))).toEqual({ type: 'UPDATE_PLAYER',
                                player: { name: 'player', top: 0, left: 0 },
                                updates: { top: 16 } });


    });
  });
});
