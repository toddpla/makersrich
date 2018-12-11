import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <div>
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/add-player" />
      ) : (
        <Component {...props}/>
      )
    )}/>
  </div>
)

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)
