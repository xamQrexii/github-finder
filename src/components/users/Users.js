import React, { useContext } from 'react'
import GithubContext from '../../context/github/githubContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = () => {

    // use github context
    const githubContext = useContext(GithubContext);

    // destructure github context
    const { users, loading } = githubContext; 

    if(loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => 
                <UserItem key={user.id} user={user} />
                )}
            </div>
        );
    }     
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users