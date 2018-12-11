import React, { Component } from 'react';
import Player from './Player'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { updatePlayer } from '../actions/players'
import styled from 'styled-components'
import { MAX_HEIGHT, MAX_WIDTH } from '../constants'

const AppWrapper = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: #1c1117;
`;

class GamePage extends Component {

  handleMovement = (player, updates) => {
    if (!this.checkBoundaries(updates)) {
      this.props.updatePlayer(player, updates)
      this.forceUpdate()
    }
  }

  checkBoundaries = (updates) => {
    if (updates === undefined) { return }
    return (updates.left < 0 || updates.top < 0 || updates.left > MAX_WIDTH
            || updates.top > MAX_HEIGHT)
  }

  render() {
    return (
          <div>
            {this.props.players.map((player, i) => <Player key={i} player={player} handleMovement={this.handleMovement} /> )}
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.players
})

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (player, direction) => dispatch(updatePlayer(player, direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
