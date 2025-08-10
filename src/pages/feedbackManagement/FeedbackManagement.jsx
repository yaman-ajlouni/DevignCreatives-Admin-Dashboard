import React, { useState } from 'react';
import {
    Search,
    Filter,
    Calendar,
    User,
    MessageSquare,
    Clock,
    Star,
    AlertCircle,
    CheckCircle,
    Eye
} from 'lucide-react';
import './FeedbackManagement.scss';

function FeedbackManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClient, setFilterClient] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [sortBy, setSortBy] = useState('dateSubmitted');
    const [sortOrder, setSortOrder] = useState('desc');

    // Sample feedback data
    const [feedbacks] = useState([
        {
            id: 1,
            clientName: 'John Doe',
            clientCompany: 'ShamSuperStore',
            subject: 'Mobile App Loading Issue',
            message: 'The mobile app takes too long to load on the product catalog page. Sometimes it times out completely.',
            dateSubmitted: '2025-08-05T10:30:00Z',
            projectName: 'ShamSuperStore E-commerce',
            status: 'pending',
            rating: null
        },
        {
            id: 2,
            clientName: 'Sarah Wilson',
            clientCompany: 'TechCorp',
            subject: 'Feature Request: Dark Mode',
            message: 'Could you please add a dark mode option to the website? Our team works late hours and would appreciate a darker theme.',
            dateSubmitted: '2025-08-07T16:45:00Z',
            projectName: 'TechCorp Corporate Website',
            status: 'reviewed',
            rating: null
        },
        {
            id: 3,
            clientName: 'Mike Johnson',
            clientCompany: 'Innovate Solutions',
            subject: 'Great Work on the Design!',
            message: 'I wanted to share positive feedback about the new app design. The user interface is intuitive and our team loves it.',
            dateSubmitted: '2025-08-04T11:20:00Z',
            projectName: 'Mobile App Design',
            status: 'resolved',
            rating: 5
        },
        {
            id: 4,
            clientName: 'Emma Davis',
            clientCompany: 'Davis Photography',
            subject: 'Image Upload Size Limit',
            message: 'The current image upload limit of 5MB is too small for our high-resolution photos. Could this be increased?',
            dateSubmitted: '2025-07-28T09:15:00Z',
            projectName: 'Portfolio Website',
            status: 'resolved',
            rating: 5
        },
        {
            id: 5,
            clientName: 'John Doe',
            clientCompany: 'ShamSuperStore',
            subject: 'Payment Gateway Issue',
            message: 'Customers are reporting failed payments even though their cards are valid. This needs urgent attention.',
            dateSubmitted: '2025-08-08T08:00:00Z',
            projectName: 'ShamSuperStore E-commerce',
            status: 'pending',
            rating: null
        },
        {
            id: 6,
            clientName: 'Alex Thompson',
            clientCompany: 'Thompson Startup',
            subject: 'Project Feedback',
            message: 'Although we had to cancel our project, I wanted to provide feedback on the initial work. The team was professional.',
            dateSubmitted: '2025-07-25T14:30:00Z',
            projectName: 'Brand Identity Package',
            status: 'resolved',
            rating: 4
        }
    ]);

    // Get unique clients for filter
    const clients = [...new Set(feedbacks.map(f => f.clientName))];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} style={{ color: '#f97316' }} />;
            case 'reviewed': return <Eye size={16} style={{ color: '#3b82f6' }} />;
            case 'resolved': return <CheckCircle size={16} style={{ color: '#22c55e' }} />;
            default: return <AlertCircle size={16} style={{ color: '#6b7280' }} />;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending': return 'pending';
            case 'reviewed': return 'reviewed';
            case 'resolved': return 'resolved';
            default: return 'pending';
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

    const getDateFilter = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) return 'week';
        if (diffDays <= 30) return 'month';
        return 'older';
    };

    const filteredAndSortedFeedbacks = feedbacks
        .filter(feedback => {
            const matchesSearch =
                feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.message.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesClient = filterClient === 'all' || feedback.clientName === filterClient;

            const matchesDate = filterDate === 'all' || getDateFilter(feedback.dateSubmitted) === filterDate;

            return matchesSearch && matchesClient && matchesDate;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'dateSubmitted') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const statusCounts = {
        all: feedbacks.length,
        pending: feedbacks.filter(f => f.status === 'pending').length,
        reviewed: feedbacks.filter(f => f.status === 'reviewed').length,
        resolved: feedbacks.filter(f => f.status === 'resolved').length
    };

    return (
        <div className="feedback-management">
            <div className="feedback-header">
                <div className="header-content">
                    <h1>Feedback Management</h1>
                    <p>View and manage client feedback and suggestions</p>
                </div>
                <div className="header-stats">
                    <div className="stat-badge pending">
                        <Clock size={16} />
                        <span>{statusCounts.pending} Pending</span>
                    </div>
                    <div className="stat-badge total">
                        <MessageSquare size={16} />
                        <span>{statusCounts.all} Total</span>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="feedback-search-filters">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-dropdown">
                        <User size={16} />
                        <select
                            value={filterClient}
                            onChange={(e) => setFilterClient(e.target.value)}
                        >
                            <option value="all">All Clients</option>
                            {clients.map(client => (
                                <option key={client} value={client}>{client}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-dropdown">
                        <Calendar size={16} />
                        <select
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="week">Past Week</option>
                            <option value="month">Past Month</option>
                            <option value="older">Older</option>
                        </select>
                    </div>
                </div>

                <div className="sort-controls">
                    <span>Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="dateSubmitted">Date</option>
                        <option value="clientName">Client</option>
                        <option value="subject">Subject</option>
                        <option value="status">Status</option>
                    </select>
                    <button
                        className={`sort-order ${sortOrder}`}
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            <div className="feedback-list">
                {filteredAndSortedFeedbacks.length > 0 ? (
                    filteredAndSortedFeedbacks.map(feedback => (
                        <div key={feedback.id} className="feedback-card">
                            <div className="feedback-header">
                                <div className="feedback-client">
                                    <div className="client-avatar">
                                        {feedback.clientName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="client-info">
                                        <div className="client-name">{feedback.clientName}</div>
                                        <div className="client-company">{feedback.clientCompany}</div>
                                    </div>
                                </div>
                                <div className="feedback-meta">
                                    <div className="feedback-date">
                                        <Calendar size={14} />
                                        <span>{formatDate(feedback.dateSubmitted)}</span>
                                    </div>
                                    <div className={`feedback-status ${getStatusClass(feedback.status)}`}>
                                        {getStatusIcon(feedback.status)}
                                        <span>{feedback.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="feedback-content">
                                <h3 className="feedback-subject">{feedback.subject}</h3>
                                <p className="feedback-message">{feedback.message}</p>
                                <div className="feedback-project">
                                    <span>Project: {feedback.projectName}</span>
                                </div>
                            </div>

                            {feedback.rating && (
                                <div className="feedback-rating">
                                    <span>Rating:</span>
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < feedback.rating ? '#f97316' : 'none'}
                                                color="#f97316"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <MessageSquare size={48} />
                        </div>
                        <h3>No feedback found</h3>
                        <p>Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeedbackManagement;