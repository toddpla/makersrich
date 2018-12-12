import React, { Component } from 'react';
import { SPRITE_SIZE } from '../constants'
import { connect } from 'react-redux'
import mapJson from '../POWLevel1.json'
import { collectItem } from '../actions/map'

class Player extends Component {
  handleKeyDown = (e) => {
    switch(e.keyCode) {
      // left key
      case 37:
        return this.props.handleMovement(this.props.player, { left: this.props.player.left - SPRITE_SIZE, top: this.props.player.top })
      // up key
      case 38:
        return this.props.handleMovement(this.props.player, { top: this.props.player.top - SPRITE_SIZE, left: this.props.player.left  })
      // right key
      case 39:
        return this.props.handleMovement(this.props.player, { left: this.props.player.left + SPRITE_SIZE, top: this.props.player.top  })
      // down key
      case 40:
        return this.props.handleMovement(this.props.player, { top: this.props.player.top + SPRITE_SIZE, left: this.props.player.left  })
      case 69:
        this.attemptDig(this.props.player.left, this.props.player.top)
      default:
        console.log(e.keyCode);
    }
  }

  attemptDig = (x, y) => {
    // check if diggable and find collectable
    const item = this.props.map.collectables.filter((object) => object.x === x && object.y === y)[0]
    if (item !== undefined) {
      console.log(item.name)
      this.props.collectItem(item)
    }
    // dig
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      this.handleKeyDown(e)
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

const mapStateToProps = (state) => ({
  map: state.map
})

const mapDispatchToProps = (dispatch) => ({
  collectItem: (item) => dispatch(collectItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);
