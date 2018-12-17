import React, { Component } from 'react';
import { connect } from 'react-redux'
import database, { firebase } from '../../firebase/firebase'
import RPSChoice from './RPSChoice'
import selectRandom from '../../utils/selectRandom'
import { startCreditPlayer } from '../../actions/auth'
import { startDebitPlayer } from '../../actions/auth'

class RPS extends Component {

  constructor(props) {
    const openingStatements = ["Time to fight", "Choose your weapon", "What's it gonna to be Maker..."]
    super(props)
    this.state = {
      infoMessage: openingStatements[Math.floor(Math.random() * openingStatements.length)]
    }
  }

  sendChoice = (weapon) => {
    const drawingStatements = ["It's === have another go", "Its a draw, go again!", "You chose the same. Have another go!"]
    const winningStatements = ["Winner winer chicken dinner!", "Booyakasha - you da boss!", "YEEEEAASS! Win win win!"]
    const losingStatements = ["You are a LOOOSER!", "Better luck next some Maker", "Oh dear, what have you done!"]
    database.ref(`/battles/${this.props.player.uid}`).update({weapon})
    database.ref(`/battles/${this.props.player.battle.opponentUid}/weapon`).once('value').then(snap => {
      const opponentWeapon = snap.val()
      const weaponsMatrix = {'Rock': ['Scissors'], 'Paper': ['Rock'], 'Scissors': ['Paper']}
      if (Object.keys(weaponsMatrix).includes(opponentWeapon)) {
        let playerInfoMessage;
        let opponentInfoMessage;
        if (weapon === opponentWeapon) {
          playerInfoMessage = selectRandom(drawingStatements)
          opponentInfoMessage = selectRandom(drawingStatements)
          database.ref(`/battles/${this.props.player.battle.opponentUid}`).update({
            infoMessage: opponentInfoMessage,
            weapon: null
          })
          database.ref(`/battles/${this.props.player.uid}`).update({
            infoMessage: playerInfoMessage,
            weapon: null
          })
          return
        } else if (weaponsMatrix[weapon].includes(opponentWeapon)) {
          this.props.startCreditPlayer(25)
          playerInfoMessage = selectRandom(winningStatements)
          opponentInfoMessage = selectRandom(losingStatements)
        } else {
          this.props.startDebitPlayer(25)
          opponentInfoMessage = selectRandom(losingStatements)
          playerInfoMessage = selectRandom(winningStatements)
        }
        // database.ref(`/battles/${this.props.player.battle.opponentUid}`).update({infoMessage: opponentInfoMessage})
        // database.ref(`/battles/${this.props.player.uid}`).update({infoMessage: playerInfoMessage})
        database.ref(`/battles/${this.props.player.battle.opponentUid}`).remove()
        database.ref(`/battles/${this.props.player.uid}`).remove()

      } else {
        console.log('no opponent weapon');
      }
    })
  }

  render() {
    return (
      <div>
        {this.props.player.battle && (
          <div className='rps'>
            <h3>{this.props.player.battle.infoMessage || this.state.infoMessage}</h3>
            <RPSChoice value='Rock' sendMove={this.sendChoice}/> <br/>
            <RPSChoice value='Paper' sendMove={this.sendChoice}/> <br/>
            <RPSChoice value='Scissors' sendMove={this.sendChoice}/>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RPS);
