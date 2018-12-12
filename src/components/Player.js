import React, { Component } from 'react';
import { SPRITE_SIZE } from '../constants'

import mapJson from '../POWLevel1.json'

class Player extends Component {
  handleKeyDown = (keyCode) => {
    switch(keyCode) {
      // left key
      case 37:
        return { left: this.props.player.left - SPRITE_SIZE, top: this.props.player.top }
      // up key
      case 38:
        return { top: this.props.player.top - SPRITE_SIZE, left: this.props.player.left  }
      // right key
      case 39:
        return { left: this.props.player.left + SPRITE_SIZE, top: this.props.player.top  }
      // down key
      case 40:
        return { top: this.props.player.top + SPRITE_SIZE, left: this.props.player.left  }
      case 69:
        this.attemptDig(this.props.player.left, this.props.player.top)
      default:
        console.log(keyCode);
    }
  }

  attemptDig = (x, y) => {
    // check if diggable and find collectable
    const item = mapJson.layers[0].objects.filter((object) => object.x === x && object.y === y)[0]
    if(item !== undefined){ console.log(item.name) }
    // dig
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      this.props.handleMovement(this.props.player, this.handleKeyDown(e.keyCode))
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
