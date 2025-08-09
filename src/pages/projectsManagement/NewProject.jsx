import React, { useState } from 'react';
import {
    X,
    Save,
    User,
    Calendar,
    DollarSign,
    FileText,
    Plus,
    Trash2,
    Search
} from 'lucide-react';
import './NewProject.scss';

function NewProject({ onClose, onCreate }) {
    const [formData, setFormData] = useState({
        name: '',
        client: '',
        clientEmail: '',
        status: 'In Progress',
        startDate: '',
        dueDate: '',
        budget: '',
        description: '',
        category: ''
    });

    const [milestones, setMilestones] = useState([
        { name: '', dueDate: '' }
    ]);

    const [clientSearchTerm, setClientSearchTerm] = useState('');
    const [showClientDropdown, setShowClientDropdown] = useState(false);

    const statusOptions = ['In Progress', 'On Hold', 'Completed', 'Canceled'];
    const categoryOptions = ['Website', 'Mobile Application', 'UI UX', 'Logo'];

    // Client database for selection
    const clientsDatabase = [
        { name: 'John Doe', email: 'john@shamsuperstore.com', company: 'ShamSuperStore' },
        { name: 'Sarah Wilson', email: 'sarah@techcorp.com', company: 'TechCorp' },
        { name: 'Emma Davis', email: 'emma@photographer.com', company: 'Photography Studio' },
        { name: 'Mike Johnson', email: 'mike@innovate.com', company: 'Innovate Solutions' },
        { name: 'Alex Thompson', email: 'alex@startup.com', company: 'Tech Startup' },
        { name: 'David Brown', email: 'david@marketing.com', company: 'Marketing Agency' },
        { name: 'Lisa Garcia', email: 'lisa@techstartup.com', company: 'Tech Solutions' },
        { name: 'Robert Chen', email: 'robert@designagency.com', company: 'Design Agency' },
        { name: 'Maria Rodriguez', email: 'maria@restaurant.com', company: 'Restaurant Group' },
        { name: 'James Wilson', email: 'james@consulting.com', company: 'Business Consulting' }
    ];

    const filteredClients = clientsDatabase.filter(client =>
        client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(clientSearchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClientSelect = (client) => {
        setFormData(prev => ({
            ...prev,
            client: client.name,
            clientEmail: client.email
        }));
        setClientSearchTerm(client.name);
        setShowClientDropdown(false);
    };

    const handleClientSearchChange = (e) => {
        const value = e.target.value;
        setClientSearchTerm(value);
        setFormData(prev => ({
            ...prev,
            client: value
        }));
        setShowClientDropdown(true);
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

        // Call the onCreate callback
        if (onCreate) {
            onCreate(projectData);
        }

        onClose();
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.client-search-container')) {
                setShowClientDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                                    <div className="client-search-container">
                                        <div className="search-input-wrapper">
                                            <Search size={18} />
                                            <input
                                                type="text"
                                                id="client"
                                                name="client"
                                                value={clientSearchTerm}
                                                onChange={handleClientSearchChange}
                                                onFocus={() => setShowClientDropdown(true)}
                                                placeholder="Search for client"
                                                required
                                            />
                                        </div>
                                        {showClientDropdown && (
                                            <div className="client-dropdown">
                                                {filteredClients.length > 0 ? (
                                                    filteredClients.map((client, index) => (
                                                        <div
                                                            key={index}
                                                            className="client-option"
                                                            onClick={() => handleClientSelect(client)}
                                                        >
                                                            <div className="client-name">{client.name}</div>
                                                            <div className="client-details">
                                                                <span className="client-email">{client.email}</span>
                                                                <span className="client-company">{client.company}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="no-results">
                                                        <span>No matching clients found</span>
                                                        <small>Keep typing to add a new client</small>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
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