import React, { Component } from 'react';
import { SPRITE_SIZE } from '../constants'

class Player extends Component {
  handleKeyDown = (keyCode) => {
    switch(keyCode) {
      // left key
      case 37:
        return { left: this.props.player.left - SPRITE_SIZE }
      // up key
      case 38:
        return { top: this.props.player.top - SPRITE_SIZE }
      // right key
      case 39:
        return { left: this.props.player.left + SPRITE_SIZE }
      // down key
      case 40:
        return { top: this.props.player.top + SPRITE_SIZE }
      default:
        console.log(keyCode);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      this.props.handleMovement(this.props.player, this.handleKeyDown(e.keyCode))
    })
  }

  render() {
    return (
      <div id={this.props.player.name}
        style={{
          position: 'absolute',
          width: '15px',
          top: this.props.player.top,
          left: this.props.player.left,
          height: '15px',
          backgroundColor: 'red'
        }}
      >
      </div>
    );
  }
}


export default Player;
