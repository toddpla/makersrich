import React, { Component } from 'react';
import database from '../firebase/firebase'
import PlayersList from './PlayersList'


class LevelPlayers extends Component {

  state = {
    players: []
  }

  componentWillMount() {
    database.ref('players')
      .orderByChild("level")
      .equalTo(this.props.level)
      .on('value', (snapshot) => {
        let players = [];
        snapshot.forEach(childSnapshot => {
          players.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          this.setState({players})
        })
      })
  }

  render() {
    return (
      <div>
        <PlayersList players={this.state.players} />
      </div>
    );
  }
}

export default LevelPlayers;
