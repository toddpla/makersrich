import React, { Component } from 'react';
import { connect } from 'react-redux'
import database, { firebase } from '../../firebase/firebase'
import RPSChoice from './RPSChoice'

class RPS extends Component {

  sendChoice = (weapon) => {
    database.ref(`/battles/${this.props.player.uid}`).update({weapon})
  }

  render() {
    return (
      <div className='rps'>
      <RPSChoice value='Rock' sendMove={this.sendChoice}/> <br/>
      <RPSChoice value='Paper' sendMove={this.sendChoice}/> <br/>
      <RPSChoice value='Scissors' sendMove={this.sendChoice}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps)(RPS);
