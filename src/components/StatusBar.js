import React, { Component } from 'react';
import { connect } from 'react-redux'

class StatusBar extends Component {

  render() {
    return (
      <div id="player-status-bar">STATUS
        <div>{this.props.player.cash} cash</div>
        <div>{this.props.player.inventory.bean.length} beans</div>
        <div>{this.props.player.inventory.ruby.length} rubies</div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps)(StatusBar)
