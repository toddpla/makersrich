import React, { Component } from 'react';
import { connect } from 'react-redux'

class StatusBar extends Component {

  render() {
    return (
      <div id="player-status-bar">
        <p>Logged in as {this.props.player.displayName.split(' ')[0]}</p>
        <div className="status-count"><div className="coins cash-status">{this.props.player.cash}</div></div>
        <div className="status-count"><div className="key status-bar-image">{this.props.player.inventory.key.length}</div></div>
        <div className="status-count"><div className="bean status-bar-image">{this.props.player.inventory.bean.length}</div></div>
        <div className="status-count"><div className="ruby status-bar-image">{this.props.player.inventory.ruby.length}</div></div>
      </div>
    );
  }

}

export const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps)(StatusBar)
