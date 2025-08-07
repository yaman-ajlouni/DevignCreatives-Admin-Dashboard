import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderOpen,
    Users,
    MessageSquare,
    Images,
    Bell,
    BarChart3,
    UserCog,
    Settings,
    LogOut,
    X,
    Zap,
    TrendingUp
} from 'lucide-react';
import './Sidebar.scss';

function Sidebar({ isOpen, toggleSidebar }) {
    const menuItems = [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            path: '/projects',
            name: 'Projects Management',
            icon: FolderOpen
        },
        {
            path: '/clients',
            name: 'Clients Management',
            icon: Users
        },
        {
            path: '/feedback',
            name: 'Feedback Management',
            icon: MessageSquare
        },
        {
            path: '/images',
            name: 'Images Management',
            icon: Images
        },
        {
            path: '/notifications',
            name: 'Notifications',
            icon: Bell
        },
        {
            path: '/extra-work',
            name: 'Extra Work Requests',
            icon: Zap
        },
        {
            path: '/analytics',
            name: 'Analytics & Reports',
            icon: BarChart3
        },
        {
            path: '/users',
            name: 'User Management',
            icon: UserCog
        },
        {
            path: '/settings',
            name: 'Settings',
            icon: Settings
        }
    ];

    const handleLogout = () => {
        console.log('Logout clicked');
        // Add logout functionality here
        // - Clear authentication tokens
        // - Redirect to login page
        // - Clear session data
    };

    // Handle body scroll prevention on mobile
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;

            if (isOpen && isMobile) {
                const scrollY = window.scrollY;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollY}px`;
                document.body.style.width = '100%';
                document.body.classList.add('sidebar-open');
            } else {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.classList.remove('sidebar-open');

                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.classList.remove('sidebar-open');
            window.removeEventListener('resize', handleResize);

            const scrollY = document.body.style.top;
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay for mobile */}
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-content">
                    {/* Header with close button (mobile only) */}
                    <div className="sidebar-header">
                        <button className="sidebar-close" onClick={toggleSidebar}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="sidebar-nav">
                        <ul className="nav-list">
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <li key={index} className="nav-item">
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `nav-link ${isActive ? 'active' : ''}`
                                            }
                                            onClick={() => window.innerWidth <= 768 && toggleSidebar()}
                                        >
                                            <span className="nav-icon">
                                                <IconComponent size={20} />
                                            </span>
                                            <span className="nav-text">{item.name}</span>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="sidebar-footer">
                        <div className="logout-section">
                            <button className="logout-btn" onClick={handleLogout}>
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;