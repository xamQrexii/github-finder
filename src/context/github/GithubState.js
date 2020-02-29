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

// set environment variables for production and development
let githubCliendId;
let githubClientSecret;

const { NODE_ENV, REACT_APP_GITHUB_CLIENT_ID, GITHUB_CLIENT_ID, } = process.env

if (NODE_ENV !== 'production') {
    githubCliendId = REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubCliendId = GITHUB_CLIENT_ID;
    githubClientSecret = process.GITHUB_CLIENT_SECRET;
}

// GithubState component
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

        const { data } = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${
            githubCliendId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: SEARCH_USERS,
            payload: data.items
        });
    }

    // Get user
    const getUser = async username => {

        setLoading();
        const { data } = await axios.get(
            `https://api.github.com/users/${username}?client_id=${
            githubCliendId}&client_secret=${githubClientSecret}`);

        await dispatch({
            type: GET_USER,
            payload: data
        });

    };

    // Get repos
    const getUserRepos = async username => {

        // use destructuring whenever possible 
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
            githubCliendId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: GET_REPOS,
            payload: data
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
