import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    Clock,
    DollarSign,
    Eye,
    Check,
    X,
    Edit,
    Calendar,
    User,
    Building,
    CheckCircle,
    AlertCircle,
    Briefcase,
    MessageCircle,
    FileText
} from 'lucide-react';
import './ExtraWorkManagement.scss';

function ExtraWorkManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('submissionDate');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);

    // Sample extra work requests data
    const [extraWorkRequests, setExtraWorkRequests] = useState([
        {
            id: 1,
            clientName: 'John Doe',
            clientEmail: 'john@shamsuperstore.com',
            company: 'ShamSuperStore',
            projectName: 'ShamSuperStore E-commerce',
            projectId: 1,
            title: 'Add Payment Gateway Integration',
            description: 'Need to integrate Stripe and PayPal payment gateways for international customers. This includes setting up webhooks and payment confirmation emails.',
            submissionDate: '2025-08-05',
            status: 'Pending',
            clientProposedMoney: '$2,500',
            clientProposedTime: '1 week',
            adminRequiredMoney: '',
            adminRequiredTime: '',
            priority: 'High',
            category: 'Development',
            estimatedHours: 20,
            complexity: 'Medium',
            adminNotes: ''
        },
        {
            id: 2,
            clientName: 'Sarah Wilson',
            clientEmail: 'sarah@techcorp.com',
            company: 'TechCorp',
            projectName: 'TechCorp Corporate Website',
            projectId: 2,
            title: 'Add Multi-language Support',
            description: 'The website needs to support Spanish and French languages. This includes translating all content and implementing language switcher.',
            submissionDate: '2025-08-03',
            status: 'Accepted',
            clientProposedMoney: '$1,800',
            clientProposedTime: '2 weeks',
            adminRequiredMoney: '$2,200',
            adminRequiredTime: '10 days',
            priority: 'Medium',
            category: 'Development',
            estimatedHours: 18,
            complexity: 'Medium',
            adminNotes: 'Accepted with adjusted pricing due to complexity of multilingual SEO setup.'
        },
        {
            id: 3,
            clientName: 'Mike Johnson',
            clientEmail: 'mike@innovate.com',
            company: 'Innovate Solutions',
            projectName: 'Mobile App Design',
            projectId: 3,
            title: 'Add Dark Mode Theme',
            description: 'Users are requesting a dark mode option for the mobile app. This should include all screens and maintain brand consistency.',
            submissionDate: '2025-08-07',
            status: 'Pending',
            clientProposedMoney: '$800',
            clientProposedTime: '3 days',
            adminRequiredMoney: '',
            adminRequiredTime: '',
            priority: 'Low',
            category: 'Design',
            estimatedHours: 12,
            complexity: 'Low',
            adminNotes: ''
        },
        {
            id: 4,
            clientName: 'Emma Davis',
            clientEmail: 'emma@photographer.com',
            company: 'Davis Photography',
            projectName: 'Portfolio Website',
            projectId: 4,
            title: 'Add Client Login Portal',
            description: 'Need a secure client portal where customers can view and download their photos after photo sessions.',
            submissionDate: '2025-07-28',
            status: 'Rejected',
            clientProposedMoney: '$1,200',
            clientProposedTime: '1 week',
            adminRequiredMoney: '$1,800',
            adminRequiredTime: '2 weeks',
            priority: 'Medium',
            category: 'Development',
            estimatedHours: 25,
            complexity: 'High',
            adminNotes: 'Client declined the adjusted pricing. May revisit in future.'
        },
        {
            id: 5,
            clientName: 'John Doe',
            clientEmail: 'john@shamsuperstore.com',
            company: 'ShamSuperStore',
            projectName: 'ShamSuperStore E-commerce',
            projectId: 1,
            title: 'Add Product Reviews System',
            description: 'Customers want to leave reviews and ratings for products. Include moderation features and email notifications.',
            submissionDate: '2025-07-30',
            status: 'Completed',
            clientProposedMoney: '$1,500',
            clientProposedTime: '1 week',
            adminRequiredMoney: '$1,500',
            adminRequiredTime: '5 days',
            priority: 'High',
            category: 'Development',
            estimatedHours: 16,
            complexity: 'Medium',
            adminNotes: 'Completed successfully. Client very satisfied with the implementation.'
        }
    ]);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'pending';
            case 'accepted': return 'accepted';
            case 'rejected': return 'rejected';
            case 'completed': return 'completed';
            default: return 'pending';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock size={14} />;
            case 'accepted': return <CheckCircle size={14} />;
            case 'rejected': return <X size={14} />;
            case 'completed': return <Check size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'high';
            case 'medium': return 'medium';
            case 'low': return 'low';
            default: return 'medium';
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleViewRequest = (request) => {
        setSelectedRequest(request);
        setShowRequestModal(true);
    };

    const handleAcceptRequest = (requestId) => {
        const request = extraWorkRequests.find(r => r.id === requestId);
        if (request) {
            const adminMoney = prompt('Enter required amount ($):', request.clientProposedMoney.replace('$', ''));
            const adminTime = prompt('Enter required time:', request.clientProposedTime);

            if (adminMoney && adminTime) {
                setExtraWorkRequests(prev =>
                    prev.map(req =>
                        req.id === requestId
                            ? {
                                ...req,
                                status: 'Accepted',
                                adminRequiredMoney: `$${adminMoney}`,
                                adminRequiredTime: adminTime,
                                adminNotes: 'Request accepted with pricing adjustments.'
                            }
                            : req
                    )
                );
            }
        }
    };

    const handleRejectRequest = (requestId) => {
        const reason = prompt('Enter rejection reason (optional):');
        setExtraWorkRequests(prev =>
            prev.map(req =>
                req.id === requestId
                    ? {
                        ...req,
                        status: 'Rejected',
                        adminNotes: reason || 'Request rejected.'
                    }
                    : req
            )
        );
    };

    const filteredAndSortedRequests = extraWorkRequests
        .filter(request => {
            const matchesSearch =
                request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.projectName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'all' ||
                request.status.toLowerCase() === filterStatus;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'submissionDate') {
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
        all: extraWorkRequests.length,
        pending: extraWorkRequests.filter(r => r.status === 'Pending').length,
        accepted: extraWorkRequests.filter(r => r.status === 'Accepted').length,
        rejected: extraWorkRequests.filter(r => r.status === 'Rejected').length,
        completed: extraWorkRequests.filter(r => r.status === 'Completed').length
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="extra-work-management">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1>Extra Work Management</h1>
                    <p>Review and manage additional work requests from clients</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <FileText size={20} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
                <div className="stat-item">
                    <div className="stat-icon pending">
                        <Clock size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.pending}</span>
                        <span className="stat-label">Pending Requests</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon accepted">
                        <CheckCircle size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.accepted}</span>
                        <span className="stat-label">Accepted</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon completed">
                        <Check size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.completed}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
                {/* <div className="stat-item">
                    <div className="stat-icon revenue">
                        <DollarSign size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">
                            ${extraWorkRequests
                                .filter(r => r.status === 'Completed' || r.status === 'Accepted')
                                .reduce((total, request) => {
                                    const amount = request.adminRequiredMoney || request.clientProposedMoney;
                                    return total + parseFloat(amount.replace('$', '').replace(',', ''));
                                }, 0)
                                .toLocaleString()}
                        </span>
                        <span className="stat-label">Extra Revenue</span>
                    </div>
                </div> */}
            </div>

            {/* Controls */}
            <div className="controls-section">
                <div className="search-filters">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search requests, clients, or projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-dropdown">
                        <Filter size={16} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status ({statusCounts.all})</option>
                            <option value="pending">Pending ({statusCounts.pending})</option>
                            <option value="accepted">Accepted ({statusCounts.accepted})</option>
                            <option value="rejected">Rejected ({statusCounts.rejected})</option>
                            <option value="completed">Completed ({statusCounts.completed})</option>
                        </select>
                    </div>
                </div>

                <div className="sort-controls">
                    <span>Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="submissionDate">Date</option>
                        <option value="clientName">Client</option>
                        <option value="priority">Priority</option>
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

            {/* Requests Table */}
            <div className="requests-table-container">
                <div className="table-wrapper">
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('clientName')} className={sortBy === 'clientName' ? 'active' : ''}>
                                    <div className="th-content">
                                        <User size={16} />
                                        <span>Client</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('title')} className={sortBy === 'title' ? 'active' : ''}>
                                    <div className="th-content">
                                        <Briefcase size={16} />
                                        <span>Request Details</span>
                                    </div>
                                </th>
                                <th>Proposed Terms</th>
                                <th>Admin Requirements</th>
                                <th onClick={() => handleSort('priority')} className={sortBy === 'priority' ? 'active' : ''}>
                                    <div className="th-content">
                                        <AlertCircle size={16} />
                                        <span>Priority</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('status')} className={sortBy === 'status' ? 'active' : ''}>
                                    <div className="th-content">
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedRequests.map(request => (
                                <tr key={request.id} className="request-row">
                                    <td className="client-info">
                                        <div className="client-avatar">
                                            {request.clientName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="client-details">
                                            <div className="client-name">{request.clientName}</div>
                                            <div className="client-company">{request.company}</div>
                                            <div className="project-name">
                                                <Briefcase size={12} />
                                                {request.projectName}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="request-details">
                                        <div className="request-title">{request.title}</div>
                                        <div className="request-description">
                                            {request.description.length > 100
                                                ? `${request.description.substring(0, 100)}...`
                                                : request.description
                                            }
                                        </div>
                                        <div className="request-meta">
                                            <span className="category">{request.category}</span>
                                            <span className="estimated-hours">{request.estimatedHours}h</span>
                                            <span className="submission-date">
                                                <Calendar size={12} />
                                                {formatDate(request.submissionDate)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="proposed-terms">
                                        <div className="term-item">
                                            <DollarSign size={14} />
                                            <span>{request.clientProposedMoney}</span>
                                        </div>
                                        <div className="term-item">
                                            <Clock size={14} />
                                            <span>{request.clientProposedTime}</span>
                                        </div>
                                        <div className="complexity">
                                            Complexity: {request.complexity}
                                        </div>
                                    </td>
                                    <td className="admin-requirements">
                                        {request.adminRequiredMoney && request.adminRequiredTime ? (
                                            <>
                                                <div className="term-item">
                                                    <DollarSign size={14} />
                                                    <span>{request.adminRequiredMoney}</span>
                                                </div>
                                                <div className="term-item">
                                                    <Clock size={14} />
                                                    <span>{request.adminRequiredTime}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="not-set">Not set</span>
                                        )}
                                    </td>
                                    <td className="priority-info">
                                        <span className={`priority ${getPriorityClass(request.priority)}`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td className="status-info">
                                        <div className={`status ${getStatusClass(request.status)}`}>
                                            {getStatusIcon(request.status)}
                                            <span>{request.status}</span>
                                        </div>
                                    </td>
                                    <td className="actions-info">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn view"
                                                title="View Details"
                                                onClick={() => handleViewRequest(request)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {request.status === 'Pending' && (
                                                <>
                                                    <button
                                                        className="action-btn accept"
                                                        title="Accept Request"
                                                        onClick={() => handleAcceptRequest(request.id)}
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        className="action-btn reject"
                                                        title="Reject Request"
                                                        onClick={() => handleRejectRequest(request.id)}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedRequests.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">
                        <Briefcase size={48} />
                    </div>
                    <h3>No extra work requests found</h3>
                    <p>Try adjusting your search criteria or check back later for new requests.</p>
                </div>
            )}

            {/* Request Details Modal */}
            {showRequestModal && selectedRequest && (
                <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedRequest.title}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowRequestModal(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="request-full-details">
                                <div className="detail-section">
                                    <h3>Client Information</h3>
                                    <p><strong>Name:</strong> {selectedRequest.clientName}</p>
                                    <p><strong>Company:</strong> {selectedRequest.company}</p>
                                    <p><strong>Email:</strong> {selectedRequest.clientEmail}</p>
                                    <p><strong>Project:</strong> {selectedRequest.projectName}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>Request Details</h3>
                                    <p><strong>Description:</strong></p>
                                    <p className="description">{selectedRequest.description}</p>
                                    <p><strong>Category:</strong> {selectedRequest.category}</p>
                                    <p><strong>Estimated Hours:</strong> {selectedRequest.estimatedHours}</p>
                                    <p><strong>Complexity:</strong> {selectedRequest.complexity}</p>
                                    <p><strong>Priority:</strong> {selectedRequest.priority}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>Financial Terms</h3>
                                    <div className="terms-comparison">
                                        <div className="client-terms">
                                            <h4>Client Proposed</h4>
                                            <p><strong>Amount:</strong> {selectedRequest.clientProposedMoney}</p>
                                            <p><strong>Timeline:</strong> {selectedRequest.clientProposedTime}</p>
                                        </div>
                                        <div className="admin-terms">
                                            <h4>Admin Requirements</h4>
                                            <p><strong>Amount:</strong> {selectedRequest.adminRequiredMoney || 'Not set'}</p>
                                            <p><strong>Timeline:</strong> {selectedRequest.adminRequiredTime || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedRequest.adminNotes && (
                                    <div className="detail-section">
                                        <h3>Admin Notes</h3>
                                        <p className="admin-notes">{selectedRequest.adminNotes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="status-display">
                                <span className={`status ${getStatusClass(selectedRequest.status)}`}>
                                    {getStatusIcon(selectedRequest.status)}
                                    {selectedRequest.status}
                                </span>
                            </div>
                            {selectedRequest.status === 'Pending' && (
                                <div className="action-buttons">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            handleAcceptRequest(selectedRequest.id);
                                            setShowRequestModal(false);
                                        }}
                                    >
                                        <Check size={16} />
                                        Accept Request
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            handleRejectRequest(selectedRequest.id);
                                            setShowRequestModal(false);
                                        }}
                                    >
                                        <X size={16} />
                                        Reject Request
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExtraWorkManagement;