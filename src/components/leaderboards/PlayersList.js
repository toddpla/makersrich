import React, { Component } from 'react';
import PlayersListItem from './PlayersListItem'

export class PlayersList extends Component {


  render() {
    return (
      <table id="leaderboard-table">
      <tbody>
        <tr className="leaderboard-table-headings">
          <th></th><th>Player</th><th>Cash</th><th>Rubies</th><th>Beans</th>
        </tr>
        {this.props.players.map((player, i) => <PlayersListItem {...player}/>)}
        </tbody>
      </table>
    );
  }
}

export default PlayersList;
