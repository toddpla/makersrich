import React, { Component } from 'react';
import { connect } from 'react-redux'
import database from '../../firebase/firebase'
import PlayersList from './PlayersList'


export class Leaderboard extends Component {

  render() {
    return (
      <div>
        <h3>Leaderboard for All Players</h3>
        <PlayersList players={this.props.opponents} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  opponents: state.opponents
})

export default connect(mapStateToProps)(Leaderboard);
