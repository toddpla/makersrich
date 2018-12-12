import React, { Component } from 'react';
import Player from './Player'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { updatePlayer } from '../actions/players'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import styled from "styled-components";
import Modal from 'react-modal'
import Quiz from './quiz/Quiz'
import Inventory from './Inventory/Inventory'

import mapJson from '../POWLevel1.json'

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

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1117;
`

Modal.setAppElement('#root')

class GamePage extends Component {

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

  handleMovement = (player, updates) => {
    console.log(player, updates)
    if (!this.checkBoundaries(updates) && this.checkImpassable(updates)) {
      this.props.updatePlayer(player, updates)
      this.forceUpdate()
    }
  }

  checkImpassable = (updates) => {
    const x = updates.left
    const y = updates.top

    const impassablePos = mapJson.layers[1].objects.filter((object) => object.x === x && object.y === y)[0]
    return (impassablePos !== undefined) ? false : true
  }

  checkBoundaries = (updates) => {
    if (updates === undefined) { return }
    return (updates.left < 0 || updates.top < 0 || updates.left > MAX_WIDTH - SPRITE_SIZE
            || updates.top > MAX_HEIGHT - SPRITE_SIZE )
  }

  handlePopupQuiz = () => {
    this.openModal({modalComponenet: <Quiz />})
  }
  handlePopupInventory = () => {
    this.openModal({modalComponenet: <Inventory />})
  }

  render() {
    return (
      <div>
      <MapProvider style={{margin: "auto"}}  mapUrl={process.env.PUBLIC_URL + "/assets/POWLevel1.json"}>
       <AppWrapper>
        <Map style={{ transform: "scale(1)", position: 'relative' }}>
          <div>
            {this.props.players.map((player, i) => <Player key={i} player={player} handleMovement={this.handleMovement} /> )}
          </div>
        </Map>
       </AppWrapper>
      </MapProvider>
      <button onClick={this.openModal}>Open Modal</button>
      <button onClick={this.handlePopupQuiz}>Open Quiz</button>
      <button onClick={this.handlePopupInventory}>Open Invetory</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={this.state.modalTitle}
        >
          {this.state.modalComponenet}
          <button onClick={this.closeModal}>close</button>
        </Modal>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.players
})

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (player, direction) => dispatch(updatePlayer(player, direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
