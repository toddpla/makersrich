import React, { Component } from 'react';
import database from '../firebase/firebase'
import PlayersListItem from './PlayersListItem'


class PlayersList extends Component {

  state = {
    players: []
  }

  componentWillMount() {
    database.ref('players')
      .orderByChild("level")
      .equalTo(1)
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
        {this.state.players.map((player, i) => <PlayersListItem {...player}/>)}
      </div>
    );
  }
}

export default PlayersList;
