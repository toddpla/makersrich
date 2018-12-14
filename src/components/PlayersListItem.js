import React, { Component } from 'react';

class PlayersListItem extends Component {

  render() {
    return (
      <div>
        {this.props.displayName}
        <img style={{height: "10px"}}src={`images/${this.props.state}.png`} />
      </div>
    );
  }

}

export default PlayersListItem;
