import React, { Component } from 'react';
import database from '../../firebase/firebase'
import PlayersList from './PlayersList'


class Leaderboard extends Component {

  state = {
    players: []
  }

  componentWillMount() {
    database.ref('players')
      .orderByChild("level")
      .on('value', (snapshot) => {
        let players = [];
        snapshot.forEach(childSnapshot => {
          players.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        this.setState({
          players: players.reverse()
        })
      })
  }

  render() {
    return (
      <div>
        <h3>Leaderboard for All Players</h3>
        <PlayersList players={this.state.players} />
      </div>
    );
  }
}

export default Leaderboard;
