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
    Edit2
} from 'lucide-react';
import './MilestoneManager.scss';

function MilestoneManager({ project, onClose, onSave }) {
    const [milestones, setMilestones] = useState(project.milestones || []);
    const [editingIndex, setEditingIndex] = useState(null);

    const milestoneStatusOptions = [
        { value: 'pending', label: 'Pending', color: '#6b7280' },
        { value: 'in-progress', label: 'In Progress', color: '#3b82f6' },
        { value: 'completed', label: 'Completed', color: '#10b981' },
        { value: 'on-hold', label: 'On Hold', color: '#f59e0b' },
        { value: 'canceled', label: 'Canceled', color: '#ef4444' }
    ];

    const getMilestoneIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return <CheckCircle size={16} />;
            case 'in-progress': return <Clock size={16} />;
            case 'on-hold': return <AlertCircle size={16} />;
            case 'canceled': return <X size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const getStatusColor = (status) => {
        const statusOption = milestoneStatusOptions.find(option => option.value === status);
        return statusOption ? statusOption.color : '#6b7280';
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
        setMilestones(milestones.filter((_, i) => i !== index));
        if (editingIndex === index) {
            setEditingIndex(null);
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

    const handleSave = () => {
        // Filter out empty milestones
        const validMilestones = milestones.filter(m => m.name.trim() && m.dueDate);

        // Update project with new milestones and calculated progress
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

    const getUpcomingMilestones = () => {
        return milestones
            .filter(m => m.status !== 'completed' && m.status !== 'canceled' && m.dueDate)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 3);
    };

    const getStatusStats = () => {
        const stats = {};
        milestoneStatusOptions.forEach(option => {
            stats[option.value] = milestones.filter(m => m.status === option.value).length;
        });
        return stats;
    };

    return (
        <div className="milestone-manager-overlay">
            <div className="milestone-manager-modal">
                {/* Header */}
                <div className="modal-header">
                    <div className="header-content">
                        <h1>
                            <Target size={24} />
                            Manage Milestones
                        </h1>
                        <p>{project.name}</p>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Overview */}
                <div className="progress-overview">
                    <div className="progress-card">
                        <h3>Overall Progress</h3>
                        <div className="progress-circle" style={{ '--progress': calculateProgress() }}>
                            <span className="progress-value">{calculateProgress()}%</span>
                        </div>
                        <div className="progress-stats">
                            <span>{milestones.filter(m => m.status === 'completed').length} of {milestones.length} completed</span>
                        </div>
                    </div>

                    <div className="status-overview">
                        <h3>Status Breakdown</h3>
                        <div className="status-grid">
                            {milestoneStatusOptions.map(option => (
                                <div key={option.value} className="status-item">
                                    <div
                                        className="status-dot"
                                        style={{ backgroundColor: option.color }}
                                    ></div>
                                    <span className="status-label">{option.label}</span>
                                    <span className="status-count">{getStatusStats()[option.value]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="upcoming-milestones">
                        <h3>Upcoming Deadlines</h3>
                        <div className="upcoming-list">
                            {getUpcomingMilestones().length > 0 ? (
                                getUpcomingMilestones().map((milestone, index) => (
                                    <div key={index} className="upcoming-item">
                                        <span className="milestone-name">{milestone.name}</span>
                                        <span className="milestone-date">
                                            {new Date(milestone.dueDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="no-upcoming">No upcoming milestones</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Milestones List */}
                <div className="milestones-section">
                    <div className="section-header">
                        <h3>Project Milestones ({milestones.length})</h3>
                        <button onClick={addMilestone} className="add-milestone-btn">
                            <Plus size={16} />
                            Add Milestone
                        </button>
                    </div>

                    <div className="milestones-list">
                        {milestones.length > 0 ? (
                            milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`milestone-item ${editingIndex === index ? 'editing' : ''}`}
                                >
                                    {editingIndex === index ? (
                                        // Edit Mode
                                        <div className="milestone-edit-form">
                                            <div className="edit-inputs">
                                                <input
                                                    type="text"
                                                    value={milestone.name}
                                                    onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                                    placeholder="Milestone name"
                                                    className="milestone-name-input"
                                                />
                                                <input
                                                    type="date"
                                                    value={milestone.dueDate}
                                                    onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                    className="milestone-date-input"
                                                />
                                                <select
                                                    value={milestone.status}
                                                    onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                    className="milestone-status-input"
                                                    style={{ borderLeft: `4px solid ${getStatusColor(milestone.status)}` }}
                                                >
                                                    {milestoneStatusOptions.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="edit-actions">
                                                <button
                                                    onClick={() => setEditingIndex(null)}
                                                    className="save-btn"
                                                >
                                                    <CheckCircle size={14} />
                                                </button>
                                                <button
                                                    onClick={() => removeMilestone(index)}
                                                    className="delete-btn"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <div className="milestone-view">
                                            <div className="milestone-status-icon" style={{ color: getStatusColor(milestone.status) }}>
                                                {getMilestoneIcon(milestone.status)}
                                            </div>
                                            <div className="milestone-content">
                                                <h4>{milestone.name || 'Untitled Milestone'}</h4>
                                                <div className="milestone-meta">
                                                    <span className="milestone-due">
                                                        <Calendar size={12} />
                                                        {milestone.dueDate ?
                                                            new Date(milestone.dueDate).toLocaleDateString() :
                                                            'No due date'
                                                        }
                                                    </span>
                                                    <span
                                                        className={`milestone-status ${milestone.status}`}
                                                        style={{ color: getStatusColor(milestone.status) }}
                                                    >
                                                        {milestoneStatusOptions.find(opt => opt.value === milestone.status)?.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="milestone-actions">
                                                <button
                                                    onClick={() => setEditingIndex(index)}
                                                    className="edit-milestone-btn"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => duplicateMilestone(index)}
                                                    className="duplicate-btn"
                                                    title="Duplicate milestone"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => removeMilestone(index)}
                                                    className="remove-milestone-btn"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-milestones">
                                <Target size={48} />
                                <h3>No milestones yet</h3>
                                <p>Add milestones to track your project progress</p>
                                <button onClick={addMilestone} className="btn btn-primary">
                                    <Plus size={16} />
                                    Create First Milestone
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={16} />
                        Save Milestones
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MilestoneManager;