import React, { useEffect, useState } from 'react';
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
    Copy
} from 'lucide-react';
import './MilestoneManager.scss';

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

    if (!project) {
        console.error('MilestoneManager: No project provided');
        return null;
    }

    const completedMilestones = milestones.filter(m => m.status === 'completed').length;

    return (
        <div className="milestone-modal__overlay" onClick={handleOverlayClick}>
            <div className="milestone-modal__container" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="milestone-modal__header">
                    <div className="milestone-modal__header-content">
                        <div className="milestone-modal__title-section">
                            <div className="milestone-modal__title-icon">
                                <Target size={24} />
                            </div>
                            <div className="milestone-modal__title-info">
                                <h1>Project Milestones</h1>
                                <p>{project.name}</p>
                            </div>
                        </div>
                        <div className="milestone-modal__header-stats">
                            <div className="milestone-modal__stat-badge milestone-modal__stat-badge--completed">
                                <CheckCircle size={16} />
                                <span>{completedMilestones}</span>
                            </div>
                            <div className="milestone-modal__stat-badge milestone-modal__stat-badge--total">
                                <Target size={16} />
                                <span>{milestones.length}</span>
                            </div>
                        </div>
                    </div>
                    <button className="milestone-modal__close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="milestone-modal__content">
                    <div className="milestone-modal__section-header">
                        <h2 className="milestone-modal__section-title">
                            <Target size={20} />
                            All Milestones ({milestones.length})
                        </h2>
                        <button className="milestone-modal__add-btn" onClick={addMilestone}>
                            <Plus size={16} />
                            <span>Add Milestone</span>
                        </button>
                    </div>

                    {/* Milestones List */}
                    <div className="milestone-modal__milestones-list">
                        {milestones.length > 0 ? (
                            milestones.map((milestone, index) => (
                                <div key={index} className={`milestone-modal__milestone-item milestone-modal__milestone-item--${milestone.status}`}>
                                    {editingIndex === index ? (
                                        /* Edit Mode */
                                        <div className="milestone-modal__edit-form">
                                            <div className="milestone-modal__edit-inputs">
                                                <div className="milestone-modal__input-group">
                                                    <label>Milestone Name</label>
                                                    <input
                                                        type="text"
                                                        value={milestone.name}
                                                        onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                                        placeholder="Enter milestone name"
                                                        className="milestone-modal__milestone-input"
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="milestone-modal__input-group">
                                                    <label>Due Date</label>
                                                    <input
                                                        type="date"
                                                        value={milestone.dueDate}
                                                        onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                        className="milestone-modal__milestone-input"
                                                    />
                                                </div>
                                                <div className="milestone-modal__input-group">
                                                    <label>Status</label>
                                                    <select
                                                        value={milestone.status}
                                                        onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                        className="milestone-modal__milestone-select"
                                                    >
                                                        {milestoneStatusOptions.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="milestone-modal__edit-actions">
                                                <button
                                                    className="milestone-modal__action-btn milestone-modal__action-btn--save"
                                                    onClick={() => setEditingIndex(null)}
                                                    title="Save changes"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button
                                                    className="milestone-modal__action-btn milestone-modal__action-btn--delete"
                                                    onClick={() => removeMilestone(index)}
                                                    title="Delete milestone"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode */
                                        <div className="milestone-modal__milestone-view">
                                            <div className="milestone-modal__milestone-indicator">
                                                <div className="milestone-modal__milestone-icon" style={{ borderColor: getStatusColor(milestone.status), color: getStatusColor(milestone.status) }}>
                                                    {getMilestoneIcon(milestone.status)}
                                                </div>
                                                <div className="milestone-modal__milestone-line" style={{ backgroundColor: getStatusColor(milestone.status) }}></div>
                                            </div>
                                            <div className="milestone-modal__milestone-content">
                                                <div className="milestone-modal__milestone-header">
                                                    <h3>{milestone.name || 'Untitled Milestone'}</h3>
                                                    <span className={`milestone-modal__milestone-badge milestone-modal__milestone-badge--${milestone.status}`}>
                                                        {milestoneStatusOptions.find(opt => opt.value === milestone.status)?.label}
                                                    </span>
                                                </div>
                                                <div className="milestone-modal__milestone-meta">
                                                    <span className="milestone-modal__milestone-date">
                                                        <Calendar size={14} />
                                                        {milestone.dueDate ?
                                                            new Date(milestone.dueDate).toLocaleDateString() :
                                                            'No due date'
                                                        }
                                                    </span>
                                                    {milestone.dueDate && new Date(milestone.dueDate) < new Date() &&
                                                        milestone.status !== 'completed' && milestone.status !== 'canceled' && (
                                                            <span className="milestone-modal__overdue-badge">
                                                                <AlertCircle size={12} />
                                                                Overdue
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="milestone-modal__milestone-actions">
                                                <button
                                                    className="milestone-modal__action-btn milestone-modal__action-btn--edit"
                                                    onClick={() => setEditingIndex(index)}
                                                    title="Edit milestone"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="milestone-modal__action-btn milestone-modal__action-btn--duplicate"
                                                    onClick={() => {
                                                        const duplicatedMilestone = { ...milestone, name: `${milestone.name} (Copy)` };
                                                        setMilestones([...milestones, duplicatedMilestone]);
                                                    }}
                                                    title="Duplicate milestone"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                                <button
                                                    className="milestone-modal__action-btn milestone-modal__action-btn--delete"
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
                            <div className="milestone-modal__empty-state">
                                <div className="milestone-modal__empty-icon">
                                    <Target size={48} />
                                </div>
                                <h3>No milestones yet</h3>
                                <p>Add milestones to track your project progress and keep everyone aligned on key deliverables.</p>
                                <button className="milestone-modal__empty-btn" onClick={addMilestone}>
                                    <Plus size={16} />
                                    Create First Milestone
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="milestone-modal__footer">
                    <div className="milestone-modal__footer-info">
                        <span className="milestone-modal__footer-text">
                            {milestones.filter(m => m.name && m.dueDate).length} valid milestones
                        </span>
                    </div>
                    <div className="milestone-modal__footer-actions">
                        <button className="milestone-modal__btn milestone-modal__btn--secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="milestone-modal__btn milestone-modal__btn--primary" onClick={handleSave}>
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MilestoneManager;