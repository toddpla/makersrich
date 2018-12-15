import React, { Component } from 'react';

class PlayersListItem extends Component {

  render() {
    return (
      <tr>

        <td><img style={{height: "10px"}}src={`images/${this.props.state}.png`}/></td>
        <td>{this.props.displayName}</td>
        <td>{this.props.cash}</td>
        <td>{this.props.inventory && this.props.inventory.ruby && this.props.inventory.ruby.length}</td>
        <td>{this.props.inventory && this.props.inventory.bean && this.props.inventory.bean.length}</td>
      </tr>
    );
  }

}

export default PlayersListItem;
