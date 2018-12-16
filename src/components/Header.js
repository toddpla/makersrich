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
        <NavLink to="/game" className='nav-link' activeClassName="is-active"> Game </NavLink>
        <NavLink to="/add-question" className='nav-link' activeClassName="is-active"> Contribute </NavLink>
        <button onClick={this.handleLogout}>Logout</button>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
