import React, { Component } from 'react';
import { firebase } from '../firebase/firebase'
import Player from './Player';
import Opponent from './Opponent'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { startUpdatePlayer } from '../actions/auth'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import Modal from 'react-modal'
import Quiz from './quiz/Quiz'
import Shop from './shop/Shop'
import Inventory from './Inventory/Inventory'
import RPS from './RPS/RPS'
import Message from './Message'
import LevelPlayers from './leaderboards/LevelPlayers'
import Leaderboard from './leaderboards/Leaderboard'
import Map from './Map'
import opponentsSelector from '../selectors/opponents'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

<<<<<<< HEAD
=======

>>>>>>> Changes impassable, mineable, portals and signs layers

export class GamePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalComponent: 'undefined',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.startBattle = firebase.functions().httpsCallable('startBattle')
  }

  openModal(popUpMessage) {
    if (!this.state.modalIsOpen) {
      this.setState({
        modalIsOpen: true,
        ...popUpMessage
      });
    }
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  handleMovement = (updates) => {
    const player = this.props.player
    if (!this.checkBoundaries(updates) && this.checkImpassable(updates)) {
      this.props.startUpdatePlayer(updates)
    }
    this.props.opponents.forEach(opponent => {
      if (opponent.left === player.left && opponent.top === player.top) {
        this.startBattle({playerOneUid: player.uid, playerTwoUid: opponent.uid})
        this.handlePopupRPS()
      }
    })
    switch(this.checkPortal(updates.left , updates.top)) {
    case "quiz":
      return this.handlePopupQuiz()
    case 'shop':
      return this.handlePopupShop()
    default:
      return
    }
  }

  checkImpassable = (updates) => {
    const x = updates.left
    const y = updates.top

    const impassablePos = this.props.map.impassable.filter((object) => object.x === x && object.y === y)[0]
    return (impassablePos !== undefined) ? false : true
  }

  checkBoundaries = (updates) => {
    if (updates === undefined) { return }
    return (updates.left < 0 || updates.top < 0 || updates.left > MAX_WIDTH - SPRITE_SIZE
            || updates.top > MAX_HEIGHT - SPRITE_SIZE )
  }

  checkPortal = (x, y) => {
    const portal = this.props.map.portals.filter((object) => object.x === x && object.y === y)[0]
    if (portal !== undefined) {
      return portal.name
    }
    return false
  }

  checkSign = (x, y) => {
    const sign = this.props.map.signs.filter((object) => object.x === x && object.y + 16 === y)[0]
    if (sign !== undefined) {
      return this.handlePopupMessage(sign.properties[0].value)
    }
    return false
  }

  handlePopupQuiz = () => {
    this.openModal({modalComponent: <Quiz />})
  }
  handlePopupInventory = () => {
    this.openModal({modalComponent: <Inventory />})
  }
  handlePopupRPS = () => {
    this.openModal({modalComponent: <RPS />})
  }

  handlePopupMessage = (message) => {
    this.openModal({modalComponent: <Message message={message}/>})
  }

  handlePopupLevelPlayersList = () => {
    this.openModal({modalComponent: <LevelPlayers level={this.props.player.level}/>})
  }

  handlePopupLeaderboard = () => {
    this.openModal({modalComponent: <Leaderboard />})
  }

  handlePopupShop = () => {
    this.openModal({modalComponent: <Shop />})
  }

  render() {
    return (
      <div
        style={{
            position: 'relative',
            margin: '20px auto',
        }}
        >


        <Map>

        </Map>

        <Player player={this.props.player}
        handleMovement={this.handleMovement}
        handlePopupInventory={this.handlePopupInventory}
        handlePopupRPS={this.handlePopupRPS}
        handlePopupMessage={this.handlePopupMessage}
        checkSign={this.checkSign}
        closeModal={this.closeModal}
        notOnMap={this.state.modalIsOpen}
        />

        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={this.state.modalTitle}
        >
          {this.state.modalComponent}
          <div className="modal-button" onClick={this.closeModal}></div>
        </Modal>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map,
  player: state.auth,
  opponents: opponentsSelector(state.opponents, 'online', state.auth.level, state.auth.uid)
})

const mapDispatchToProps = (dispatch) => ({
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
