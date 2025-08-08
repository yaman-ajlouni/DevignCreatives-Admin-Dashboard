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
    MessageCircle,
    Clock,
    Briefcase,
    CheckCircle,
    AlertCircle,
    FileText,
    ExternalLink
} from 'lucide-react';

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

    // Inline styles for the modal
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(30, 58, 138, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    };

    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(30, 58, 138, 0.25)',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.03) 0%, rgba(249, 115, 22, 0.01) 100%)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.2)',
        position: 'relative'
    };

    const contentStyle = {
        flex: 1,
        padding: '0',
        overflowY: 'auto'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        width: '40px',
        height: '40px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        zIndex: 10001,
        transition: 'all 0.2s ease'
    };

    const editButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#f97316',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.25rem',
        borderRadius: '10px',
        fontWeight: '500',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    };

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button style={closeButtonStyle} onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Header */}
                <header style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            flexShrink: 0
                        }}>
                            {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h1 style={{
                                fontSize: '1.875rem',
                                fontWeight: '700',
                                color: '#1e3a8a',
                                margin: '0 0 0.5rem 0',
                                lineHeight: '1.2'
                            }}>
                                {client.name}
                            </h1>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                fontSize: '1.1rem',
                                color: '#6b7280'
                            }}>
                                <Building size={18} />
                                <span>{client.company}</span>
                            </div>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.375rem 0.875rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                backgroundColor: client.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' :
                                    client.status === 'Completed' ? 'rgba(30, 58, 138, 0.1)' :
                                        'rgba(107, 114, 128, 0.1)',
                                color: client.status === 'Active' ? '#16a34a' :
                                    client.status === 'Completed' ? '#1e3a8a' :
                                        '#6b7280'
                            }}>
                                {client.status}
                            </div>
                        </div>
                    </div>
                    <button style={editButtonStyle} onClick={onEdit}>
                        <Edit size={16} />
                        <span>Edit Client</span>
                    </button>
                </header>

                {/* Content */}
                <div style={contentStyle}>
                    {/* Client Info Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        padding: '2rem'
                    }}>
                        {/* Contact Information */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05))',
                                    color: '#f97316',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={20} />
                                </div>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#1e3a8a',
                                    margin: 0
                                }}>
                                    Contact Information
                                </h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={16} style={{ color: '#f97316' }} />
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#374151' }}>{client.email}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Email Address</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Phone size={16} style={{ color: '#f97316' }} />
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#374151' }}>{client.phone}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Phone Number</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <MapPin size={16} style={{ color: '#f97316', marginTop: '0.125rem' }} />
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#374151', lineHeight: '1.4' }}>{client.address}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Address</div>
                                    </div>
                                </div>

                                {client.website && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Globe size={16} style={{ color: '#f97316' }} />
                                        <div>
                                            <div style={{ fontWeight: '500', color: '#374151' }}>
                                                <a href={client.website} target="_blank" rel="noopener noreferrer"
                                                    style={{ color: '#1e3a8a', textDecoration: 'none' }}>
                                                    {client.website} <ExternalLink size={12} style={{ display: 'inline', marginLeft: '0.25rem' }} />
                                                </a>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Website</div>
                                        </div>
                                    </div>
                                )}

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <MessageCircle size={14} style={{ color: '#16a34a' }} />
                                    <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '500' }}>
                                        Prefers {client.preferredContact} communication
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Business Information */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(30, 58, 138, 0.05))',
                                    color: '#1e3a8a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Building size={20} />
                                </div>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#1e3a8a',
                                    margin: 0
                                }}>
                                    Business Information
                                </h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Company</div>
                                    <div style={{ fontWeight: '600', color: '#374151' }}>{client.company}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Industry</div>
                                    <div style={{ fontWeight: '500', color: '#374151' }}>{client.industry}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Timezone</div>
                                    <div style={{ fontWeight: '500', color: '#374151' }}>{client.timezone}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Client Since</div>
                                    <div style={{ fontWeight: '500', color: '#374151' }}>{formatDate(client.joinDate)}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Last Contact</div>
                                    <div style={{ fontWeight: '500', color: '#374151' }}>{formatDate(client.lastContact)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Statistics */}
                    <div style={{ padding: '0 2rem 2rem' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
                                    color: '#16a34a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Briefcase size={20} />
                                </div>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#1e3a8a',
                                    margin: 0
                                }}>
                                    Project Overview
                                </h3>
                            </div>

                            {/* Stats Row */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#1e3a8a',
                                        lineHeight: 1
                                    }}>
                                        {client.totalProjects}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        marginTop: '0.25rem'
                                    }}>
                                        Total Projects
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#f97316',
                                        lineHeight: 1
                                    }}>
                                        {client.activeProjects}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        marginTop: '0.25rem'
                                    }}>
                                        Active Projects
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#16a34a',
                                        lineHeight: 1
                                    }}>
                                        {client.completedProjects}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        marginTop: '0.25rem'
                                    }}>
                                        Completed
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#8b5cf6',
                                        lineHeight: 1
                                    }}>
                                        {client.totalValue}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        marginTop: '0.25rem'
                                    }}>
                                        Total Value
                                    </div>
                                </div>
                            </div>

                            {/* Projects List */}
                            <div>
                                <h4 style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 1rem 0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Recent Projects ({client.projects.length})
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {client.projects.map(project => (
                                        <div key={project.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem',
                                            backgroundColor: 'rgba(229, 231, 235, 0.05)',
                                            borderRadius: '12px',
                                            borderLeft: '4px solid #f97316'
                                        }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    fontWeight: '600',
                                                    color: '#1e3a8a',
                                                    marginBottom: '0.25rem',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {project.name}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    color: '#6b7280',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem'
                                                }}>
                                                    <span>
                                                        <Calendar size={12} style={{ marginRight: '0.25rem' }} />
                                                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                                                    </span>
                                                    <span style={{ fontWeight: '600', color: '#374151' }}>{project.value}</span>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 0.875rem',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                backgroundColor: project.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' :
                                                    project.status === 'In Progress' ? 'rgba(30, 58, 138, 0.1)' :
                                                        project.status === 'On Hold' ? 'rgba(249, 115, 22, 0.1)' :
                                                            'rgba(239, 68, 68, 0.1)',
                                                color: project.status === 'Completed' ? '#16a34a' :
                                                    project.status === 'In Progress' ? '#1e3a8a' :
                                                        project.status === 'On Hold' ? '#f97316' :
                                                            '#ef4444'
                                            }}>
                                                {getProjectStatusIcon(project.status)}
                                                <span>{project.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Section */}
                    {client.notes && (
                        <div style={{ padding: '0 2rem 2rem' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(30, 58, 138, 0.08)',
                                boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))',
                                        color: '#8b5cf6',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <FileText size={20} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: '#1e3a8a',
                                        margin: 0
                                    }}>
                                        Notes
                                    </h3>
                                </div>
                                <p style={{
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    margin: 0,
                                    fontSize: '0.95rem'
                                }}>
                                    {client.notes}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClientView;