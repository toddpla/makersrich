import React, { Component } from 'react';
import { connect } from 'react-redux'
import database, { firebase } from '../../firebase/firebase'
import moment from 'moment'
import selectRandom from '../../utils/selectRandom'
import { startCreditPlayer, startDebitPlayer, updatePlayer } from '../../actions/auth'
import { startSendNewsfeedMessage } from '../../actions/newsfeed'
import Timer from './Timer'
import { DEFAULT_BATTLE_BET_AMOUNT } from '../../constants'
import './rps.css'

export class Battle extends Component {

  constructor(props) {
    const openingStatements = ["Time to fight", "Choose your weapon", "What's it gonna to be Maker..."]
    super(props)
    this.state = {
      uid: props.player.uid,
      opponentUid: props.player.battle.opponentUid,
      opponentName: props.player.battle.opponentName.split(" ")[0] || '',
      // infoMessage: openingStatements[Math.floor(Math.random() * openingStatements.length)],
      infoMessage: "Choose your weapon",
      drawingStatements: ["It's === have another go", "Its a draw, go again!", "You chose the same. Have another go!"],
      waitingStatemnets: ["Weapon selected!", "Waiting for opponent!", "Here we go!"],
      winningStatements: ["Winner winer chicken dinner!", "Booyakasha - you da boss!", "YEEEEAASS! Win win win!"],
      losingStatements: ["You are a LOOOSER!", "Better luck next some Maker", "Oh dear, what have you done!"],
      betAmount: DEFAULT_BATTLE_BET_AMOUNT
    }
  }

  updateBattle = (uid, updates) => {
    database.ref(`/battles/${uid}`).update(updates)
  }

  removeBattles = () => {
    return Promise.all([
      database.ref(`/battles/${this.state.uid}`).remove(),
      database.ref(`/battles/${this.state.opponentUid}`).remove()
    ])
  }

  getOpponentWeapon = () => {
    return database.ref(`/battles/${this.state.opponentUid}/weapon`).once('value')
  }

  getPlayerWeapon = () => {
    return database.ref(`/battles/${this.state.uid}/weapon`).once('value')
  }


  finishGame = (winner) => {
    this.props.updatePlayer({battle: null})
    this.removeBattles().then(() => {
      if (winner === 'player') {
        this.props.startCreditPlayer(this.state.betAmount)
        this.props.startSendNewsfeedMessage(`beat ${this.state.opponentName} in a battle`)
      } else if (winner === 'opponent') {
        this.props.startSendNewsfeedMessage(`was beaten by ${this.state.opponentName} in a battle`)
        this.props.startDebitPlayer(this.state.betAmount)
      } else {
        this.props.startSendNewsfeedMessage(`drew with ${this.state.opponentName} in a battle`)
        this.props.startDebitPlayer(this.state.betAmount)
        // this.props.startDebitOpponent(this.state.betAmount)
      }

    })
  }

  sendChoice = (e) => {
    e.preventDefault()
    const weapon = e.target.value
    this.getOpponentWeapon().then(snap => {
      const opponentWeapon = snap.val()
      const weaponsMatrix = {'Rock': ['Scissors'], 'Paper': ['Rock'], 'Scissors': ['Paper']}
      if (Object.keys(weaponsMatrix).includes(opponentWeapon)) {
        if (weapon === opponentWeapon) {
          this.updateBattle(this.state.opponentUid, {
            infoMessage: "Its a draw, go again!",
            // infoMessage: selectRandom(this.state.drawingStatements),
            weapon: null
          })
          this.updateBattle(this.state.uid, {
            infoMessage: "Its a draw, go again!",
            // infoMessage: selectRandom(this.state.drawingStatements),
            weapon: null
          })
          return
        } else {
          const winner = (weaponsMatrix[weapon].includes(opponentWeapon)) ? 'player' : 'opponent'
          this.finishGame(winner)
        }
      } else {
        this.updateBattle(this.state.uid, {
          infoMessage: "Winner winer chicken dinner!",
          // infoMessage: selectRandom(this.state.waitingStatemnets),
          weapon
        })
      }
    })
  }

  handleTimeout = () => {
    this.getPlayerWeapon().then(snap => {
      if(snap.exists()) {
        this.finishGame('player')
      } else {
        this.finishGame()
      }
    })
  }

  render() {
    return (
      <div id="rps-battle-container">
        {this.props.player.battle ? (
          <div className='rps'>
            <h5>Battle with {this.props.player.battle.opponentName}</h5>
            <h3>{this.props.player.battle.infoMessage || this.state.infoMessage}</h3>
            <button className="rps-choice Rock" value='Rock' onClick={this.sendChoice}></button>
            <button className="rps-choice Paper" value='Paper' onClick={this.sendChoice}></button>
            <button className="rps-choice Scissors" value='Scissors' onClick={this.sendChoice}></button>
            <Timer
              end={moment(this.props.player.battle.created_at).add(5, 'seconds')}
              handleTimeout={this.handleTimeout}
            />
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
  startCreditPlayer: (cash) => dispatch(startCreditPlayer(cash)),
  updatePlayer: (updates) => dispatch(updatePlayer(updates)),
  startSendNewsfeedMessage: (message) => dispatch(startSendNewsfeedMessage(message))
})

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
