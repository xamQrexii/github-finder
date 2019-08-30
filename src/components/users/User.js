import React, { Fragment, useContext, useLayoutEffect } from 'react'
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {

    // use github context
    const githubContext = useContext(GithubContext);
    
    // destructure github context
    const { user, getUser, clearUser, repos, getUserRepos, loading } = githubContext;

    useLayoutEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        return () => clearUser();
        // eslint-disable-next-line        
    }, []);
    
    if (loading) return <Spinner />
    
    // destructure user
    const {
        name,
        avatar_url,
        location,
        company,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;    


    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
                </Link>
            Hireable:{' '}
            {
                hireable ?
                    <i className='fas fa-check text-success'></i>
                    :
                    <i className='fas fa-times-circle text-danger'></i>
            }
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url}
                        alt=''
                        className='round-img'
                        style={{ width: '150px' }}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {
                        bio &&
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    }
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit GitHub Profile
                        </a>
                    <ul>
                        {
                            login && <li>
                                <strong>Username: </strong> {login}
                            </li>
                        }
                        {
                            company && <li>
                                <strong>Company: </strong> {company}
                            </li>
                        }
                        {
                            blog && <li>
                                <strong>Website: </strong> {blog}
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    )
}

export default User;