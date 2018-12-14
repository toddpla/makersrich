import React, { Component } from 'react';
import Player from './Player'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { startUpdatePlayer } from '../actions/auth'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import styled from "styled-components";
import Modal from 'react-modal'
import Quiz from './quiz/Quiz'
import Inventory from './Inventory/Inventory'
import Message from './Message'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'rgba(255, 0, 0, 0)'
  }
};

export const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1117;
`

// Modal.setAppElement('#root')


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
      this.props.startUpdatePlayer(updates)
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
      return this.handlePopupMessage(sign.properties.value)
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

  render() {
    return (
      <div>
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
          )}
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
  player: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  startUpdatePlayer: (direction) => dispatch(startUpdatePlayer(direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
