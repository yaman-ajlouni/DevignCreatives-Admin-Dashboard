import React, { useEffect, useState } from 'react';
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
    ExternalLink,
    ArrowLeft,
    Phone,
    MapPin
} from 'lucide-react';
import './ProjectDetails.scss';

function ProjectDetails({ project, onClose, onEdit, onManageMilestones }) {
    const [activeSection, setActiveSection] = useState('overview');
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('resize', checkMobileView);
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const getProjectStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'status-completed';
            case 'in progress': return 'status-in-progress';
            case 'on hold': return 'status-on-hold';
            case 'canceled': return 'status-canceled';
            default: return 'status-pending';
        }
    };

    const getMilestoneStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'milestone-completed';
            case 'in-progress': return 'milestone-in-progress';
            case 'on-hold': return 'milestone-on-hold';
            case 'canceled': return 'milestone-canceled';
            default: return 'milestone-pending';
        }
    };

    const getMilestoneStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return <CheckCircle size={16} />;
            case 'in-progress': return <Clock size={16} />;
            case 'on-hold': return <AlertCircle size={16} />;
            case 'canceled': return <X size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const handleExtraWorkNavigation = () => {
        if (window.location.pathname.includes('/projects')) {
            window.location.href = '/extra-work';
        } else {
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

    const navigationTabs = [
        { id: 'overview', label: 'Overview', icon: Target },
        { id: 'milestones', label: 'Milestones', icon: CheckCircle },
        { id: 'activity', label: 'Activity', icon: MessageCircle }
    ];

    const renderOverviewSection = () => (
        <div className="project-modal__overview">
            {/* Overview Cards Grid */}
            <div className="project-modal__cards-grid">
                {/* Client Information Card */}
                <div className="project-modal__info-card">
                    <div className="project-modal__card-header">
                        <div className="project-modal__card-icon">
                            <User size={20} />
                        </div>
                        <h3>Client Information</h3>
                    </div>
                    <div className="project-modal__card-content">
                        <h4 className="project-modal__client-name">{project.client}</h4>
                        <div className="project-modal__contact-list">
                            <div className="project-modal__contact-item">
                                <Mail size={16} />
                                <span>{project.clientEmail}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Card */}
                <div className="project-modal__info-card">
                    <div className="project-modal__card-header">
                        <div className="project-modal__card-icon">
                            <Calendar size={20} />
                        </div>
                        <h3>Timeline</h3>
                    </div>
                    <div className="project-modal__card-content">
                        <div className="project-modal__timeline-list">
                            <div className="project-modal__timeline-item">
                                <span className="project-modal__timeline-label">Started:</span>
                                <span className="project-modal__timeline-value">
                                    {new Date(project.startDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="project-modal__timeline-item">
                                <span className="project-modal__timeline-label">Due:</span>
                                <span className={`project-modal__timeline-value ${new Date(project.dueDate) < new Date() && project.status !== 'completed' ? 'project-modal__timeline-value--overdue' : ''}`}>
                                    {new Date(project.dueDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            {project.endDate && (
                                <div className="project-modal__timeline-item">
                                    <span className="project-modal__timeline-label">Completed:</span>
                                    <span className="project-modal__timeline-value">
                                        {new Date(project.endDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Budget Card */}
                <div className="project-modal__info-card">
                    <div className="project-modal__card-header">
                        <div className="project-modal__card-icon">
                            <DollarSign size={20} />
                        </div>
                        <h3>Budget</h3>
                    </div>
                    <div className="project-modal__card-content">
                        <div className="project-modal__budget-amount">{project.budget}</div>
                        <div className="project-modal__budget-label">Total Project Value</div>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="project-modal__info-card">
                    <div className="project-modal__card-header">
                        <div className="project-modal__card-icon">
                            <Target size={20} />
                        </div>
                        <h3>Progress</h3>
                    </div>
                    <div className="project-modal__card-content">
                        <div className="project-modal__progress-circle" data-progress={project.progress}>
                            <div className="project-modal__progress-value">{project.progress}%</div>
                        </div>
                        <div className="project-modal__progress-label">Complete</div>
                        {overdueMilestones.length > 0 && (
                            <div className="project-modal__progress-warning">
                                <AlertCircle size={14} />
                                <span>{overdueMilestones.length} overdue</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Project Description */}
            <div className="project-modal__description-section">
                <h3>Project Description</h3>
                <p>{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                    <div className="project-modal__tags-wrapper">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="project-modal__tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderMilestonesSection = () => (
        <div className="project-modal__milestones">
            <div className="project-modal__milestones-header">
                <div className="project-modal__milestones-title">
                    <h3>Milestones ({completedMilestones}/{project.milestones.length})</h3>
                    {overdueMilestones.length > 0 && (
                        <div className="project-modal__overdue-badge">
                            <AlertCircle size={14} />
                            <span>{overdueMilestones.length} overdue</span>
                        </div>
                    )}
                </div>
                <div className="project-modal__milestones-actions">
                    <div className="project-modal__progress-bar-wrapper">
                        <div className="project-modal__progress-bar">
                            <div
                                className="project-modal__progress-bar-fill"
                                style={{ width: `${(completedMilestones / project.milestones.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <button
                        className="project-modal__manage-btn"
                        onClick={() => onManageMilestones && onManageMilestones(project)}
                    >
                        <Settings size={14} />
                        <span>Manage</span>
                    </button>
                </div>
            </div>

            <div className="project-modal__milestones-list">
                {project.milestones.map((milestone, index) => (
                    <div key={index} className={`project-modal__milestone-item ${getMilestoneStatusClass(milestone.status)}`}>
                        <div className="project-modal__milestone-icon">
                            {getMilestoneStatusIcon(milestone.status)}
                        </div>
                        <div className="project-modal__milestone-content">
                            <div className="project-modal__milestone-header">
                                <h4>{milestone.name}</h4>
                                <span className={`project-modal__milestone-status ${getMilestoneStatusClass(milestone.status)}`}>
                                    {milestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                            </div>
                            <div className="project-modal__milestone-meta">
                                <span className="project-modal__milestone-date">
                                    <Calendar size={12} />
                                    Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                                {milestone.dueDate && new Date(milestone.dueDate) < new Date() &&
                                    milestone.status !== 'completed' && milestone.status !== 'canceled' && (
                                        <span className="project-modal__overdue-tag">
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
    );

    const renderActivitySection = () => (
        <div className="project-modal__activity">
            <h3>Project Activity</h3>
            <div className="project-modal__activity-grid">
                <div className={`project-modal__activity-card ${project.hasChat ? 'project-modal__activity-card--active' : 'project-modal__activity-card--inactive'}`}>
                    <div className="project-modal__activity-icon">
                        <MessageCircle size={24} />
                    </div>
                    <div className="project-modal__activity-content">
                        <h4>Client Communication</h4>
                        <p>{project.hasChat ? 'Active conversation with client' : 'No active chat with client'}</p>
                    </div>
                    {project.hasChat && (
                        <button className="project-modal__activity-action">
                            <span>View Chat</span>
                            <ExternalLink size={14} />
                        </button>
                    )}
                </div>

                <div
                    className={`project-modal__activity-card ${project.extraWorkCount > 0 ? 'project-modal__activity-card--active' : 'project-modal__activity-card--inactive'} ${project.extraWorkCount > 0 ? 'project-modal__activity-card--clickable' : ''}`}
                    onClick={project.extraWorkCount > 0 ? handleExtraWorkNavigation : undefined}
                >
                    <div className="project-modal__activity-icon">
                        <Zap size={24} />
                    </div>
                    <div className="project-modal__activity-content">
                        <h4>Extra Work Requests</h4>
                        <p>
                            {project.extraWorkCount > 0
                                ? `${project.extraWorkCount} additional work request${project.extraWorkCount > 1 ? 's' : ''}`
                                : 'No additional work requests'
                            }
                        </p>
                    </div>
                    {project.extraWorkCount > 0 && (
                        <button className="project-modal__activity-action">
                            <span>View Details</span>
                            <ExternalLink size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="project-modal__overlay" onClick={onClose}>
            <div className="project-modal__container" onClick={(e) => e.stopPropagation()}>
                {/* Mobile Header */}
                {isMobileView && (
                    <div className="project-modal__mobile-header">
                        <button className="project-modal__back-btn" onClick={onClose}>
                            <ArrowLeft size={20} />
                        </button>
                        <div className="project-modal__mobile-title">
                            <h2>{project.name}</h2>
                            <div className={`project-modal__status ${getProjectStatusClass(project.status)}`}>
                                {project.status}
                            </div>
                        </div>
                        <button className="project-modal__edit-btn" onClick={() => onEdit && onEdit(project)}>
                            <Edit size={18} />
                        </button>
                    </div>
                )}

                {/* Desktop Header */}
                {!isMobileView && (
                    <div className="project-modal__desktop-header">
                        <div className="project-modal__header-content">
                            <div className="project-modal__title-section">
                                <h1>{project.name}</h1>
                                <div className="project-modal__header-meta">
                                    <div className={`project-modal__status ${getProjectStatusClass(project.status)}`}>
                                        {project.status}
                                    </div>
                                    <div className="project-modal__category">
                                        {project.category}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="project-modal__close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                )}

                {/* Mobile Navigation Tabs */}
                {isMobileView && (
                    <div className="project-modal__mobile-nav">
                        {navigationTabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    className={`project-modal__nav-tab ${activeSection === tab.id ? 'project-modal__nav-tab--active' : ''}`}
                                    onClick={() => setActiveSection(tab.id)}
                                >
                                    <IconComponent size={16} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Content Area */}
                <div className="project-modal__content">
                    {isMobileView ? (
                        <div className="project-modal__mobile-content">
                            {activeSection === 'overview' && renderOverviewSection()}
                            {activeSection === 'milestones' && renderMilestonesSection()}
                            {activeSection === 'activity' && renderActivitySection()}
                        </div>
                    ) : (
                        <div className="project-modal__desktop-content">
                            {renderOverviewSection()}
                            {renderMilestonesSection()}
                            {renderActivitySection()}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="project-modal__footer">
                    <div className="project-modal__footer-info">
                        <div className="project-modal__stats">
                            <span>Created: {new Date(project.startDate).toLocaleDateString()}</span>
                            {project.endDate && (
                                <span>Completed: {new Date(project.endDate).toLocaleDateString()}</span>
                            )}
                        </div>
                    </div>
                    <div className="project-modal__footer-actions">
                        {!isMobileView && (
                            <button className="project-modal__btn project-modal__btn--secondary" onClick={onClose}>
                                Close
                            </button>
                        )}
                        <button className="project-modal__btn project-modal__btn--primary" onClick={() => onEdit && onEdit(project)}>
                            <Edit size={16} />
                            <span>Edit Project</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;