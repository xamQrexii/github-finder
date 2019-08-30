import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    CLEAR_USERS,
    CLEAR_USER
} from '../types';

const GithubState = props => {

    // initial state
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    // Search users
    const searchUsers = async text => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }

    // Get user
    const getUser = async username => {
        
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID
            }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        await dispatch({
            type: GET_USER,
            payload: res.data
        });

    };

    // Get repos
    const getUserRepos = async username => {
    
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
    
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      }

    // Clear users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Clear user
    const clearUser = () => dispatch({ type: CLEAR_USER });

    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    // reducer
    const [state, dispatch] = useReducer(githubReducer, initialState);

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers: searchUsers,
                clearUsers: clearUsers,
                getUser: getUser,
                clearUser: clearUser,
                getUserRepos: getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;