import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'


const NavBar = (props) => {
    return (
        <nav className='navbar bg-primary'>
            <h1><i className={props.icon}></i> {props.title}</h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    )
}


// default props
NavBar.defaultProps = {
  title: 'GitHub Finder',
  icon: 'fab fa-github'  
}

// propTypes
NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default NavBar