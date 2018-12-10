import React, { Component } from 'react';

class Player extends Component {
  handleKeyDown = (keyCode) => {
    switch(keyCode) {
      // left key
      case 37:
        return { left: this.props.player.left - 16 }
      // up key
      case 38:
        return { top: this.props.player.top - 16 }
      // right key
      case 39:
        return { left: this.props.player.left + 16 }
      // down key
      case 40:
        return { top: this.props.player.top + 16 }
      default:
        console.log(keyCode);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      this.props.handleMovement(this.handleKeyDown(e.keyCode))
    })
  }

  render() {
    return (
      <div id={this.props.player.name}
        style={{
          position: 'absolute',
          width: '16px',
          top: this.props.player.top,
          left: this.props.player.left,
          height: '16px',
          backgroundColor: 'red'
        }}
      >
      {this.props.player.displayName.split(' ')[0]}
      </div>
    );
  }
}


export default Player;
