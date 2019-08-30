import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState'

import './App.css';

const App = () => {

  return (
    <GithubState>
      <AlertState>
      <Router>
        <div>
          <NavBar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                />
              )}
              />
            </Switch>
          </div>
        </div>
      </Router>
      </AlertState>
    </GithubState>
  )
}

export default App;