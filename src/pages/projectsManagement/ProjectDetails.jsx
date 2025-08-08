import React from 'react';
import {
    X,
    User,
    Calendar,
    DollarSign,
    Target,
    MessageCircle,
    Zap,
    CheckCircle,
    Clock,
    AlertCircle,
    Edit,
    Mail,
    Settings,
    ExternalLink
} from 'lucide-react';
import './ProjectDetails.scss';

function ProjectDetails({ project, onClose, onEdit, onManageMilestones }) {
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'completed';
            case 'in progress': return 'in-progress';
            case 'on hold': return 'on-hold';
            case 'canceled': return 'canceled';
            default: return 'pending';
        }
    };

    const getMilestoneStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'completed';
            case 'in-progress': return 'in-progress';
            case 'on-hold': return 'on-hold';
            case 'canceled': return 'canceled';
            default: return 'pending';
        }
    };

    const getMilestoneIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return <CheckCircle size={16} />;
            case 'in-progress': return <Clock size={16} />;
            case 'on-hold': return <AlertCircle size={16} />;
            case 'canceled': return <X size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const handleExtraWorkClick = () => {
        // Navigate to extra-work path
        if (window.location.pathname.includes('/projects')) {
            window.location.href = '/extra-work';
        } else {
            // If using React Router, you would use navigate('/extra-work') here
            console.log('Navigate to /extra-work');
        }
    };

    const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
    const overdueMilestones = project.milestones.filter(m =>
        m.status !== 'completed' &&
        m.status !== 'canceled' &&
        m.dueDate &&
        new Date(m.dueDate) < new Date()
    );

    return (
        <div className="project-details-overlay">
            <div className="project-details-modal">
                {/* Header */}
                <div className="modal-header">
                    <div className="header-content">
                        <div className="header-title">
                            <h1>{project.name}</h1>
                            <div className="header-meta">
                                <div className={`status ${getStatusClass(project.status)}`}>
                                    {project.status}
                                </div>
                                <div className="project-category">
                                    {project.category}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="modal-content">
                    {/* Project Overview */}
                    <div className="overview-section">
                        <div className="overview-grid">
                            <div className="overview-card client-card">
                                <div className="card-header">
                                    <User size={20} />
                                    <h3>Client Information</h3>
                                </div>
                                <div className="card-content">
                                    <div className="client-details">
                                        <h4>{project.client}</h4>
                                        <div className="contact-info">
                                            <div className="contact-item">
                                                <Mail size={16} />
                                                <span>{project.clientEmail}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overview-card dates-card">
                                <div className="card-header">
                                    <Calendar size={20} />
                                    <h3>Timeline</h3>
                                </div>
                                <div className="card-content">
                                    <div className="date-info">
                                        <div className="date-item">
                                            <span className="date-label">Started:</span>
                                            <span>{new Date(project.startDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="date-item">
                                            <span className="date-label">Due:</span>
                                            <span className={new Date(project.dueDate) < new Date() && project.status !== 'completed' ? 'overdue' : ''}>
                                                {new Date(project.dueDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        {project.endDate && (
                                            <div className="date-item">
                                                <span className="date-label">Completed:</span>
                                                <span>{new Date(project.endDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="overview-card budget-card">
                                <div className="card-header">
                                    <DollarSign size={20} />
                                    <h3>Budget</h3>
                                </div>
                                <div className="card-content">
                                    <div className="budget-amount">{project.budget}</div>
                                    <div className="budget-label">Total Project Value</div>
                                </div>
                            </div>

                            <div className="overview-card progress-card">
                                <div className="card-header">
                                    <Target size={20} />
                                    <h3>Progress</h3>
                                </div>
                                <div className="card-content">
                                    <div className="progress-circle" style={{ '--progress': project.progress }}>
                                        <div className="progress-value">{project.progress}%</div>
                                    </div>
                                    <div className="progress-label">Complete</div>
                                    {overdueMilestones.length > 0 && (
                                        <div className="progress-warning">
                                            <AlertCircle size={14} />
                                            <span>{overdueMilestones.length} overdue</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Description */}
                    <div className="description-section">
                        <h3>Project Description</h3>
                        <p>{project.description}</p>
                        {project.tags && project.tags.length > 0 && (
                            <div className="tags-container">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Milestones */}
                    <div className="milestones-section">
                        <div className="section-header">
                            <div className="section-title">
                                <h3>Milestones ({completedMilestones}/{project.milestones.length})</h3>
                                {overdueMilestones.length > 0 && (
                                    <div className="overdue-badge">
                                        <AlertCircle size={14} />
                                        <span>{overdueMilestones.length} overdue</span>
                                    </div>
                                )}
                            </div>
                            <div className="milestone-actions">
                                <div className="milestone-progress">
                                    <div className="milestone-progress-bar">
                                        <div
                                            className="milestone-progress-fill"
                                            style={{ width: `${(completedMilestones / project.milestones.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <button
                                    className="manage-milestones-btn"
                                    onClick={() => onManageMilestones && onManageMilestones(project)}
                                >
                                    <Settings size={14} />
                                    <span>Manage</span>
                                </button>
                            </div>
                        </div>
                        <div className="milestones-list">
                            {project.milestones.map((milestone, index) => (
                                <div key={index} className={`milestone-item ${getMilestoneStatusClass(milestone.status)}`}>
                                    <div className="milestone-icon">
                                        {getMilestoneIcon(milestone.status)}
                                    </div>
                                    <div className="milestone-content">
                                        <div className="milestone-header">
                                            <h4>{milestone.name}</h4>
                                            <span className={`milestone-status ${getMilestoneStatusClass(milestone.status)}`}>
                                                {milestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                        </div>
                                        <div className="milestone-meta">
                                            <span className="milestone-date">
                                                <Calendar size={12} />
                                                Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            {milestone.dueDate && new Date(milestone.dueDate) < new Date() &&
                                                milestone.status !== 'completed' && milestone.status !== 'canceled' && (
                                                    <span className="overdue-indicator">
                                                        <AlertCircle size={12} />
                                                        Overdue
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Indicators */}
                    <div className="activity-section">
                        <h3>Project Activity</h3>
                        <div className="activity-indicators">
                            <div className={`activity-card ${project.hasChat ? 'active' : 'inactive'}`}>
                                <div className="activity-icon">
                                    <MessageCircle size={24} />
                                </div>
                                <div className="activity-content">
                                    <h4>Client Communication</h4>
                                    <p>{project.hasChat ? 'Active conversation with client' : 'No active chat with client'}</p>
                                </div>
                                {project.hasChat && (
                                    <button className="activity-action">
                                        <span>View Chat</span>
                                        <ExternalLink size={14} />
                                    </button>
                                )}
                            </div>

                            <div
                                className={`activity-card ${project.extraWorkCount > 0 ? 'active' : 'inactive'} ${project.extraWorkCount > 0 ? 'clickable' : ''}`}
                                onClick={project.extraWorkCount > 0 ? handleExtraWorkClick : undefined}
                                style={project.extraWorkCount > 0 ? { cursor: 'pointer' } : {}}
                            >
                                <div className="activity-icon">
                                    <Zap size={24} />
                                </div>
                                <div className="activity-content">
                                    <h4>Extra Work Requests</h4>
                                    <p>
                                        {project.extraWorkCount > 0
                                            ? `${project.extraWorkCount} additional work request${project.extraWorkCount > 1 ? 's' : ''}`
                                            : 'No additional work requests'
                                        }
                                    </p>
                                </div>
                                {project.extraWorkCount > 0 && (
                                    <button className="activity-action">
                                        <span>View Details</span>
                                        <ExternalLink size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <div className="footer-info">
                        <div className="project-stats">
                            <span>Created: {new Date(project.startDate).toLocaleDateString()}</span>
                            {project.endDate && (
                                <span>Completed: {new Date(project.endDate).toLocaleDateString()}</span>
                            )}
                        </div>
                    </div>
                    <div className="footer-actions">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={() => onEdit && onEdit(project)}>
                            <Edit size={16} />
                            Edit Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;