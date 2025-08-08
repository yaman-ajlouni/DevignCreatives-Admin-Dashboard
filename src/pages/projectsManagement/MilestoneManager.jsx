import React, { useState } from 'react';
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
    Copy,
    Zap
} from 'lucide-react';
import './MilestoneManager.scss';

function MilestoneManager({ project, onClose, onSave }) {
    const [milestones, setMilestones] = useState(project.milestones || []);
    const [editingIndex, setEditingIndex] = useState(null);

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

    const duplicateMilestone = (index) => {
        const milestoneToClone = { ...milestones[index] };
        milestoneToClone.name += ' (Copy)';
        milestoneToClone.status = 'pending';
        setMilestones([...milestones.slice(0, index + 1), milestoneToClone, ...milestones.slice(index + 1)]);
    };

    const calculateProgress = () => {
        if (milestones.length === 0) return 0;
        const completedMilestones = milestones.filter(m => m.status === 'completed').length;
        return Math.round((completedMilestones / milestones.length) * 100);
    };

    const getUpcomingMilestones = () => {
        const today = new Date();
        return milestones
            .filter(m => m.status !== 'completed' && m.status !== 'canceled' && m.dueDate)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 3)
            .map(milestone => ({
                ...milestone,
                isUrgent: new Date(milestone.dueDate) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
                isOverdue: new Date(milestone.dueDate) < today
            }));
    };

    const getOverdueMilestones = () => {
        const today = new Date();
        return milestones.filter(m =>
            m.status !== 'completed' &&
            m.status !== 'canceled' &&
            m.dueDate &&
            new Date(m.dueDate) < today
        );
    };

    const getStatusStats = () => {
        const stats = {};
        milestoneStatusOptions.forEach(option => {
            stats[option.value] = milestones.filter(m => m.status === option.value).length;
        });
        return stats;
    };

    const handleSave = () => {
        const validMilestones = milestones.filter(m => m.name.trim() && m.dueDate);
        const updatedProject = {
            ...project,
            milestones: validMilestones,
            progress: calculateProgress()
        };

        if (onSave) {
            onSave(updatedProject);
        }
        onClose();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const progress = calculateProgress();
    const upcomingMilestones = getUpcomingMilestones();
    const overdueMilestones = getOverdueMilestones();
    const statusStats = getStatusStats();

    return (
        <div className="milestone-manager">
            <div className="milestone-manager__overlay" onClick={onClose} />

            <div className="milestone-manager__modal">
                {/* Header */}
                <header className="milestone-manager__header">
                    <div className="milestone-manager__header-content">
                        <div className="milestone-manager__title-section">
                            <div className="milestone-manager__icon">
                                <Target size={24} />
                            </div>
                            <div className="milestone-manager__title-info">
                                <h1 className="milestone-manager__title">Project Milestones</h1>
                                <p className="milestone-manager__subtitle">{project.name}</p>
                            </div>
                        </div>
                        <div className="milestone-manager__header-stats">
                            <div className="milestone-manager__stat-badge milestone-manager__stat-badge--completed">
                                <CheckCircle size={16} />
                                <span>{milestones.filter(m => m.status === 'completed').length}</span>
                            </div>
                            <div className="milestone-manager__stat-badge milestone-manager__stat-badge--total">
                                <Target size={16} />
                                <span>{milestones.length}</span>
                            </div>
                        </div>
                    </div>
                    <button className="milestone-manager__close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </header>

                {/* Overview Dashboard */}
                <section className="milestone-manager__overview">
                    <div className="milestone-manager__overview-grid">
                        {/* Progress Card */}
                        <div className="milestone-manager__card milestone-manager__card--primary">
                            <div className="milestone-manager__card-header">
                                <div className="milestone-manager__card-icon">
                                    <TrendingUp size={20} />
                                </div>
                                <h3 className="milestone-manager__card-title">Overall Progress</h3>
                            </div>
                            <div className="milestone-manager__progress-display">
                                <div className="milestone-manager__progress-circle" style={{ '--progress': progress }}>
                                    <span className="milestone-manager__progress-value">{progress}%</span>
                                </div>
                                <div className="milestone-manager__progress-details">
                                    <p className="milestone-manager__progress-text">
                                        {milestones.filter(m => m.status === 'completed').length} of {milestones.length} completed
                                    </p>
                                    <div className="milestone-manager__progress-bar">
                                        <div
                                            className="milestone-manager__progress-fill"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Breakdown */}
                        <div className="milestone-manager__card">
                            <div className="milestone-manager__card-header">
                                <div className="milestone-manager__card-icon">
                                    <Award size={20} />
                                </div>
                                <h3 className="milestone-manager__card-title">Status Overview</h3>
                            </div>
                            <div className="milestone-manager__status-list">
                                {milestoneStatusOptions.map(option => (
                                    <div key={option.value} className="milestone-manager__status-item">
                                        <div
                                            className="milestone-manager__status-dot"
                                            style={{ backgroundColor: option.color }}
                                        />
                                        <span className="milestone-manager__status-label">{option.label}</span>
                                        <span className="milestone-manager__status-count">{statusStats[option.value]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="milestone-manager__card">
                            <div className="milestone-manager__card-header">
                                <div className="milestone-manager__card-icon">
                                    <Calendar size={20} />
                                </div>
                                <h3 className="milestone-manager__card-title">Upcoming Deadlines</h3>
                            </div>
                            <div className="milestone-manager__upcoming-list">
                                {upcomingMilestones.length > 0 ? (
                                    upcomingMilestones.map((milestone, index) => (
                                        <div key={index} className={`milestone-manager__upcoming-item ${milestone.isOverdue ? 'milestone-manager__upcoming-item--overdue' : milestone.isUrgent ? 'milestone-manager__upcoming-item--urgent' : ''}`}>
                                            <div className="milestone-manager__upcoming-info">
                                                <h4 className="milestone-manager__upcoming-name">{milestone.name}</h4>
                                                <span className="milestone-manager__upcoming-date">{formatDate(milestone.dueDate)}</span>
                                            </div>
                                            {(milestone.isUrgent || milestone.isOverdue) && (
                                                <div className="milestone-manager__upcoming-alert">
                                                    <AlertTriangle size={14} />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="milestone-manager__no-upcoming">No upcoming milestones</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Overdue Alert */}
                    {overdueMilestones.length > 0 && (
                        <div className="milestone-manager__alert milestone-manager__alert--danger">
                            <AlertTriangle size={16} />
                            <span>
                                {overdueMilestones.length} milestone{overdueMilestones.length > 1 ? 's' : ''} overdue
                            </span>
                        </div>
                    )}
                </section>

                {/* Milestones List */}
                <section className="milestone-manager__content">
                    <div className="milestone-manager__section-header">
                        <h2 className="milestone-manager__section-title">
                            <Target size={20} />
                            All Milestones ({milestones.length})
                        </h2>
                        <button
                            className="milestone-manager__add-btn"
                            onClick={addMilestone}
                        >
                            <Plus size={16} />
                            <span>Add Milestone</span>
                        </button>
                    </div>

                    <div className="milestone-manager__milestones">
                        {milestones.length > 0 ? (
                            milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`milestone-manager__milestone ${editingIndex === index ? 'milestone-manager__milestone--editing' : ''
                                        } milestone-manager__milestone--${milestone.status}`}
                                >
                                    {editingIndex === index ? (
                                        /* Edit Mode */
                                        <div className="milestone-manager__edit-form">
                                            <div className="milestone-manager__edit-inputs">
                                                <div className="milestone-manager__input-group">
                                                    <label className="milestone-manager__label">Milestone Name</label>
                                                    <input
                                                        type="text"
                                                        value={milestone.name}
                                                        onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                                        placeholder="Enter milestone name"
                                                        className="milestone-manager__input"
                                                    />
                                                </div>
                                                <div className="milestone-manager__input-group">
                                                    <label className="milestone-manager__label">Due Date</label>
                                                    <input
                                                        type="date"
                                                        value={milestone.dueDate}
                                                        onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                        className="milestone-manager__input"
                                                    />
                                                </div>
                                                <div className="milestone-manager__input-group">
                                                    <label className="milestone-manager__label">Status</label>
                                                    <select
                                                        value={milestone.status}
                                                        onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                        className="milestone-manager__select"
                                                        style={{ borderColor: getStatusColor(milestone.status) }}
                                                    >
                                                        {milestoneStatusOptions.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="milestone-manager__edit-actions">
                                                <button
                                                    className="milestone-manager__action-btn milestone-manager__action-btn--save"
                                                    onClick={() => setEditingIndex(null)}
                                                    title="Save changes"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button
                                                    className="milestone-manager__action-btn milestone-manager__action-btn--delete"
                                                    onClick={() => removeMilestone(index)}
                                                    title="Delete milestone"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode */
                                        <div className="milestone-manager__milestone-view">
                                            <div className="milestone-manager__milestone-indicator">
                                                <div
                                                    className="milestone-manager__milestone-icon"
                                                    style={{ color: getStatusColor(milestone.status) }}
                                                >
                                                    {getMilestoneIcon(milestone.status)}
                                                </div>
                                                <div
                                                    className="milestone-manager__milestone-line"
                                                    style={{ backgroundColor: getStatusColor(milestone.status) }}
                                                />
                                            </div>
                                            <div className="milestone-manager__milestone-content">
                                                <div className="milestone-manager__milestone-header">
                                                    <h3 className="milestone-manager__milestone-name">
                                                        {milestone.name || 'Untitled Milestone'}
                                                    </h3>
                                                    <span
                                                        className={`milestone-manager__milestone-badge milestone-manager__milestone-badge--${milestone.status}`}
                                                        style={{
                                                            backgroundColor: `${getStatusColor(milestone.status)}20`,
                                                            color: getStatusColor(milestone.status)
                                                        }}
                                                    >
                                                        {milestoneStatusOptions.find(opt => opt.value === milestone.status)?.label}
                                                    </span>
                                                </div>
                                                <div className="milestone-manager__milestone-meta">
                                                    <div className="milestone-manager__milestone-date">
                                                        <Calendar size={14} />
                                                        <span>
                                                            {milestone.dueDate ? formatDate(milestone.dueDate) : 'No due date'}
                                                        </span>
                                                    </div>
                                                    {milestone.dueDate &&
                                                        new Date(milestone.dueDate) < new Date() &&
                                                        milestone.status !== 'completed' &&
                                                        milestone.status !== 'canceled' && (
                                                            <div className="milestone-manager__overdue-badge">
                                                                <AlertTriangle size={12} />
                                                                <span>Overdue</span>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="milestone-manager__milestone-actions">
                                                <button
                                                    className="milestone-manager__action-btn milestone-manager__action-btn--edit"
                                                    onClick={() => setEditingIndex(index)}
                                                    title="Edit milestone"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="milestone-manager__action-btn milestone-manager__action-btn--duplicate"
                                                    onClick={() => duplicateMilestone(index)}
                                                    title="Duplicate milestone"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                                <button
                                                    className="milestone-manager__action-btn milestone-manager__action-btn--delete"
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
                            <div className="milestone-manager__empty">
                                <div className="milestone-manager__empty-icon">
                                    <Target size={48} />
                                </div>
                                <h3 className="milestone-manager__empty-title">No milestones yet</h3>
                                <p className="milestone-manager__empty-description">
                                    Add milestones to track your project progress and keep everyone aligned on key deliverables.
                                </p>
                                <button
                                    className="milestone-manager__empty-btn"
                                    onClick={addMilestone}
                                >
                                    <Plus size={16} />
                                    Create First Milestone
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="milestone-manager__footer">
                    <div className="milestone-manager__footer-info">
                        <span className="milestone-manager__footer-text">
                            {milestones.filter(m => m.name && m.dueDate).length} valid milestones
                        </span>
                    </div>
                    <div className="milestone-manager__footer-actions">
                        <button
                            className="milestone-manager__btn milestone-manager__btn--secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="milestone-manager__btn milestone-manager__btn--primary"
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