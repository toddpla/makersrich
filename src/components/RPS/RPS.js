import React, { Component } from 'react';
import { firebase } from '../../firebase/firebase'
import RPSChoice from './RPSChoice'

class RPS extends Component {

  state = {
    useWeapon: firebase.functions().httpsCallable('useWeapon')
  }

  sendChoice = (weapon) => {
    this.state.useWeapon({weapon})
    console.log('weapon used', weapon);
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

export default RPS;
