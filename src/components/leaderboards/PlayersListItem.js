import React, { Component } from 'react';

export class PlayersListItem extends Component {

  render() {
    return (
      <tr className="leaderboard-table-row">
        <td className="leaderboard-table-cell" ><img style={{height: "10px"}}src={`images/${this.props.state}.png`} alt="status"/></td>
        <td className="leaderboard-table-cell table-displayName" >{this.props.displayName}</td>
        <td className="leaderboard-table-cell" >{this.props.cash}</td>
        <td className="leaderboard-table-cell" >{this.props.inventory && this.props.inventory.ruby && Object.keys(this.props.inventory.ruby).length}</td>
        <td className="leaderboard-table-cell" >{this.props.inventory && this.props.inventory.bean && Object.keys(this.props.inventory.bean).length}</td>
      </tr>
    );
  }

}

export default PlayersListItem;
