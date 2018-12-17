import React, { Component } from 'react';
import { SPRITE_SIZE } from '../constants'
import PlayerImg from "../assets/player.png"
import { connect } from 'react-redux'

import { collectItem, digTile, unDigTile } from '../actions/map'

import { startAddInventoryItem, startUpdatePlayer } from '../actions/auth'
import { startSendNewsfeedMessage } from '../actions/newsfeed'


class Player extends Component {

  constructor() {
    super()
    this.state = {
      inPopUp: false
    }
  }

  handleKeyDown = (e) => {
    if (!this.state.inPopUp) {
      switch(e.keyCode) {
        // left key
        case 37:
          return this.props.handleMovement({ left: this.props.player.left - SPRITE_SIZE, top: this.props.player.top })
        // up key
        case 38:
          return this.props.handleMovement({ top: this.props.player.top - SPRITE_SIZE, left: this.props.player.left  })
        // right key
        case 39:
          return this.props.handleMovement({ left: this.props.player.left + SPRITE_SIZE, top: this.props.player.top  })
        // down key
        case 40:
          return this.props.handleMovement({ top: this.props.player.top + SPRITE_SIZE, left: this.props.player.left  })
        case 69:
          return this.attemptDig(this.props.player.left, this.props.player.top)
        case 73:
          this.setState({inPopUp: true})
          return this.props.handlePopupInventory()
        case 82:
          return this.props.handlePopupRPS()
        case 81:
          return this.props.checkSign(this.props.player.left, this.props.player.top)
        default:
          console.log(e.keyCode);
      }
    } else {
        return this.popUpHandleKeyDown(e)
    }
  }

  popUpHandleKeyDown(e) {
    switch(e.keyCode) {
      case 73:
      case 32:
        this.setState({inPopUp: false})
        return this.props.closeModal()
      default:
        console.log(e.keyCode);
    }
  }

  digDatDing = (x, y) => {
    var dug = document.createElement("div")
    dug.setAttribute('class', 'dug-up-tile')
    dug.setAttribute('id', x+y)
    dug.setAttribute('style', `left:${x}px; top:${y}px` )
    document.getElementsByClassName('tiled-map')[0].appendChild(dug)
    setTimeout(this.unDigDatDing, 5000, x, y)
  }

  unDigDatDing = (x, y) => {
    const tile = this.props.map.minable.filter((object) => object.x === x && object.y === y)[0]
    const element = document.getElementById(x+y)
    element.parentNode.removeChild(element)
    this.props.unDigTile(tile)
  }

  attemptDig = (x, y) => {
    const tile = this.props.map.minable.filter((object) => object.x === x && object.y === y)[0]
    if (tile.visible === false) {
      console.log('you can dig');
      this.props.digTile(tile)
      this.digDatDing(x, y)
    } else {
      console.log('no digging!');
    }

    const item = this.props.map.collectables.filter((object) => object.x === x && object.y === y)[0]
    this.checkItem(item)
  }

  checkItem(item) {
    if (item !== undefined) {
      this.props.collectItem(item)
      this.props.startAddInventoryItem(item.type, item)
      this.setState({inPopUp: true})
      this.props.startSendNewsfeedMessage(`${this.props.player.displayName} found a ${item.type}!`)
      this.props.handlePopupMessage(`You found a ${item.type}!`)
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      this.handleKeyDown(e)
    })
  }

  render() {
    return (
      <div id="player"
        style={{
          position: 'absolute',
          width: '16px',
          top: this.props.player.top,
          left: this.props.player.left,
          height: '16px',
          backgroundPosition: 'center',
          backgroundImage: `url(${PlayerImg})`,
          zIndex: 1
        }}
      >
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map,
  player: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  collectItem: (item) => dispatch(collectItem(item)),
  digTile: (tile) => dispatch(digTile(tile)),
  unDigTile: (tile) => dispatch(unDigTile(tile)),
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates)),
  startAddInventoryItem: (itemRef, item) => dispatch(startAddInventoryItem(itemRef, item)),
  startSendNewsfeedMessage: (message) => dispatch(startSendNewsfeedMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);
