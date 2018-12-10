import React, { Component } from 'react';

class Player extends Component {
  handleKeyDown = (e) => {
    e.preventDefault()

    switch(e.keyCode) {
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
        console.log(e.keyCode);
    }

  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      this.props.handleMovement(this.props.player.name, this.handleKeyDown(e))
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
      </div>
    );
  }

}


export default Player;
