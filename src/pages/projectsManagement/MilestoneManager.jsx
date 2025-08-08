import React, { useState, useEffect } from 'react';
import {
    X,
    Save,
    Plus,
    Trash2,
    CheckCircle,
    Clock,
    AlertCircle,
    Target,
    Calendar,
    Edit2,
    TrendingUp,
    Award,
    AlertTriangle,
    Copy
} from 'lucide-react';

function MilestoneManager({ project, onClose, onSave }) {

    const [milestones, setMilestones] = useState(project?.milestones || []);
    const [editingIndex, setEditingIndex] = useState(null);

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

    const milestoneStatusOptions = [
        { value: 'pending', label: 'Pending', color: '#6B7280', icon: Clock },
        { value: 'in-progress', label: 'In Progress', color: '#3B82F6', icon: Clock },
        { value: 'completed', label: 'Completed', color: '#10B981', icon: CheckCircle },
        { value: 'on-hold', label: 'On Hold', color: '#F59E0B', icon: AlertCircle },
        { value: 'canceled', label: 'Canceled', color: '#EF4444', icon: X }
    ];

    const getMilestoneIcon = (status) => {
        const statusOption = milestoneStatusOptions.find(opt => opt.value === status);
        const IconComponent = statusOption?.icon || Clock;
        return <IconComponent size={18} />;
    };

    const getStatusColor = (status) => {
        const statusOption = milestoneStatusOptions.find(option => option.value === status);
        return statusOption ? statusOption.color : '#6B7280';
    };

    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = milestones.map((milestone, i) =>
            i === index ? { ...milestone, [field]: value } : milestone
        );
        setMilestones(updatedMilestones);
    };

    const addMilestone = () => {
        const newMilestone = {
            name: '',
            dueDate: '',
            status: 'pending'
        };
        setMilestones([...milestones, newMilestone]);
        setEditingIndex(milestones.length);
    };

    const removeMilestone = (index) => {
        if (window.confirm('Are you sure you want to remove this milestone?')) {
            setMilestones(milestones.filter((_, i) => i !== index));
            if (editingIndex === index) {
                setEditingIndex(null);
            }
        }
    };

    const handleSave = () => {
        const validMilestones = milestones.filter(m => m.name.trim() && m.dueDate);
        const updatedProject = {
            ...project,
            milestones: validMilestones
        };

        if (onSave) {
            onSave(updatedProject);
        }
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Inline styles for debugging (no external CSS dependency)
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    };

    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
    };

    const contentStyle = {
        flex: 1,
        padding: '2rem',
        overflowY: 'auto'
    };

    const footerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        width: '40px',
        height: '40px',
        border: 'none',
        backgroundColor: 'white',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 10000
    };

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '10px',
        fontWeight: '500',
        cursor: 'pointer',
        border: '1px solid',
        transition: 'all 0.2s ease'
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#3b82f6',
        color: 'white',
        borderColor: '#3b82f6'
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f3f4f6',
        color: '#6b7280',
        borderColor: '#d1d5db'
    };

    if (!project) {
        console.error('MilestoneManager: No project provided');
        return null;
    }

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button style={closeButtonStyle} onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Header */}
                <header style={headerStyle}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                            Project Milestones
                        </h1>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>
                            {project.name}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#dcfce7',
                            color: '#16a34a',
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }}>
                            <CheckCircle size={16} />
                            <span>{milestones.filter(m => m.status === 'completed').length}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#dbeafe',
                            color: '#2563eb',
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }}>
                            <Target size={16} />
                            <span>{milestones.length}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div style={contentStyle}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            margin: 0,
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1f2937'
                        }}>
                            <Target size={20} />
                            All Milestones ({milestones.length})
                        </h2>
                        <button
                            style={{
                                ...buttonStyle,
                                backgroundColor: '#10b981',
                                color: 'white',
                                borderColor: '#10b981'
                            }}
                            onClick={addMilestone}
                        >
                            <Plus size={16} />
                            <span>Add Milestone</span>
                        </button>
                    </div>

                    {/* Milestones List */}
                    <div>
                        {milestones.length > 0 ? (
                            milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: '1rem',
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    {editingIndex === index ? (
                                        /* Edit Mode */
                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '2fr 1fr 1fr',
                                                gap: '1rem',
                                                marginBottom: '1rem'
                                            }}>
                                                <div>
                                                    <label style={{
                                                        display: 'block',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        color: '#374151',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        Milestone Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={milestone.name}
                                                        onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                                        placeholder="Enter milestone name"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            border: '2px solid #d1d5db',
                                                            borderRadius: '8px',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        autoFocus
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{
                                                        display: 'block',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        color: '#374151',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        Due Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={milestone.dueDate}
                                                        onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            border: '2px solid #d1d5db',
                                                            borderRadius: '8px',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{
                                                        display: 'block',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        color: '#374151',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        Status
                                                    </label>
                                                    <select
                                                        value={milestone.status}
                                                        onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            border: '2px solid #d1d5db',
                                                            borderRadius: '8px',
                                                            fontSize: '0.875rem',
                                                            backgroundColor: 'white'
                                                        }}
                                                    >
                                                        {milestoneStatusOptions.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '2px solid #10b981',
                                                        backgroundColor: 'white',
                                                        color: '#10b981',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setEditingIndex(null)}
                                                    title="Save changes"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '2px solid #ef4444',
                                                        backgroundColor: 'white',
                                                        color: '#ef4444',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => removeMilestone(index)}
                                                    title="Delete milestone"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode */
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            padding: '1.5rem'
                                        }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                backgroundColor: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: `2px solid ${getStatusColor(milestone.status)}`,
                                                color: getStatusColor(milestone.status),
                                                flexShrink: 0
                                            }}>
                                                {getMilestoneIcon(milestone.status)}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'space-between',
                                                    gap: '1rem',
                                                    marginBottom: '0.75rem'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: '1.125rem',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        margin: 0,
                                                        lineHeight: 1.3
                                                    }}>
                                                        {milestone.name || 'Untitled Milestone'}
                                                    </h3>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        padding: '0.375rem 0.75rem',
                                                        borderRadius: '6px',
                                                        backgroundColor: `${getStatusColor(milestone.status)}20`,
                                                        color: getStatusColor(milestone.status),
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {milestoneStatusOptions.find(opt => opt.value === milestone.status)?.label}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.375rem',
                                                    color: '#6b7280',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <Calendar size={14} />
                                                    <span>
                                                        {milestone.dueDate ?
                                                            new Date(milestone.dueDate).toLocaleDateString() :
                                                            'No due date'
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                                <button
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '2px solid #3b82f6',
                                                        backgroundColor: 'white',
                                                        color: '#3b82f6',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setEditingIndex(index)}
                                                    title="Edit milestone"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '2px solid #ef4444',
                                                        backgroundColor: 'white',
                                                        color: '#ef4444',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => removeMilestone(index)}
                                                    title="Remove milestone"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '3rem 2rem',
                                minHeight: '300px',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    color: '#6b7280'
                                }}>
                                    <Target size={48} />
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    margin: '0 0 0.5rem 0'
                                }}>
                                    No milestones yet
                                </h3>
                                <p style={{
                                    color: '#6b7280',
                                    margin: '0 0 2rem 0',
                                    maxWidth: '400px',
                                    lineHeight: 1.5
                                }}>
                                    Add milestones to track your project progress and keep everyone aligned on key deliverables.
                                </p>
                                <button
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        borderColor: '#3b82f6'
                                    }}
                                    onClick={addMilestone}
                                >
                                    <Plus size={16} />
                                    Create First Milestone
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer style={footerStyle}>
                    <div style={{ color: '#6b7280' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                            {milestones.filter(m => m.name && m.dueDate).length} valid milestones
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            style={secondaryButtonStyle}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            style={primaryButtonStyle}
                            onClick={handleSave}
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default MilestoneManager;