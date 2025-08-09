import React, { useEffect } from 'react';
import {
    X,
    Edit,
    Mail,
    Phone,
    MapPin,
    Building,
    Calendar,
    DollarSign,
    User,
    Globe,
    Clock,
    Briefcase,
    CheckCircle,
    AlertCircle,
    FileText,
    ExternalLink
} from 'lucide-react';
import './ClientView.scss';

function ClientView({ client, onClose, onEdit }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'completed';
            case 'in progress': return 'in-progress';
            case 'on hold': return 'on-hold';
            case 'canceled': return 'canceled';
            default: return 'pending';
        }
    };

    const getProjectStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return <CheckCircle size={16} />;
            case 'in progress': return <Clock size={16} />;
            case 'on hold': return <AlertCircle size={16} />;
            case 'canceled': return <X size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="client-modal__overlay" onClick={handleOverlayClick}>
            <div className="client-modal__container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="client-modal__close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Header */}
                <header className="client-modal__header">
                    <div className="client-modal__header-content">
                        <div className="client-modal__avatar">
                            {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="client-modal__title-section">
                            <h1>{client.name}</h1>
                            <div className="client-modal__company">
                                <Building size={18} />
                                <span>{client.company}</span>
                            </div>
                            <div className={`client-modal__status status-${client.status.toLowerCase()}`}>
                                {client.status}
                            </div>
                        </div>
                    </div>
                    <button className="client-modal__edit-btn" onClick={onEdit}>
                        <Edit size={16} />
                        <span>Edit Client</span>
                    </button>
                </header>

                {/* Content */}
                <div className="client-modal__content">
                    {/* Client Info Grid */}
                    <div className="client-modal__info-grid">
                        {/* Contact Information */}
                        <div className="client-modal__info-card">
                            <div className="client-modal__card-header">
                                <div className="client-modal__card-icon contact">
                                    <Mail size={20} />
                                </div>
                                <h3>Contact Information</h3>
                            </div>
                            <div className="client-modal__card-content">
                                <div className="client-modal__contact-list">
                                    <div className="client-modal__contact-item">
                                        <Mail size={16} />
                                        <div>
                                            <div className="contact-value">{client.email}</div>
                                            <div className="contact-label">Email Address</div>
                                        </div>
                                    </div>

                                    <div className="client-modal__contact-item">
                                        <Phone size={16} />
                                        <div>
                                            <div className="contact-value">{client.phone}</div>
                                            <div className="contact-label">Phone Number</div>
                                        </div>
                                    </div>

                                    <div className="client-modal__contact-item">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="contact-value">{client.address}</div>
                                            <div className="contact-label">Address</div>
                                        </div>
                                    </div>

                                    {client.website && (
                                        <div className="client-modal__contact-item">
                                            <Globe size={16} />
                                            <div>
                                                <div className="contact-value">
                                                    <a href={client.website} target="_blank" rel="noopener noreferrer">
                                                        {client.website} <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                                <div className="contact-label">Website</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className="client-modal__info-card">
                            <div className="client-modal__card-header">
                                <div className="client-modal__card-icon business">
                                    <Building size={20} />
                                </div>
                                <h3>Business Information</h3>
                            </div>
                            <div className="client-modal__card-content">
                                <div className="client-modal__info-item">
                                    <div className="info-label">Company</div>
                                    <div className="info-value">{client.company}</div>
                                </div>

                                <div className="client-modal__info-item">
                                    <div className="info-label">Industry</div>
                                    <div className="info-value">{client.industry}</div>
                                </div>

                                <div className="client-modal__info-item">
                                    <div className="info-label">Client Since</div>
                                    <div className="info-value">{formatDate(client.joinDate)}</div>
                                </div>

                                <div className="client-modal__info-item">
                                    <div className="info-label">Last Contact</div>
                                    <div className="info-value">{formatDate(client.lastContact)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Statistics */}
                    <div className="client-modal__section">
                        <div className="client-modal__info-card">
                            <div className="client-modal__card-header">
                                <div className="client-modal__card-icon projects">
                                    <Briefcase size={20} />
                                </div>
                                <h3>Project Overview</h3>
                            </div>
                            <div className="client-modal__card-content">
                                {/* Stats Row */}
                                <div className="client-modal__stats-grid">
                                    <div className="client-modal__stat-item">
                                        <div className="stat-number total">{client.totalProjects}</div>
                                        <div className="stat-label">Total Projects</div>
                                    </div>

                                    <div className="client-modal__stat-item">
                                        <div className="stat-number active">{client.activeProjects}</div>
                                        <div className="stat-label">Active Projects</div>
                                    </div>

                                    <div className="client-modal__stat-item">
                                        <div className="stat-number completed">{client.completedProjects}</div>
                                        <div className="stat-label">Completed</div>
                                    </div>

                                    <div className="client-modal__stat-item">
                                        <div className="stat-number revenue">{client.totalValue}</div>
                                        <div className="stat-label">Total Value</div>
                                    </div>
                                </div>

                                {/* Projects List */}
                                <div className="client-modal__projects-section">
                                    <h4>Recent Projects ({client.projects.length})</h4>
                                    <div className="client-modal__projects-list">
                                        {client.projects.map(project => (
                                            <div key={project.id} className="client-modal__project-item">
                                                <div className="project-content">
                                                    <div className="project-name">{project.name}</div>
                                                    <div className="project-meta">
                                                        <span className="project-dates">
                                                            <Calendar size={12} />
                                                            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                                                        </span>
                                                        <span className="project-value">{project.value}</span>
                                                    </div>
                                                </div>
                                                <div className={`client-modal__project-status ${getStatusClass(project.status)}`}>
                                                    {getProjectStatusIcon(project.status)}
                                                    <span>{project.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Section */}
                    {client.notes && (
                        <div className="client-modal__section">
                            <div className="client-modal__info-card">
                                <div className="client-modal__card-header">
                                    <div className="client-modal__card-icon notes">
                                        <FileText size={20} />
                                    </div>
                                    <h3>Notes</h3>
                                </div>
                                <div className="client-modal__card-content">
                                    <p className="client-modal__notes-text">{client.notes}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClientView;