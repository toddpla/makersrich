import React, { Component } from 'react';
import Player from './Player'
import { connect } from 'react-redux'

class GamePage extends Component {

  render() {
    return (
      <div>
        {this.props.players.map(player => <Player player={player} /> )}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  players: state.players
})

export default connect(mapStateToProps)(GamePage);
