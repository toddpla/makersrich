import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
  <header>
      <NavLink to="/game" className='nav-link' activeClassName="is-active"> Game </NavLink>
      <NavLink to="/add-question" className='nav-link' activeClassName="is-active"> Contribute </NavLink>
      <button onClick={startLogout}>Logout</button>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
