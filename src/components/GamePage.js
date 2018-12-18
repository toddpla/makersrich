import React, { Component } from 'react';
import database, { firebase } from '../firebase/firebase'
import Player from './Player';
import Opponent from './Opponent'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { startUpdatePlayer } from '../actions/auth'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import styled from "styled-components";
import Modal from 'react-modal'
import Quiz from './quiz/Quiz'
import Shop from './shop/Shop'
import Inventory from './Inventory/Inventory'
import RPS from './RPS/RPS'
import Message from './Message'
import LevelPlayers from './leaderboards/LevelPlayers'
import Leaderboard from './leaderboards/Leaderboard'
import NewsFeed from './NewsFeed'
import opponentsSelector from '../selectors/opponents'
import { startSendNewsfeedMessage } from '../actions/newsfeed'
import Instructions from './Instructions'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'none',
    border                : 'none'
  }
};

export const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1117;
`

export class GamePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalComponenet: 'undefined',
      battle: props.player.battle
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.startBattle = firebase.functions().httpsCallable('startBattle')
  }

  componentDidUpdate() {
    if (!!this.props.player.battle && !this.state.modalIsOpen) this.openModal({modalComponent: <RPS />})
  }

  // modal tings
  openModal(params) {
    this.setState({
      modalIsOpen: true,
      ...params
    });
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
        const playerInBattle = database.ref(`/battles/${this.props.player.uid}`).once('value').then(snap => snap.exists())
        const opponentInBattle = database.ref(`/battles/${this.props.player.uid}`).once('value').then(snap => snap.exists())
        Promise.all([playerInBattle, opponentInBattle]).then((values) => {
          if(values.filter(value => value).length === 0) {
            database.ref(`/battles/${this.props.player.uid}`).set({opponentUid: opponent.uid})
            database.ref(`/battles/${ opponent.uid}`).set({opponentUid: this.props.player.uid})
          }
        })
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
    this.props.startSendNewsfeedMessage(`${this.props.player.displayName} entered the Quiz house thing!`)
    this.openModal({modalComponent: <Quiz />})
  }
  handlePopupInventory = () => {
    this.openModal({modalComponent: <Inventory />})
  }
  handlePopupRPS = () => {
    this.props.startSendNewsfeedMessage(`${this.props.player.displayName} joined a RPS showdown!!`)
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
    this.props.startSendNewsfeedMessage(`${this.props.player.displayName} is shopping in Muxworthy's!`)
    this.openModal({modalComponent: <Shop />})
  }

  handlePopupInstructions = () => {
    this.openModal({modalComponent: <Instructions />})
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) { this.closeModal() }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePopupLevelPlayersList}>Level PLayers</button>
        <button onClick={this.handlePopupLeaderboard}>Leaderboard</button>
      <NewsFeed />
      <MapProvider style={{margin: "auto"}}  mapUrl={process.env.PUBLIC_URL + "/assets/POWLevel1.json"}>
       <AppWrapper>
        <Map style={{ transform: "scale(1)", position: 'relative' }}>
          <div>
            <Player player={this.props.player}
              handleMovement={this.handleMovement}
              handlePopupInventory={this.handlePopupInventory}
              handlePopupRPS={this.handlePopupRPS}
              handlePopupMessage={this.handlePopupMessage}
              handlePopupInstructions={this.handlePopupInstructions}
              checkSign={this.checkSign}
              closeModal={this.closeModal}
              notOnMap={this.state.modalIsOpen}
            />
          {this.props.opponents.map((opponent, i) => <Opponent key={i} opponent={opponent} />)}
          </div>
        </Map>
       </AppWrapper>
      </MapProvider>
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

export const mapStateToProps = (state) => ({
  map: state.map,
  player: state.auth,
  opponents: opponentsSelector(state.opponents, 'online', state.auth.level, state.auth.uid)
})

export const mapDispatchToProps = (dispatch) => ({
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates)),
  startSendNewsfeedMessage: (message) => dispatch(startSendNewsfeedMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
