import React, { Component } from 'react';
import database from '../firebase/firebase'
import PlayerImg from "../assets/player.png"

class Opponent extends Component {

  state = {
    top: -16,
    left: -16
  }

  componentDidMount() {
    const connection = database.ref(`/players/${this.props.opponent.uid}`).on('value', (snapshot) => {
      this.setState({
        ...snapshot.val()
      })
    })
    this.setState({
      connection
    })
  }

  componentWillUnmount() {
    database.ref(`/players/${this.props.opponent.uid}`).off("value", this.state.connection);
  }

  render() {
    return (
      <div id={this.props.opponent.uid}
        style={{
          position: 'absolute',
          width: '16px',
          top: this.state.top,
          left: this.state.left,
          height: '16px',
          backgroundPosition: 'center',
          backgroundImage: `url(${PlayerImg})`
        }}
      >
      </div>
    );
  }
}

export default Opponent;
