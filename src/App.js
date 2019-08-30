import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import NavBar from './components/layout/NavBar';
import User from './components/users/User';
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
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props => (
                  <User
                    {...props}
                  />
                )}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App;