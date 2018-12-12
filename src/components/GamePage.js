import React, { Component } from 'react';
import Player from './Player'
import { MapProvider, Map } from 'react-tiled'
import { connect } from 'react-redux'
import { updatePlayer } from '../actions/players'
import { uploadMap } from '../actions/map'
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import styled from "styled-components";
import { tiles } from '../maps'
import { saveAs } from '@progress/kendo-file-saver'

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1117;
`;

class GamePage extends Component {

  handleMovement = (player, updates) => {
    console.log(updates)
    if (!this.checkBoundaries(updates)) {
      this.props.updatePlayer(player, updates)
      this.forceUpdate()
    }
  }

  checkBoundaries = (updates) => {
    if (updates === undefined) { return }
    return (updates.left < 0 || updates.top < 0 || updates.left > MAX_WIDTH - SPRITE_SIZE
            || updates.top > MAX_HEIGHT - SPRITE_SIZE )
  }

  getMap = () => {
    console.log(JSON.stringify((tiles)))
    this.props.uploadMap(tiles)
    return JSON.stringify(tiles)
  }

  render() {
    return (
      <MapProvider style={{margin: "auto"}}  mapUrl={this.getMap()}>
       <AppWrapper>
        <Map style={{ transform: "scale(1)", position: 'relative' }}>
          <div>
            {this.props.players.map((player, i) => <Player key={i} player={player} handleMovement={this.handleMovement} /> )}
          </div>
        </Map>
       </AppWrapper>
      </MapProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.players
})

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (player, direction) => dispatch(updatePlayer(player, direction)),
  uploadMap: (tiles) => dispatch(uploadMap(tiles))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
