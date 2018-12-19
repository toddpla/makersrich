
// third parties
import React, { Component }   from 'react'
import database, { firebase } from '../firebase/firebase'
import { connect }            from 'react-redux'
import Modal                  from  'react-modal'

// utils and constants
import { MAX_HEIGHT, MAX_WIDTH, SPRITE_SIZE } from '../constants'
import Modal from 'react-modal'
import Quiz from './quiz/Quiz'
import Shop from './shop/Shop'
import Inventory from './inventory/Inventory'
import RPS from './RPS/RPS'
import Message from './Message'
import LevelPlayers from './leaderboards/LevelPlayers'
import Leaderboard from './leaderboards/Leaderboard'
import Map from './Map'
import ControlPanel from './controlpanel/ControlPanel'
import opponentsSelector from '../selectors/opponents'
import { startSendNewsfeedMessage } from '../actions/newsfeed'
import Instructions from './Instructions'

// components
import Player           from './Player';
import Opponent         from './Opponent'
import Quiz             from './quiz/Quiz'
import Shop             from './shop/Shop'
import Inventory        from './Inventory/Inventory'
import Battle           from './battle/Battle'
import Message          from './Message'
import Leaderboard      from './leaderboards/Leaderboard'
import Instructions     from './Instructions'
import Map              from './Map'
import Egg              from './Egg'
import ControlPanel     from './controlpanel/ControlPanel'

// actions
import { startWinEgg }              from '../actions/egg'
import opponentsSelector            from '../selectors/opponents'
import { startSendNewsfeedMessage } from '../actions/newsfeed'
import { startUpdatePlayer }        from '../actions/auth'
import { startEnterBattle,
          startCheckOpponentCanBattle} from '../actions/battle'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'none',
    border                : 'none'
  }
};

export class GamePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalComponent: 'undefined',
      battle: props.player.battle,
      onFocus: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.startBattle = firebase.functions().httpsCallable('startBattle')
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) { this.closeModal() }
    })
  }

  // componentDidUpdate() {
  //   if (!!this.props.player.battle && !this.state.modalIsOpen) this.openModal({modalComponent: <Battle />})
  // }

  componentDidUpdate(prevState) {
    if (prevState.player.battle === undefined && this.props.player.battle !== undefined) {
      if(!this.state.modalIsOpen) {
        this.openModal({modalComponent: <Battle />})
      }
    } else if (prevState.player.battle !== undefined && this.props.player.battle === undefined) {
      if (this.state.modalIsOpen){
        this.closeModal()
     }
    }
  }

  // modal tings
  openModal(params) {
    this.setState({
      modalIsOpen: true,
      ...params
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  handleOnFocus = () => {
    this.setState({
      onFocus: true
    })
  }

  handleOffFocus = () => {
    this.setState({
      onFocus: false
    })
  }

  handleMovement = (updates) => {
    const player = this.props.player
    if (!this.checkBoundaries(updates) && this.checkImpassable(updates)) {
      this.props.startUpdatePlayer(updates)
    }
    if (player.left === this.props.egg.left && player.top === this.props.egg.top) {
      this.props.startWinEgg()
    }
    if(this.props.player.cash > 25 && player.battle === undefined) {
      this.props.opponents.forEach(opponent => {
        if (opponent.left === player.left && opponent.top === player.top) {
          this.props.startCheckOpponentCanBattle(opponent).then((opponentCanBattle) => {
            if (opponentCanBattle) {
              this.props.startEnterBattle(opponent)
            }
          })
        }
      })
    }
    switch(this.checkPortal(updates.left , updates.top)) {
    case "quiz":
      return this.handlePopupQuiz()
    case 'shop':
      return this.handlePopupShop()
    default:
      return
    }
  }

  checkImpassable = (updates) => {
    const x = updates.left
    const y = updates.top
    const impassablePos = this.props.map.impassable.filter((object) => object.x === x && object.y === y)[0]
    return (impassablePos !== undefined) ? false : true
  }

  checkBoundaries = (updates) => {
    if (updates === undefined) { return }
    return (updates.left < 0 || updates.top < 0 || updates.left > MAX_WIDTH - SPRITE_SIZE
            || updates.top > MAX_HEIGHT - SPRITE_SIZE )
  }

  checkPortal = (x, y) => {
    const portal = this.props.map.portals.filter((object) => object.x === x && object.y === y)[0]
    if (portal !== undefined) {
      return portal.name
    }
    return false
  }

  checkSign = (x, y) => {
    const sign = this.props.map.signs.filter((object) => object.x === x && object.y + 16 === y)[0]
    if (sign !== undefined) {
      return this.handlePopupMessage(sign.properties[0].value)
    }
    return false
  }

  handlePopupQuiz = () => {
    this.props.startSendNewsfeedMessage(`entered the Quiz house thing!`)
    this.openModal({modalComponent: <Quiz closeModal={this.closeModal}/>})
  }
  handlePopupInventory = () => {
    this.openModal({modalComponent: <Inventory />})
  }
  handlePopupBattle = () => {
    this.props.startSendNewsfeedMessage(`joined a Battle showdown!!`)
    this.openModal({modalComponent: <Battle />})
  }

  handlePopupMessage = (message, item) => {
    this.openModal({modalComponent: <Message message={message} item={item}/>})
  }

  handlePopupLeaderboard = () => {
    this.openModal({modalComponent: <Leaderboard />})
  }

  handlePopupShop = () => {
    this.props.startSendNewsfeedMessage(`is shopping in Muxworthy's!`)
    this.openModal({modalComponent: <Shop />})
  }

  handlePopupInstructions = () => {
    this.openModal({modalComponent: <Instructions />})
  }

  render() {
    return (
      <div id="game-wrapper" >
        <Map />

        <Player player={this.props.player}
          handleMovement={this.handleMovement}
          handlePopupInventory={this.handlePopupInventory}
          closeModal={this.closeModal}
          handlePopupRPS={this.handlePopupRPS}
          handlePopupMessage={this.handlePopupMessage}
          handlePopupInstructions={this.handlePopupInstructions}
          checkSign={this.checkSign}
          notOnMap={this.state.modalIsOpen}
          onFocus={this.state.onFocus}
        />
        {this.props.opponents.map((opponent, i) => <Opponent key={i} opponent={opponent} />)}
        <Egg />
        <div>
        <ControlPanel
          handleOnFocus={this.handleOnFocus}
          handleOffFocus={this.handleOffFocus}
          handlePopupLeaderboard={this.handlePopupLeaderboard}/>
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={this.state.modalTitle}
        >
          {this.state.modalComponent}
          <div className="modal-button" onClick={this.closeModal}></div>
        </Modal>
        </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  map: state.map,
  player: state.auth,
  opponents: opponentsSelector(state.opponents, 'online', state.auth.level, state.auth.uid),
  egg: state.egg
})

export const mapDispatchToProps = (dispatch) => ({
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates)),
  startSendNewsfeedMessage: (message) => dispatch(startSendNewsfeedMessage(message)),
  startWinEgg: () => dispatch(startWinEgg()),
  startCheckOpponentCanBattle: (opponent) => dispatch(startCheckOpponentCanBattle(opponent)),
  startEnterBattle: (opponent) => dispatch(startEnterBattle(opponent))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
