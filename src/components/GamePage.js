import React, { Component } from 'react';
import Player from './Player'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { updatePlayer } from '../actions/players'
import styled from 'styled-components'

const AppWrapper = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: #1c1117;
`;

class GamePage extends Component {

  handleMovement = (player, updates) => {
    this.props.updatePlayer(player, updates)
    this.forceUpdate()
  }

  render() {
    return (
      <MapProvider mapUrl={process.env.PUBLIC_URL + "/assets/POWLevel0.json"}>
        <AppWrapper>
          <Map style={{ transform: "scale(2)"}}/>
          // <div>
          //   {this.props.players.map((player, i) => <Player key={i} player={player} handleMovement={this.handleMovement} /> )}
          // </div>
        </AppWrapper>
      </MapProvider>

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
