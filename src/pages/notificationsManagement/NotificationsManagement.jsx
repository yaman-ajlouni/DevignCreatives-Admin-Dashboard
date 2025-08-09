import React, { useState, useEffect } from 'react';
import {
    Search,
    Bell,
    Send,
    Clock,
    User,
    Calendar,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    Filter,
    Plus,
    X,
    Trash2
} from 'lucide-react';
import './NotificationsManagement.scss';

function NotificationsManagement() {
    const [activeTab, setActiveTab] = useState('received'); // received, send
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showSendModal, setShowSendModal] = useState(false);
    const [selectedClients, setSelectedClients] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationSubject, setNotificationSubject] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Sample clients data
    const [clients] = useState([
        { id: 1, name: 'John Doe', company: 'ShamSuperStore', avatar: 'JD' },
        { id: 2, name: 'Sarah Wilson', company: 'TechCorp', avatar: 'SW' },
        { id: 3, name: 'Mike Johnson', company: 'Innovate Solutions', avatar: 'MJ' },
        { id: 4, name: 'Emma Davis', company: 'Davis Photography', avatar: 'ED' }
    ]);

    // Sample received notifications (sorted by date, newest first)
    const [receivedNotifications] = useState([
        {
            id: 1,
            type: 'feedback',
            title: 'New Feedback Received',
            message: 'John Doe from ShamSuperStore has submitted feedback about the mobile app loading issue.',
            clientName: 'John Doe',
            clientCompany: 'ShamSuperStore',
            projectName: 'ShamSuperStore E-commerce',
            date: '2025-08-09T10:30:00Z',
            priority: 'medium'
        },
        {
            id: 2,
            type: 'deadline',
            title: 'Project Deadline Approaching',
            message: 'TechCorp Corporate Website project is due in 3 days. Please review the final deliverables.',
            clientName: 'Sarah Wilson',
            clientCompany: 'TechCorp',
            projectName: 'TechCorp Corporate Website',
            date: '2025-08-08T14:20:00Z',
            priority: 'high'
        },
        {
            id: 3,
            type: 'extra_work',
            title: 'Extra Work Request',
            message: 'Mike Johnson has requested additional features for the mobile app design including dark mode and advanced analytics.',
            clientName: 'Mike Johnson',
            clientCompany: 'Innovate Solutions',
            projectName: 'Mobile App Design',
            date: '2025-08-07T16:45:00Z',
            priority: 'medium'
        },
        {
            id: 4,
            type: 'meeting',
            title: 'Meeting Request',
            message: 'Sarah Wilson has requested a meeting to discuss the next phase of the TechCorp project.',
            clientName: 'Sarah Wilson',
            clientCompany: 'TechCorp',
            projectName: 'TechCorp Corporate Website',
            date: '2025-08-06T11:30:00Z',
            priority: 'medium'
        },
        {
            id: 5,
            type: 'payment',
            title: 'Payment Received',
            message: 'Payment for the Portfolio Website project has been successfully received from Emma Davis.',
            clientName: 'Emma Davis',
            clientCompany: 'Davis Photography',
            projectName: 'Portfolio Website',
            date: '2025-08-05T09:15:00Z',
            priority: 'low'
        },
        {
            id: 6,
            type: 'extra_work',
            title: 'Additional Design Request',
            message: 'John Doe has requested extra pages for the e-commerce website including a blog section.',
            clientName: 'John Doe',
            clientCompany: 'ShamSuperStore',
            projectName: 'ShamSuperStore E-commerce',
            date: '2025-08-04T13:20:00Z',
            priority: 'low'
        },
        {
            id: 7,
            type: 'feedback',
            title: 'Project Review Feedback',
            message: 'Mike Johnson has provided detailed feedback on the mobile app wireframes and user interface.',
            clientName: 'Mike Johnson',
            clientCompany: 'Innovate Solutions',
            projectName: 'Mobile App Design',
            date: '2025-08-03T10:45:00Z',
            priority: 'medium'
        },
        {
            id: 8,
            type: 'deadline',
            title: 'Milestone Deadline Alert',
            message: 'Design phase deadline for Innovate Solutions mobile app is approaching in 2 days.',
            clientName: 'Mike Johnson',
            clientCompany: 'Innovate Solutions',
            projectName: 'Mobile App Design',
            date: '2025-08-02T08:30:00Z',
            priority: 'high'
        },
        {
            id: 9,
            type: 'payment',
            title: 'Payment Reminder Sent',
            message: 'Payment reminder has been automatically sent to TechCorp for the corporate website project.',
            clientName: 'Sarah Wilson',
            clientCompany: 'TechCorp',
            projectName: 'TechCorp Corporate Website',
            date: '2025-08-01T14:15:00Z',
            priority: 'low'
        },
        {
            id: 10,
            type: 'meeting',
            title: 'Project Kickoff Meeting',
            message: 'Emma Davis has scheduled a project kickoff meeting for the new photography portfolio website.',
            clientName: 'Emma Davis',
            clientCompany: 'Davis Photography',
            projectName: 'Portfolio Website',
            date: '2025-07-31T11:00:00Z',
            priority: 'medium'
        },
        {
            id: 11,
            type: 'feedback',
            title: 'Positive Project Feedback',
            message: 'Emma Davis has expressed satisfaction with the portfolio website design and development progress.',
            clientName: 'Emma Davis',
            clientCompany: 'Davis Photography',
            projectName: 'Portfolio Website',
            date: '2025-07-30T16:20:00Z',
            priority: 'low'
        },
        {
            id: 12,
            type: 'extra_work',
            title: 'SEO Optimization Request',
            message: 'Sarah Wilson has requested additional SEO optimization services for the TechCorp website.',
            clientName: 'Sarah Wilson',
            clientCompany: 'TechCorp',
            projectName: 'TechCorp Corporate Website',
            date: '2025-07-29T09:45:00Z',
            priority: 'medium'
        }
    ]);

    // Sample sent notifications
    const [sentNotifications] = useState([
        {
            id: 1,
            subject: 'Project Update - Design Phase Complete',
            message: 'Hello! I wanted to update you that the design phase for your e-commerce project has been completed. Please review the mockups in your project dashboard.',
            recipients: ['John Doe'],
            dateSent: '2025-08-08T13:20:00Z',
            status: 'sent'
        },
        {
            id: 2,
            subject: 'Payment Reminder',
            message: 'This is a friendly reminder that the invoice for the mobile app design project is due in 5 days.',
            recipients: ['Mike Johnson'],
            dateSent: '2025-08-07T10:15:00Z',
            status: 'sent'
        }
    ]);

    const handleClientSelect = (clientId) => {
        if (selectedClients.includes(clientId)) {
            setSelectedClients(selectedClients.filter(id => id !== clientId));
        } else {
            setSelectedClients([...selectedClients, clientId]);
        }
    };

    const handleSendNotification = () => {
        if (selectedClients.length > 0 && notificationSubject && notificationMessage) {
            // Handle sending notification logic here
            console.log('Sending notification:', {
                subject: notificationSubject,
                message: notificationMessage,
                recipients: selectedClients
            });

            // Reset form
            setSelectedClients([]);
            setNotificationSubject('');
            setNotificationMessage('');
            setShowSendModal(false);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'feedback': return <MessageSquare size={16} />;
            case 'deadline': return <Clock size={16} />;
            case 'extra_work': return <Plus size={16} />;
            case 'payment': return <CheckCircle size={16} />;
            case 'meeting': return <Calendar size={16} />;
            default: return <Bell size={16} />;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'feedback': return '#3b82f6';
            case 'deadline': return '#f97316';
            case 'extra_work': return '#8b5cf6';
            case 'payment': return '#22c55e';
            case 'meeting': return '#06b6d4';
            default: return '#6b7280';
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return 'high';
            case 'medium': return 'medium';
            case 'low': return 'low';
            default: return 'medium';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredNotifications = receivedNotifications.filter(notification => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.clientName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || notification.type === filterType;

        return matchesSearch && matchesType;
    });

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType]);

    // Pagination logic
    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getNotificationStats = () => {
        const total = receivedNotifications.length;
        const high = receivedNotifications.filter(n => n.priority === 'high').length;
        const today = new Date().toDateString();
        const recent = receivedNotifications.filter(n =>
            new Date(n.date).toDateString() === today
        ).length;

        return { total, high, recent };
    };

    const stats = getNotificationStats();

    return (
        <div className="notifications-management">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1>Notifications Management</h1>
                    <p>Send notifications to clients and manage received alerts</p>
                </div>
                <div className="header-stats">
                    <div className="stat-badge recent">
                        <Bell size={16} />
                        <span>{stats.recent} Today</span>
                    </div>
                    <div className="stat-badge high">
                        <AlertCircle size={16} />
                        <span>{stats.high} High Priority</span>
                    </div>
                    <div className="stat-badge total">
                        <MessageSquare size={16} />
                        <span>{stats.total} Total</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-section">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'received' ? 'active' : ''}`}
                        onClick={() => setActiveTab('received')}
                    >
                        <Bell size={16} />
                        My Notifications ({stats.total})
                    </button>
                    <button
                        className={`tab ${activeTab === 'send' ? 'active' : ''}`}
                        onClick={() => setActiveTab('send')}
                    >
                        <Send size={16} />
                        Send Notifications
                    </button>
                </div>

                {activeTab === 'send' && (
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowSendModal(true)}
                    >
                        <Plus size={16} />
                        New Notification
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div className="content-area">
                {/* Received Notifications Tab */}
                {activeTab === 'received' && (
                    <>
                        {/* Controls */}
                        <div className="controls-section">
                            <div className="search-filters">
                                <div className="search-box">
                                    <Search size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search notifications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="filter-dropdown">
                                    <Filter size={16} />
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        <option value="all">All Types</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="deadline">Deadlines</option>
                                        <option value="extra_work">Extra Work</option>
                                        <option value="payment">Payments</option>
                                        <option value="meeting">Meetings</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="notifications-list">
                            {currentNotifications.length > 0 ? (
                                <>
                                    <div className="list-info">
                                        <span>
                                            Showing {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length} notifications
                                        </span>
                                    </div>

                                    {currentNotifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`notification-card ${getPriorityClass(notification.priority)}`}
                                        >
                                            <div className="notification-icon" style={{ color: getNotificationColor(notification.type) }}>
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-header">
                                                    <h3>{notification.title}</h3>
                                                    <div className="notification-meta">
                                                        <span className={`priority ${notification.priority}`}>
                                                            {notification.priority}
                                                        </span>
                                                        <span className="date">{formatDate(notification.date)}</span>
                                                    </div>
                                                </div>
                                                <p className="notification-message">{notification.message}</p>
                                                <div className="notification-details">
                                                    <div className="client-info">
                                                        <User size={14} />
                                                        <span>{notification.clientName} • {notification.clientCompany}</span>
                                                    </div>
                                                    <div className="project-info">
                                                        <span>Project: {notification.projectName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="notification-actions">
                                                <button className="action-btn delete" title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="pagination">
                                            <button
                                                className="page-btn prev"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>

                                            <div className="page-numbers">
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <button
                                                        key={index + 1}
                                                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                                                        onClick={() => handlePageChange(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                className="page-btn next"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <Bell size={48} />
                                    </div>
                                    <h3>No notifications found</h3>
                                    <p>Try adjusting your search or filter criteria.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Send Notifications Tab */}
                {activeTab === 'send' && (
                    <div className="send-section">
                        {/* Sent Notifications History */}
                        <div className="sent-history">
                            <h3>Recent Sent Notifications</h3>
                            <div className="sent-list">
                                {sentNotifications.map(notification => (
                                    <div key={notification.id} className="sent-card">
                                        <div className="sent-content">
                                            <h4>{notification.subject}</h4>
                                            <p>{notification.message}</p>
                                            <div className="sent-meta">
                                                <span>To: {notification.recipients.join(', ')}</span>
                                                <span>{formatDate(notification.dateSent)}</span>
                                            </div>
                                        </div>
                                        <div className="sent-status">
                                            <CheckCircle size={16} />
                                            <span>Sent</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Send Notification Modal */}
            {showSendModal && (
                <div className="modal-overlay">
                    <div className="modal-content send-modal">
                        <div className="modal-header">
                            <h3>Send Notification</h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowSendModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Client Selection */}
                            <div className="form-section">
                                <label>Select Recipients</label>
                                <div className="clients-grid">
                                    {clients.map(client => (
                                        <div
                                            key={client.id}
                                            className={`client-option ${selectedClients.includes(client.id) ? 'selected' : ''}`}
                                            onClick={() => handleClientSelect(client.id)}
                                        >
                                            <div className="client-avatar">
                                                {client.avatar}
                                            </div>
                                            <div className="client-info">
                                                <span className="name">{client.name}</span>
                                                <span className="company">{client.company}</span>
                                            </div>
                                            {selectedClients.includes(client.id) && (
                                                <CheckCircle size={16} className="selected-icon" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="form-section">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    placeholder="Enter notification subject..."
                                    value={notificationSubject}
                                    onChange={(e) => setNotificationSubject(e.target.value)}
                                />
                            </div>

                            {/* Message */}
                            <div className="form-section">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    placeholder="Enter your message..."
                                    value={notificationMessage}
                                    onChange={(e) => setNotificationMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowSendModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSendNotification}
                                disabled={selectedClients.length === 0 || !notificationSubject || !notificationMessage}
                            >
                                <Send size={16} />
                                Send Notification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationsManagement;