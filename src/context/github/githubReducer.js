import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    CLEAR_USERS,
    CLEAR_USER,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };            
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case CLEAR_USER:
            return {
                ...state,
                user: {},
                repos: []
            };
        case CLEAR_USERS:
            return {
                ...state, 
                users: []
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        default:
            return state
    }
};