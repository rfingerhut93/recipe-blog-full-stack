// MenuItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ user, handleLogout, handleRedirect, isOpen }) => {
    return (
        <ul className={isOpen ? 'show' : ''}>
            <li className="nav-link">
                <Link className="link" to='/'>All Recipes</Link>
            </li>
            {user && (
                <li className="nav-link">
                    <Link className="link" to="/add-new-recipe">Add A Recipe</Link>
                </li>
            )}
            <li className="nav-link">
                {user ? (
                    <Link className="link" to="/" onClick={handleLogout}>Log Out</Link>
                ) : (
                    <Link className="link" to="/log-in" onClick={handleRedirect}>Log In</Link>
                )}
            </li>
        </ul>
    );
}

export default MenuItem;
