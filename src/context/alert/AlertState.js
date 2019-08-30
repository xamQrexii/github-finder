import React, { useReducer } from 'react'
import alertReducer from './alertReducer'
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {

    // initial state
    const initialState = null;

    // use reducer
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // set alert
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        });

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT});
        }, 5000);
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlert: setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState
