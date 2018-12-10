import React, { Component } from 'react';

class Player extends Component {

  render() {
    return (
      <div id={this.props.player.name}>
        {this.props.player.name}
      </div>
    );
  }

}



export default Player;
