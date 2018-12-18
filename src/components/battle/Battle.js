import React, { Component } from 'react';
import { connect } from 'react-redux'
import database, { firebase } from '../../firebase/firebase'
import selectRandom from '../../utils/selectRandom'
import { startCreditPlayer } from '../../actions/auth'
import { startDebitPlayer } from '../../actions/auth'
import './rps.css'

class Battle extends Component {

  constructor(props) {
    const openingStatements = ["Time to fight", "Choose your weapon", "What's it gonna to be Maker..."]
    super(props)
    this.state = {
      infoMessage: openingStatements[Math.floor(Math.random() * openingStatements.length)]
    }
  }

  sendChoice = (e) => {
    e.preventDefault()
    const weapon = e.target.value
    const drawingStatements = ["It's === have another go", "Its a draw, go again!", "You chose the same. Have another go!"]
    const waitingStatemnets = ["Weapon selected!", ["Waiting for opponent!", "Here we go!"]]
    // const winningStatements = ["Winner winer chicken dinner!", "Booyakasha - you da boss!", "YEEEEAASS! Win win win!"]
    // const losingStatements = ["You are a LOOOSER!", "Better luck next some Maker", "Oh dear, what have you done!"]
    database.ref(`/battles/${this.props.player.battle.opponentUid}/weapon`).once('value').then(snap => {
      const opponentWeapon = snap.val()
      const weaponsMatrix = {'Rock': ['Scissors'], 'Paper': ['Rock'], 'Scissors': ['Paper']}
      if (Object.keys(weaponsMatrix).includes(opponentWeapon)) {
        if (weapon === opponentWeapon) {
          database.ref(`/battles/${this.props.player.battle.opponentUid}`).update({
            infoMessage: selectRandom(drawingStatements),
            weapon: null
          })
          database.ref(`/battles/${this.props.player.uid}`).update({
            infoMessage: selectRandom(drawingStatements),
            weapon: null
          })
          return
        } else if (weaponsMatrix[weapon].includes(opponentWeapon)) {
          this.props.startCreditPlayer(25)
        } else {
          this.props.startDebitPlayer(25)
        }
        database.ref(`/battles/${this.props.player.battle.opponentUid}`).remove()
        database.ref(`/battles/${this.props.player.uid}`).remove()
      } else {
        database.ref(`/battles/${this.props.player.uid}`).update({
          infoMessage: selectRandom(waitingStatemnets),
          weapon
        })
      }
    })
  }

  render() {
    return (
      <div id="rps-battle-container">
        {this.props.player.battle ? (
          <div className='rps'>
            <h3>{this.props.player.battle.infoMessage || this.state.infoMessage}</h3>
            <button value='Rock' onClick={this.sendChoice}>Rock</button> <br/>
            <button value='Paper' onClick={this.sendChoice}>Paper</button> <br/>
            <button value='Scissors' onClick={this.sendChoice}>Scissors</button>
          </div>
        ) : (
          <h1>Game over</h1>
        )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startDebitPlayer: (cash) => dispatch(startDebitPlayer(cash)),
  startCreditPlayer: (cash) => dispatch(startCreditPlayer(cash))
})

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
