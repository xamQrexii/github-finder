import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
  //     process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ loading: false, users: res.data });

  // }


  //  Search GitHub Users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    await setUsers(res.data.items);
    setLoading(false);
  }

  // Get single GitHub user
  const getUser = async (username) => {
    await setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    await setUser(res.data);
    setLoading(false);
  }

  // Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    setRepos(res.data);    
    setLoading(false);
  }

  // Clear users from state
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  }

  // Show Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  }

    return (
      <Router>
        <div>
          <NavBar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
}

export default App;