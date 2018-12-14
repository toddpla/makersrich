import React, { Component } from 'react';
import database from '../firebase/firebase'
import PlayerImg from "../assets/player.png"

class Opponent extends Component {

  state = {
    top: -16,
    left: -16
  }

  componentDidMount() {
    database.ref(`/players/${this.props.opponent.id}`).on('value', (snapshot) => {
      console.log('here');
      this.setState({
        ...snapshot.val()
      })
    })
  }

  render() {
    return (
      <div id="player"
        style={{
          position: 'absolute',
          width: '16px',
          top: this.state.top,
          left: this.state.left,
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

export default Opponent;
