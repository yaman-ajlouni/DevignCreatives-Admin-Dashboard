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
            <div className="extra-work-header">
                <div className="extra-work-header-content">
                    <div className="extra-work-header-title">
                        <div className="extra-work-title-text">
                            <h1>Extra Work Management</h1>
                            <p>Review and manage additional work requests from clients</p>
                        </div>
                    </div>
                    <div className="extra-work-header-actions">
                        <button className="btn btn-secondary">
                            <FileText size={20} />
                            Export Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="extra-work-stats-summary">
                <div className="extra-work-stat-item">
                    <div className="extra-work-stat-icon pending">
                        <Clock size={16} />
                    </div>
                    <div className="extra-work-stat-info">
                        <span className="extra-work-stat-number">{statusCounts.pending}</span>
                        <span className="extra-work-stat-label">Pending Requests</span>
                    </div>
                </div>
                <div className="extra-work-stat-item">
                    <div className="extra-work-stat-icon accepted">
                        <CheckCircle size={16} />
                    </div>
                    <div className="extra-work-stat-info">
                        <span className="extra-work-stat-number">{statusCounts.accepted}</span>
                        <span className="extra-work-stat-label">Accepted</span>
                    </div>
                </div>
                <div className="extra-work-stat-item">
                    <div className="extra-work-stat-icon completed">
                        <Check size={16} />
                    </div>
                    <div className="extra-work-stat-info">
                        <span className="extra-work-stat-number">{statusCounts.completed}</span>
                        <span className="extra-work-stat-label">Completed</span>
                    </div>
                </div>
                <div className="extra-work-stat-item">
                    <div className="extra-work-stat-icon rejected">
                        <X size={16} />
                    </div>
                    <div className="extra-work-stat-info">
                        <span className="extra-work-stat-number">{statusCounts.rejected}</span>
                        <span className="extra-work-stat-label">Rejected</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="extra-work-controls-section">
                <div className="extra-work-search-filters">
                    <div className="extra-work-search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search requests, clients, or projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="extra-work-filter-dropdown">
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

                <div className="extra-work-sort-controls">
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
                        className={`extra-work-sort-order ${sortOrder}`}
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="extra-work-requests-table-container">
                <div className="extra-work-table-wrapper">
                    <table className="extra-work-requests-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('clientName')} className={sortBy === 'clientName' ? 'active' : ''}>
                                    <div className="extra-work-th-content">
                                        <User size={16} />
                                        <span>Client</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('title')} className={sortBy === 'title' ? 'active' : ''}>
                                    <div className="extra-work-th-content">
                                        <Briefcase size={16} />
                                        <span>Request Details</span>
                                    </div>
                                </th>
                                <th>Proposed Terms</th>
                                <th>Admin Requirements</th>
                                <th onClick={() => handleSort('priority')} className={sortBy === 'priority' ? 'active' : ''}>
                                    <div className="extra-work-th-content">
                                        <AlertCircle size={16} />
                                        <span>Priority</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('status')} className={sortBy === 'status' ? 'active' : ''}>
                                    <div className="extra-work-th-content">
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedRequests.map(request => (
                                <tr key={request.id} className="extra-work-request-row">
                                    <td className="extra-work-client-info">
                                        <div className="extra-work-client-avatar">
                                            {request.clientName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="extra-work-client-details">
                                            <div className="extra-work-client-name">{request.clientName}</div>
                                            <div className="extra-work-client-company">{request.company}</div>
                                            <div className="extra-work-project-name">
                                                <Briefcase size={12} />
                                                {request.projectName}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="extra-work-request-details">
                                        <div className="extra-work-request-title">{request.title}</div>
                                        <div className="extra-work-request-description">
                                            {request.description.length > 100
                                                ? `${request.description.substring(0, 100)}...`
                                                : request.description
                                            }
                                        </div>
                                        <div className="extra-work-request-meta">
                                            <span className="extra-work-category">{request.category}</span>
                                            <span className="extra-work-estimated-hours">{request.estimatedHours}h</span>
                                            <span className="extra-work-submission-date">
                                                <Calendar size={12} />
                                                {formatDate(request.submissionDate)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="extra-work-proposed-terms">
                                        <div className="extra-work-term-item">
                                            <DollarSign size={14} />
                                            <span>{request.clientProposedMoney}</span>
                                        </div>
                                        <div className="extra-work-term-item">
                                            <Clock size={14} />
                                            <span>{request.clientProposedTime}</span>
                                        </div>
                                        <div className="extra-work-complexity">
                                            Complexity: {request.complexity}
                                        </div>
                                    </td>
                                    <td className="extra-work-admin-requirements">
                                        {request.adminRequiredMoney && request.adminRequiredTime ? (
                                            <>
                                                <div className="extra-work-term-item">
                                                    <DollarSign size={14} />
                                                    <span>{request.adminRequiredMoney}</span>
                                                </div>
                                                <div className="extra-work-term-item">
                                                    <Clock size={14} />
                                                    <span>{request.adminRequiredTime}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="extra-work-not-set">Not set</span>
                                        )}
                                    </td>
                                    <td className="extra-work-priority-info">
                                        <span className={`extra-work-priority ${getPriorityClass(request.priority)}`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td className="extra-work-status-info">
                                        <div className={`extra-work-status ${getStatusClass(request.status)}`}>
                                            {getStatusIcon(request.status)}
                                            <span>{request.status}</span>
                                        </div>
                                    </td>
                                    <td className="extra-work-actions-info">
                                        <div className="extra-work-action-buttons">
                                            <button
                                                className="extra-work-action-btn view"
                                                title="View Details"
                                                onClick={() => handleViewRequest(request)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {request.status === 'Pending' && (
                                                <>
                                                    <button
                                                        className="extra-work-action-btn accept"
                                                        title="Accept Request"
                                                        onClick={() => handleAcceptRequest(request.id)}
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        className="extra-work-action-btn reject"
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
                <div className="extra-work-empty-state">
                    <div className="extra-work-empty-icon">
                        <Briefcase size={48} />
                    </div>
                    <h3>No extra work requests found</h3>
                    <p>Try adjusting your search criteria or check back later for new requests.</p>
                </div>
            )}

            {/* Request Details Modal */}
            {showRequestModal && selectedRequest && (
                <div className="extra-work-modal-overlay" onClick={() => setShowRequestModal(false)}>
                    <div className="extra-work-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="extra-work-modal-header">
                            <h2>{selectedRequest.title}</h2>
                            <button
                                className="extra-work-close-btn"
                                onClick={() => setShowRequestModal(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="extra-work-modal-body">
                            <div className="extra-work-request-full-details">
                                <div className="extra-work-detail-section">
                                    <h3>Client Information</h3>
                                    <p><strong>Name:</strong> {selectedRequest.clientName}</p>
                                    <p><strong>Company:</strong> {selectedRequest.company}</p>
                                    <p><strong>Email:</strong> {selectedRequest.clientEmail}</p>
                                    <p><strong>Project:</strong> {selectedRequest.projectName}</p>
                                </div>

                                <div className="extra-work-detail-section">
                                    <h3>Request Details</h3>
                                    <p><strong>Description:</strong></p>
                                    <p className="extra-work-description">{selectedRequest.description}</p>
                                    <p><strong>Category:</strong> {selectedRequest.category}</p>
                                    <p><strong>Estimated Hours:</strong> {selectedRequest.estimatedHours}</p>
                                    <p><strong>Complexity:</strong> {selectedRequest.complexity}</p>
                                    <p><strong>Priority:</strong> {selectedRequest.priority}</p>
                                </div>

                                <div className="extra-work-detail-section">
                                    <h3>Financial Terms</h3>
                                    <div className="extra-work-terms-comparison">
                                        <div className="extra-work-client-terms">
                                            <h4>Client Proposed</h4>
                                            <p><strong>Amount:</strong> {selectedRequest.clientProposedMoney}</p>
                                            <p><strong>Timeline:</strong> {selectedRequest.clientProposedTime}</p>
                                        </div>
                                        <div className="extra-work-admin-terms">
                                            <h4>Admin Requirements</h4>
                                            <p><strong>Amount:</strong> {selectedRequest.adminRequiredMoney || 'Not set'}</p>
                                            <p><strong>Timeline:</strong> {selectedRequest.adminRequiredTime || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedRequest.adminNotes && (
                                    <div className="extra-work-detail-section">
                                        <h3>Admin Notes</h3>
                                        <p className="extra-work-admin-notes">{selectedRequest.adminNotes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="extra-work-modal-footer">
                            <div className="extra-work-status-display">
                                <span className={`extra-work-status ${getStatusClass(selectedRequest.status)}`}>
                                    {getStatusIcon(selectedRequest.status)}
                                    {selectedRequest.status}
                                </span>
                            </div>
                            {selectedRequest.status === 'Pending' && (
                                <div className="extra-work-action-buttons">
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