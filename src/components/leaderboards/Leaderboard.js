import React, { Component } from 'react';
import { connect } from 'react-redux'
import database from '../../firebase/firebase'
import PlayersList from './PlayersList'
import './leaderboards.css'

export class Leaderboard extends Component {

  state = {
    players: [],
    connection: undefined
  }

  componentDidMount() {
    console.log(1);
    this.setState({
      connection: database.ref(`players`).on('value', (snapshot) => {
                  console.log(2);
                  var players = []
                  console.log(3);
                  Object.keys(snapshot.val()).forEach((playerKey) => {
                  players.push(snapshot.val()[playerKey])
                  })
                  console.log(4);
                  this.setState({
                    players
                  })
      })
    })

  }

  render() {
    console.log(5);
    return (
      <div id="leaderboard-container">
        <h3>Leaderboard</h3>
        <PlayersList players={this.state.players} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  opponents: state.opponents
})

export default connect(mapStateToProps)(Leaderboard);
