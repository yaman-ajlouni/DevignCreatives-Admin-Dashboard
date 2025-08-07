import React from 'react';
import logo from '../../assets/images/devigncreatives-logo.png';
import './Navbar.scss';

function Navbar({ toggleSidebar }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <div className="logo-container">
                    <img src={logo} alt="Devign Creatives" className="logo" />
                </div>
            </div>

            <div className="navbar-right">
                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-number">24</span>
                        <span className="stat-label">Active Projects</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">8</span>
                        <span className="stat-label">Pending Reviews</span>
                    </div>
                </div>

                <div className="user-profile">
                    <div className="user-avatar">
                        <span>DC</span>
                    </div>
                    <div className="user-info">
                        <span className="user-name">Manager User</span>
                        <span className="user-role">Manager</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;