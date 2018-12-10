import React, { Component } from 'react';
import Player from './Player'
import { connect } from 'react-redux'
import { startUpdatePlayer } from '../actions/players'

class GamePage extends Component {

  handleMovement = (updates) => {
    this.props.startUpdatePlayer(updates)
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
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
