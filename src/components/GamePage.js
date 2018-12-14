import React, { Component } from 'react';
import Player from './Player';
import Opponent from './Opponent'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { startUpdatePlayer } from '../actions/auth'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import styled from "styled-components";
import Modal from 'react-modal'
import Quiz from './quiz/Quiz'
import Inventory from './Inventory/Inventory'
import Message from './Message'
import LevelPlayers from './LevelPlayers'
import Leaderboard from './Leaderboard'


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

export const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1117;
`

Modal.setAppElement('#root')


export class GamePage extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalComponenet: 'undefined'
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(popUpMessage) {
    this.setState({
      modalIsOpen: true,
      ...popUpMessage
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleMovement = (updates) => {
    if (!this.checkBoundaries(updates) && this.checkImpassable(updates)) {
      this.props.startUpdatePlayer(this.props.player.uid, updates)
      this.forceUpdate()
    }
    switch(this.checkPortal(updates.left , updates.top)) {
    case "quiz":
      return this.handlePopupQuiz()
    case 'shop':
      console.log('shop');
      return
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

  handlePopupMessage = (message) => {
    this.openModal({modalComponent: <Message message={message}/>})
  }

  handlePopupLevelPlayersList = () => {
    this.openModal({modalComponent: <LevelPlayers level={this.props.player.level}/>})
  }

  handlePopupLeaderboard = () => {
    this.openModal({modalComponent: <Leaderboard />})
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePopupLevelPlayersList}>Level PLayers</button>
        <button onClick={this.handlePopupLeaderboard}>Leaderboard</button>
      <MapProvider style={{margin: "auto"}}  mapUrl={process.env.PUBLIC_URL + "/assets/POWLevel1.json"}>
       <AppWrapper>
        <Map style={{ transform: "scale(1)", position: 'relative' }}>
          <div>
            <Player player={this.props.player}
              handleMovement={this.handleMovement}
              handlePopupInventory={this.handlePopupInventory}
              checkSign={this.checkSign}
              closeModal={this.closeModal}
            />
          {this.props.opponents.map((opponent, i) => <Opponent key={i} opponent={opponent} />)}
          </div>
        </Map>
       </AppWrapper>
      </MapProvider>
        <Modal
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
  opponents: state.opponents
})

const mapDispatchToProps = (dispatch) => ({
  startUpdatePlayer: (uid, updates) => dispatch(startUpdatePlayer(uid, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
