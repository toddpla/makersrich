import React, { Component } from 'react';
import database from '../firebase/firebase'
import PlayersListItem from './PlayersListItem'


class PlayersList extends Component {

  render() {
    return (
      <table>
        <tr>
          <th></th><th>Player</th><th>Cash</th><th>Rubies</th><th>Beans</th>
        </tr>
        {this.props.players.map((player, i) => <PlayersListItem {...player}/>)}
      </table>
    );
  }
}

export default PlayersList;
