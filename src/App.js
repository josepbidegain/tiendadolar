import React from 'react'
import {Route} from 'wouter'
import 'App.css'
import Login from 'components/Login'
import Register from 'components/Register'
import Dashboard from 'components/Dashboard'
import ForgotPassword from 'components/ForgotPassword'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme()

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Route exact component={Login} path="/" />
      <Route exact component={Login} path="/login" />
      <Route exact component={Register} path="/register" />
      <Route exact component={ForgotPassword} path="/forgot-password" />
      <Route exact component={Dashboard} path="/dashboard" />
    </MuiThemeProvider>
  )
}

export default App;
