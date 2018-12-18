import React, { Component } from 'react';

export class PlayersListItem extends Component {

  render() {
    return (
      <tr class="leaderboard-table-row">

        <td class="leaderboard-table-cell" ><img style={{height: "10px"}}src={`images/${this.props.state}.png`} alt="status"/></td>
        <td class="leaderboard-table-cell table-displayName" >{this.props.displayName}</td>
        <td class="leaderboard-table-cell" >{this.props.cash}</td>
        <td class="leaderboard-table-cell" >{this.props.inventory && this.props.inventory.ruby && Object.keys(this.props.inventory.ruby).length}</td>
        <td class="leaderboard-table-cell" >{this.props.inventory && this.props.inventory.bean && Object.keys(this.props.inventory.bean).length}</td>
      </tr>
    );
  }

}

export default PlayersListItem;
