import React, { Component } from 'react';
import Player from './Player'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { updatePlayer } from '../actions/players'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import styled from "styled-components";
import Modal from 'react-modal'
import Quiz from './quiz/quiz'

import mapJson from '../POWLevel1.json'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1117;
`;

class GamePage extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalBody: 'undefined',
      modalTitle: 'undefined'
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(popUpMessage) {
    this.setState({
      modalIsOpen: true,
      ...popUpMessage
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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
    this.setState({
      modalBody: <Quiz />
    })
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={this.state.modalTitle}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          {this.props.modalBody}
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
