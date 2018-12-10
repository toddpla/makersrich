import React, { Component } from 'react';
import Player from './Player'
import { connect } from 'react-redux'
import { updatePlayer } from '../actions/players'

class GamePage extends Component {

  handleMovement = (player, updates) => {
    this.props.updatePlayer(player, updates)
    this.forceUpdate()
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
