import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export class Header extends React.Component {

  handleLogout = () => {
    this.props.startLogout()
    window.location.reload()
  }

  render() {
    return (
      <header>
        <button className="logout-button" onClick={this.handleLogout}>Logout</button>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
