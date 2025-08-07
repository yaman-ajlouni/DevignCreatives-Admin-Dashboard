import React, { useState } from 'react';
import {
    X,
    Save,
    User,
    Calendar,
    DollarSign,
    FileText,
    Tag,
    Plus,
    Trash2
} from 'lucide-react';
import './NewProject.scss';

function NewProject({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        client: '',
        clientEmail: '',
        status: 'In Progress',
        startDate: '',
        dueDate: '',
        budget: '',
        description: '',
        category: '',
        tags: []
    });

    const [milestones, setMilestones] = useState([
        { name: '', dueDate: '' }
    ]);

    const [currentTag, setCurrentTag] = useState('');

    const statusOptions = ['In Progress', 'On Hold', 'Completed', 'Canceled'];
    const categoryOptions = ['Website', 'E-commerce', 'Mobile App', 'Branding', 'Corporate', 'Portfolio'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = milestones.map((milestone, i) =>
            i === index ? { ...milestone, [field]: value } : milestone
        );
        setMilestones(updatedMilestones);
    };

    const addMilestone = () => {
        setMilestones([...milestones, { name: '', dueDate: '' }]);
    };

    const removeMilestone = (index) => {
        if (milestones.length > 1) {
            setMilestones(milestones.filter((_, i) => i !== index));
        }
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.client || !formData.clientEmail || !formData.startDate || !formData.dueDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Create project data
        const projectData = {
            ...formData,
            milestones: milestones.filter(m => m.name && m.dueDate),
            progress: 0,
            hasChat: false,
            extraWorkCount: 0,
            endDate: null
        };

        console.log('New Project Data:', projectData);

        // Here you would typically send the data to your backend
        // For now, we'll just close the modal
        onClose();
    };

    return (
        <div className="new-project-overlay">
            <div className="new-project-modal">
                {/* Header */}
                <div className="modal-header">
                    <div className="header-content">
                        <h1>Create New Project</h1>
                        <p>Fill in the details to create a new client project</p>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-content">
                        {/* Basic Information */}
                        <div className="form-section">
                            <h3>
                                <FileText size={20} />
                                Basic Information
                            </h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name">Project Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter project name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Category</option>
                                        {categoryOptions.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="budget">Budget</label>
                                    <input
                                        type="text"
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        placeholder="e.g., $5,000"
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="description">Project Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the project goals, requirements, and deliverables"
                                    rows="4"
                                />
                            </div>
                        </div>

                        {/* Client Information */}
                        <div className="form-section">
                            <h3>
                                <User size={20} />
                                Client Information
                            </h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="client">Client Name *</label>
                                    <input
                                        type="text"
                                        id="client"
                                        name="client"
                                        value={formData.client}
                                        onChange={handleInputChange}
                                        placeholder="Enter client name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="clientEmail">Client Email *</label>
                                    <input
                                        type="email"
                                        id="clientEmail"
                                        name="clientEmail"
                                        value={formData.clientEmail}
                                        onChange={handleInputChange}
                                        placeholder="client@example.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="form-section">
                            <h3>
                                <Calendar size={20} />
                                Timeline
                            </h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date *</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dueDate">Due Date *</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="form-section">
                            <h3>
                                <Tag size={20} />
                                Tags
                            </h3>
                            <div className="tags-input-container">
                                <div className="tag-input-group">
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Add tags (press Enter)"
                                        className="tag-input"
                                    />
                                    <button type="button" onClick={addTag} className="add-tag-btn">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="tags-display">
                                    {formData.tags.map((tag, index) => (
                                        <span key={index} className="tag">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="remove-tag"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Milestones */}
                        <div className="form-section">
                            <div className="section-header">
                                <h3>Project Milestones</h3>
                                <button type="button" onClick={addMilestone} className="add-milestone-btn">
                                    <Plus size={16} />
                                    Add Milestone
                                </button>
                            </div>
                            <div className="milestones-container">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="milestone-input-group">
                                        <div className="milestone-inputs">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    value={milestone.name}
                                                    onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                                    placeholder="Milestone name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="date"
                                                    value={milestone.dueDate}
                                                    onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeMilestone(index)}
                                            className="remove-milestone-btn"
                                            disabled={milestones.length === 1}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="form-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Save size={16} />
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProject;