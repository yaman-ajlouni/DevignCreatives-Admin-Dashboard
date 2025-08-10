import React from 'react';
import { LogOut } from 'lucide-react';
import logo from '../../assets/images/devigncreatives-logo.png';
import './Navbar.scss';

function Navbar({ toggleSidebar }) {
    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logout clicked');
    };

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
                        <span className="stat-label">Unread Conversations</span>
                    </div>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    <LogOut className="logout-icon" size={20} />
                    <span className="logout-text">Logout</span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;