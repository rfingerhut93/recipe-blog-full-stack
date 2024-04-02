// HamburgerMenu.js

import React from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ isOpen }) => {
    return (
        <>
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                <div className="burger burger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>
        </>
    );
};

export default HamburgerMenu;
